package fi.nls.oskari;

import java.sql.Timestamp;
import java.util.Calendar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import fi.luke.bma.model.UserRequestModel;
import fi.luke.bma.model.VerificationToken;
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
    
    public Timestamp createExpiryTime(){
    	Calendar calender = Calendar.getInstance();
        Timestamp currentTime = new java.sql.Timestamp(calender.getTime().getTime());
        calender.setTime(currentTime);
        calender.add(Calendar.DAY_OF_MONTH, 1);
        Timestamp expiryTime = new java.sql.Timestamp(calender.getTime().getTime());
        return expiryTime;
    }
}
