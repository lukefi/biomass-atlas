package fi.nls.oskari;

import java.sql.Timestamp;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import fi.luke.bma.model.UserRequestModel;
import fi.luke.bma.service.UserService;

@RestController
@RequestMapping(value="biomass/user")
public class BiomassUserController {
	
    @RequestMapping(value="register", method=RequestMethod.GET)
    public ModelAndView register(){
       ModelAndView mv = new ModelAndView("register");
       return mv;
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
    
    @RequestMapping(value="/edit", method=RequestMethod.POST)
    public ModelAndView editUserInformation(
    		@RequestParam(value = "userId") String id, 
    		@RequestParam(value = "firstname") String firstname, 
    		@RequestParam(value = "lastname") String lastname,
    		/*@RequestParam(value = "username") String username, */
    		@RequestParam(value = "email") String email) {
    	ModelAndView mv = new ModelAndView("editUserProfile");    	
    	mv.addObject("id", id);
    	mv.addObject("firstname", firstname);
    	mv.addObject("lastname", lastname);
    	/*mv.addObject("username", username);*/
    	mv.addObject("email", email);
    	return mv;
    }
    
    @RequestMapping(value="/updateSuccess", method=RequestMethod.GET)
    public ModelAndView updateSuccess(){
    	ModelAndView mv = new ModelAndView("message");
    	mv.addObject("updateSuccess", true);
    	return mv;
    }
    
}
