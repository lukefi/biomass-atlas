package fi.luke.bma.sulkaregistration;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.http.HttpHost;
import org.apache.http.StatusLine;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.AuthCache;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.client.config.RequestConfig;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.protocol.HttpClientContext;
import org.apache.http.client.utils.URIBuilder;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.auth.BasicScheme;
import org.apache.http.impl.client.BasicAuthCache;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import fi.rktl.common.model.rek.User;
import fi.rktl.common.security.su.SuUserDetails;
import fi.rktl.common.service.UserStore;
import fi.rktl.common.util.Pair;

@Controller
@Transactional(propagation=Propagation.REQUIRES_NEW)
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    
    private UserStore userStore;
    
    private AppSettings appSettings;
    
    private JavaMailSender mailSender;
    
    @Autowired
    public void setUserStore(UserStore userStore) {
        this.userStore = userStore;
    }

    @Autowired
    public void setAppSettings(AppSettings appSettings) {
        this.appSettings = appSettings;
    }

    @Autowired
    public void setMailSender(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @RequestMapping(value="account/changePassword", method=RequestMethod.GET)
    public ModelAndView changePassword(HttpSession session) {
        return new ModelAndView("changePassword", "returnPath", "TODO where should we return afterwards");
    }
    
    @RequestMapping(value="account/changePassword", method=RequestMethod.POST)
    public ModelAndView changePasswordPost(String oldPassword, String newPassword) {
        return new ModelAndView("changePassword", "model", null);
    }
    
    @RequestMapping(value="account/requestPasswordReset", method=RequestMethod.GET)
    public ModelAndView requestPasswordChangeToken() {
        return new ModelAndView("requestPasswordReset", "model", null);
    }
    
    @RequestMapping(value="account/resetPassword/{userId}/{token}", method=RequestMethod.GET)
    public ModelAndView resetPassword(@PathVariable long userId, @PathVariable String token) {
        Map<String, Object> model = new HashMap<>();
        model.put("userId", userId);
        model.put("token", token);
        return new ModelAndView("changePasswordPublic", "model", model);
    }
    
    @RequestMapping(value="user/updateSelf", method=RequestMethod.POST)
    public ResponseEntity<String> updateSelf(String address1, String address2, String address3, String phone) {
        SuUserDetails userDetails = (SuUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        List<Pair<String,String>> attributes = new ArrayList<>();
        attributes.add(new Pair<>("Osoite1", address1));
        attributes.add(new Pair<>("Osoite2", address2));
        attributes.add(new Pair<>("Osoite3", address3));
        attributes.add(new Pair<>("Puhelinnumero", phone));
        replaceAttributeValues(userDetails.getUserId(), attributes);
        return new ResponseEntity<String>("", HttpStatus.OK);
    }
    
    @RequestMapping(value="user/changePassword", method=RequestMethod.POST)
    public ResponseEntity<String> updatePassword(String oldPassword, String newPassword, HttpServletRequest request) {
        SuUserDetails userDetails = (SuUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        try {
            // TODO this code from Sulka does not compile anymore but we won't juse SU (Syncope) authentication here anyway
            // Just validate the credentials here in the usual way
            // String remoteIp = request.getRemoteAddr();
            // SuAuthenticationProvider.doSuAuthentication(userDetails, userDetails.getUsername(), oldPassword,
            //        appSettings.getSuHost(), appSettings.getSuPort(), appSettings.getSuScheme(), appSettings.getSuBasePath(), remoteIp);
        }
        catch (BadCredentialsException e) {
            throw new AccessDeniedException("Vanha salasana ei kelpaa");
        }
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("password", newPassword);
            submitRequest(userDetails.getUserId(), jsonObject);
            return new ResponseEntity<String>("", HttpStatus.OK);
        }
        catch (JSONException e) {
            log.error("Changing password failed due to internal error", e);
            throw new RuntimeException(e);
        }
    }
    
    @RequestMapping(value="user/changePasswordWithToken", method=RequestMethod.POST)
    public ResponseEntity<String> changePasswordWithToken(String userId, String token, String newPassword) {
        User user = userStore.get(userId);
        if (user == null) {
            log.warn("Not changing password for unknown user " + userId);
            return new ResponseEntity<String>("", HttpStatus.FORBIDDEN);
        }
        if (!user.isPasswordChangeTokenValid()) {
            log.warn("Password change token not valid for user " + userId);
            return new ResponseEntity<String>("", HttpStatus.FORBIDDEN);
        }
        if (StringUtils.isEmpty(user.getPasswordChangeToken())) {
            log.warn("No password change token for user " + userId);
            return new ResponseEntity<String>("", HttpStatus.FORBIDDEN);
        }
        if (!user.getPasswordChangeToken().equals(token)) {
            log.warn("Incorrect password change token supplied for " + userId);
            return new ResponseEntity<String>("", HttpStatus.FORBIDDEN);
        }
        try {
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("password", newPassword);
            addAttribute(jsonObject, "PasswordChangeTokenValidUntil", syncopeTimestamp(new Date(0)));
            addAttribute(jsonObject, "PasswordChangeToken", "");
            submitRequest(user.getId(), jsonObject);
            log.info("Changed password with reset token for user " + userId);
            return new ResponseEntity<String>("", HttpStatus.OK);
        }
        catch (JSONException e) {
            log.error("Changing password failed due to internal error", e);
            throw new RuntimeException(e);
        }
    }
    
    private static String syncopeTimestamp(Date date) {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(date);
    }
    
    @RequestMapping(value="user/requestPasswordChange", method=RequestMethod.POST)
    public ResponseEntity<String> requestPasswordChange(final String userName, HttpServletRequest request) {
        User user = userStore.getByUserName(userName);
        if (user != null) {
            log.info("Requested password change for known user " + userName);
            Calendar requestValidUntil = Calendar.getInstance();
            requestValidUntil.add(Calendar.DATE, 1);
            String token = UUID.randomUUID().toString();
            List<Pair<String,String>> attributes = new ArrayList<>();
            attributes.add(new Pair<>("PasswordChangeTokenValidUntil", syncopeTimestamp(requestValidUntil.getTime())));
            attributes.add(new Pair<>("PasswordChangeToken", token));
            replaceAttributeValues(user.getId(), attributes);
            
            final String passwordChangeUrl = getUrlBase(request) + "/account/resetPassword/" + user.getId() + "/"+ token;
            MimeMessagePreparator preparator = new MimeMessagePreparator() {
                @Override
                public void prepare(MimeMessage mimeMessage) throws Exception {
                    MimeMessageHelper message = new MimeMessageHelper(mimeMessage, false, "UTF-8");
                    message.setFrom("Käyttäjätietojen hallinta <nobody@rktl.fi>");
                    message.setTo(userName);
                    message.setSubject("Salasanan vaihto RKTL:n tietojärjestelmiin");
                    String text =
                        "Hei!\n" +
                        "\n" +
                        "Käyttäjätunnukselle " + userName + " on tilattu uusi salasana.\n" +
                        "Vaihda salasanasi klikkaamalla tätä linkkiä:\n" +
                        passwordChangeUrl + "\n" +
                        "Linkki on voimassa 24 tuntia tämän viestin lähettämisestä.\n" +
                        "Jos et ole pyytänyt itsellesi uutta salasanaa, voit jättää tämän\n" +
                        "viestin huomiotta.";
                    message.setText(text);
                }
            };
            
            try {
                mailSender.send(preparator);
            } catch (MailException e) {
                log.error("Failed to send password reset email. The root cause was", e);
            }
        }
        else {
            log.info("Requested password change for unknown user " + userName);
        }
        return new ResponseEntity<String>("", HttpStatus.OK);
    }
    
    private void replaceAttributeValues(String userId, List<Pair<String, String>> attributes) {
        try {
            JSONObject jsonObject = new JSONObject();
            JSONArray attributesToBeRemoved = new JSONArray();
            for (Pair<String, String> attribute : attributes) {
                if (StringUtils.isEmpty(attribute.getValue())) {
                    attributesToBeRemoved.put(attribute.getKey());
                }
                else {
                    addAttribute(jsonObject, attribute.getKey(), attribute.getValue());
                }
            }
            if (attributesToBeRemoved.length() > 0) {
                jsonObject.put("attributesToBeRemoved", attributesToBeRemoved);
            }
            submitRequest(userId, jsonObject);
        }
        catch (JSONException e) {
            log.error("Updating user attributes failed due to internal error", e);
            throw new RuntimeException(e);
        }
    }

    private void addAttribute(JSONObject jsonObject, String key, String value) throws JSONException {
        JSONObject updateObject = new JSONObject();
        updateObject.put("schema", key);
        JSONArray valueArray = new JSONArray();
        valueArray.put(value);
        updateObject.put("valuesToBeAdded", valueArray);
        jsonObject.append("attributesToBeUpdated", updateObject);
    }
    
    private String getUrlBase(HttpServletRequest request) {
        int serverPort = request.getServerPort();
        String portString = (serverPort != 80 && serverPort != 443) ? ":" + serverPort : "";
        return request.getScheme() + "://" + request.getServerName() + portString + request.getContextPath();
    }
    
    /**
     * TODO this won't be of any use in BMA
     */
    private void submitRequest(String userId, JSONObject requestData) {
        HttpHost httpHost = new HttpHost(appSettings.getSuHost(), appSettings.getSuPort(), appSettings.getSuScheme());
        int timeout = 10000; // connection timeout (ms)
        CredentialsProvider credsProvider = new BasicCredentialsProvider();
        credsProvider.setCredentials(
                new AuthScope(appSettings.getSuHost(), appSettings.getSuPort()),
                new UsernamePasswordCredentials(appSettings.getSuAdminUser(), appSettings.getSuAdminPassword()));
        RequestConfig requestConfig = RequestConfig.custom().setConnectTimeout(timeout).setConnectionRequestTimeout(timeout).build();
        HttpClientBuilder httpClientBuilder = HttpClients.custom().setDefaultCredentialsProvider(credsProvider)
                .setDefaultRequestConfig(requestConfig);
        try (CloseableHttpClient httpClient = httpClientBuilder.build()) {
            AuthCache authCache = new BasicAuthCache();
            BasicScheme basicAuth = new BasicScheme();
            authCache.put(httpHost, basicAuth);
            HttpClientContext localContext = HttpClientContext.create();
            localContext.setAuthCache(authCache);
            URI uri = new URIBuilder().setPath(appSettings.getSuBasePath() + "/rest/user/update").build();
            HttpPost post = new HttpPost(uri);
            requestData.put("id", userId);
            post.setEntity(new StringEntity(requestData.toString(), ContentType.APPLICATION_JSON));
            try (CloseableHttpResponse response = httpClient.execute(httpHost, post, localContext)) {
                StatusLine statusLine = response.getStatusLine();
                if (statusLine.getStatusCode() == HttpStatus.OK.value()) {
                    log.info("Updated user attributes for user " + userId);
                    return;
                }
                log.error("SU: REST service returned erros status " + statusLine.getStatusCode() + " for user " + userId);
                throw new RuntimeException(statusLine.getReasonPhrase());
            }
        }
        catch (IOException | URISyntaxException | JSONException e) {
            log.error("Updating user attributes failed due to internal error", e);
            throw new RuntimeException(e);
        }
    }
}

