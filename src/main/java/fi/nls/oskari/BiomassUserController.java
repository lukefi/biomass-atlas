package fi.nls.oskari;

import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import fi.luke.bma.model.UserRequestModel;

@RestController
@RequestMapping(value="biomass/user")
public class BiomassUserController {

    @RequestMapping(value="register", method=RequestMethod.GET)
    public ModelAndView register(){
       ModelAndView mv = new ModelAndView("register");
       return mv;
    }
    
    @RequestMapping(value="register", method=RequestMethod.POST)
    public ModelAndView createNewRegistration(@ModelAttribute("model") UserRequestModel model){
        ModelAndView mv = new ModelAndView("message");
        return mv;
     }
}
