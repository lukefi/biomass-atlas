package fi.nls.oskari;

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
       return mv;
    }
}
