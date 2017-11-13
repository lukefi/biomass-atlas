package fi.nls.oskari;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.service.UserActivityLogService;
import fi.luke.bma.service.UserActivityLogService.UserActivityFunction;

@RestController
@RequestMapping(value = "biomass/useractivity")
public class BiomassUserActivityController {

    @Autowired
    private UserActivityLogService userActivityLogService;

    @RequestMapping(value = "boundedarea", method = RequestMethod.POST)
    public void logUserActivityForBoundedArea(@RequestBody BiomassCalculationRequestModel requestBody,
            HttpServletRequest request) {
        userActivityLogService.createUserActivityLog(requestBody, request, UserActivityFunction.BOUNDED_AREA);
    }
    
    @RequestMapping(value = "freeform", method = RequestMethod.POST)
    public void logUserActivityForFreeform(@RequestBody BiomassCalculationRequestModel requestBody,
            HttpServletRequest request) {
        userActivityLogService.createUserActivityLog(requestBody, request, UserActivityFunction.FREE_SELECTION);
    }
    
    @RequestMapping(value = "circle", method = RequestMethod.POST)
    public void logUserActivityForCircle(@RequestBody BiomassCalculationRequestModel requestBody,
            HttpServletRequest request) {
        userActivityLogService.createUserActivityLog(requestBody, request, UserActivityFunction.CIRCLE_RADIUS);
    }
    
    @RequestMapping(value = "roadbuffer", method = RequestMethod.POST)
    public void logUserActivityForRoadBuffer(@RequestBody BiomassCalculationRequestModel requestBody,
            HttpServletRequest request) {
        userActivityLogService.createUserActivityLog(requestBody, request, UserActivityFunction.CIRCLE_ROAD);
    }

}
