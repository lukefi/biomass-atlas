package fi.nls.oskari;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import fi.luke.bma.model.Feedback;

@RestController
@RequestMapping(value = "biomass/feedback")
public class BiomassEmailController {
    
    @Resource private MailSender mailSender;
    @Resource private SimpleMailMessage templateMessage;
    
    private final String FEEDBACK_SUBJECT = "Biomassas Atlas - Palaute";
    
    @Autowired
    private Environment env;  
    
	public MailSender getMailSender() {
        return mailSender;
    }

    public SimpleMailMessage getTemplateMessage() {
        return templateMessage;
    }

    @RequestMapping(method = RequestMethod.GET)
    public ModelAndView getFeedback(){
		ModelAndView mv = new ModelAndView("feedbackForm");	      
		return mv;
    }
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Boolean> sendFeedback(@RequestBody Feedback feedback) {
	    SimpleMailMessage msg = new SimpleMailMessage(this.templateMessage);
	    String name = feedback.getName();
        String message = feedback.getMessage();
        String email = feedback.getEmail();                   
        
        if (message.isEmpty()) {
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        } 
        if (name.isEmpty()) {
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        } else {
            message += "\n\nLähettäjä : " + name;
        }          
        if (email != null && !email.isEmpty()) {
            message += "\nLähettäjän sähköpostiosoite : " + email;
        }       
        msg.setText(message);
        
        //Sender and receiver are set to be same (Because of feedback)
        String receiver = env.getProperty("email.sender");
        if(receiver == null){
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        }
        
        String subject = env.getProperty("email.subject");
        if(subject == null){
            subject = FEEDBACK_SUBJECT;
        }
        
        msg.setSubject(subject);
        msg.setTo(receiver);
        try {
            this.mailSender.send(msg);           
        }
        catch (MailException ex) {
            return new ResponseEntity<Boolean>(false, HttpStatus.OK);
        }
        return new ResponseEntity<Boolean>(true, HttpStatus.OK);
	}
}
