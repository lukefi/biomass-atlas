package fi.nls.oskari;

import java.sql.Timestamp;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import fi.luke.bma.service.UserService;

@RestController
@RequestMapping(value="biomass/user")
public class BiomassUserController {
	
	@Autowired
	private UserService userService;
	
    @RequestMapping(value="register", method=RequestMethod.GET)
    public ModelAndView register(){
       ModelAndView mv = new ModelAndView("register");
       return mv;
    }
    /*
    @RequestMapping(value="register", method=RequestMethod.POST)
    public ModelAndView createNewRegistration(@ModelAttribute("model") UserRequestModel model){
        ModelAndView mv = new ModelAndView("message");
        VerificationToken vt = new VerificationToken();
        vt.setFirstname(model.getFirstname());
        vt.setLastname(model.getLastname());
        vt.setUsername(model.getUsername());
        vt.setEmail(model.getEmail());
        vt.setEnabled(false);
        vt.setExpiryTime(createExpiryTime());
        userService.insert(vt);
        return mv;
     }
    */
    public Timestamp createExpiryTime(){
    	Calendar calender = Calendar.getInstance();
        Timestamp currentTime = new java.sql.Timestamp(calender.getTime().getTime());
        calender.setTime(currentTime);
        calender.add(Calendar.DAY_OF_MONTH, 1);
        Timestamp expiryTime = new java.sql.Timestamp(calender.getTime().getTime());
        return expiryTime;
    }
    
    
    @RequestMapping(value="/forgotPassword", method=RequestMethod.GET)
    public ModelAndView forgotPassword(@ModelAttribute String uuid){
       ModelAndView mv = new ModelAndView("forgotPasswordEmail");
       return mv;
    }
    
    @RequestMapping(value="/emailSent", method=RequestMethod.GET)
    public ModelAndView emailSent(){
    	ModelAndView mv = new ModelAndView("message");
    	mv.addObject("emailSent", true);
    	return mv;
    }
    
    @RequestMapping(value="/passwordChanged", method=RequestMethod.GET)
    public ModelAndView passwordChanged(){
    	ModelAndView mv = new ModelAndView("message");
    	mv.addObject("passwordChanged", true);
    	return mv;
    }
    
    @RequestMapping(value="/registrationSuccess", method=RequestMethod.GET)
    public ModelAndView registrationSuccess(){
    	ModelAndView mv = new ModelAndView("message");
    	mv.addObject("registrationSuccess", true);
    	return mv;
    }
}
