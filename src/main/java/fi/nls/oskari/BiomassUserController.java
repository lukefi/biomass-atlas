package fi.nls.oskari;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@RestController
@RequestMapping(value="biomass/user")
public class BiomassUserController {
	
    @RequestMapping(value="register", method=RequestMethod.GET)
    public ModelAndView register(){
       ModelAndView mv = new ModelAndView("register");
       mv.addObject("editExisting", false);
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
    
    @RequestMapping(value="/edit", method=RequestMethod.GET)
    public ModelAndView editUserInformation() {
    	ModelAndView mv = new ModelAndView("register");
    	mv.addObject("editExisting", true);
    	return mv;
    }
    
    @RequestMapping(value="/updateSuccess", method=RequestMethod.GET)
    public ModelAndView updateSuccess(){
    	ModelAndView mv = new ModelAndView("message");
    	mv.addObject("updateSuccess", true);
    	return mv;
    }
    
}
