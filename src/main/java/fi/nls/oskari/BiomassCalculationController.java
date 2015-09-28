package fi.nls.oskari;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {

    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<?, ?> calculateBiomassForArea(@RequestBody Map<?, ?> requestBody) {
        HashMap<String, Object> result = new HashMap<>();
        // TODO implementation
        result.put("test", 123);
        return result;
    }
    
}
