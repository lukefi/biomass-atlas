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

    @RequestMapping(value = "boundedarea/calculate", method = RequestMethod.POST)
    public void calculateBiomassForBoundedArea(@RequestBody BiomassCalculationRequestModel requestBody,
            HttpServletRequest request) {
        userActivityLogService.createUserActivityLog(requestBody, request, UserActivityFunction.BOUNDED_AREA);
    }

}
