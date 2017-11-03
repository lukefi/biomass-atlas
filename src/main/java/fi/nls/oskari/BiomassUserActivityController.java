package fi.nls.oskari;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.luke.bma.model.Attribute;
import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.BoundedAreaService;

@RestController
@RequestMapping(value = "biomass/useractivity")
public class BiomassUserActivityController {

    @Autowired
    private BoundedAreaService boundedAreaService;

    @Autowired
    private AttributeService attributeService;

    private static final String FILENAME = "C:\\Temp\\testUserActivity.txt";
    
    @RequestMapping(value = "boundedarea/calculate", method = RequestMethod.POST)
    public void calculateBiomassForBoundedArea(@RequestBody BiomassCalculationRequestModel requestBody,
            HttpServletRequest request) {
        Map<String, String> requestHeaders = getRequestHeadersInMap(request);
        Map<String, List<String>> searchQueryResult = getSearchQueryResult(requestBody);
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(FILENAME, true))) {
            String content = "";
            for(Map.Entry<String, String> entry : requestHeaders.entrySet()) {
                content += entry.getKey() + " : " + entry.getValue() + "\n";
            }
            for(Map.Entry<String, List<String>> entry : searchQueryResult.entrySet()) {
                content += entry.getKey() + " : ";
                List<String> values = entry.getValue();
                String temp = "";
                for (String value : values){
                    temp += value + "; ";
                };
                content += temp + "\n";
            }
            content += "\n\n";
            bw.write(content);
            bw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Map<String, String> getRequestHeadersInMap(HttpServletRequest request) {
        Map<String, String> result = new HashMap<>();
        Enumeration headerNames = request.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String key = (String) headerNames.nextElement();
            String value = request.getHeader(key);
            result.put(key, value);
        }
        return result;
    }

    private Map<String, List<String>> getSearchQueryResult(BiomassCalculationRequestModel requestBody) {
        Map<String, List<String>> result = new HashMap<>();
        List<GridCell> gridCells = boundedAreaService.getBoundedAreasById(requestBody.getAreaIds(),
                requestBody.getBoundedAreaGridId());
        List<String> boundedAreaNames = new ArrayList<>();
        gridCells.forEach(gridcell -> {
            boundedAreaNames.add(gridcell.getName());
        });
        List<String> attributeNames = new ArrayList<>();
        List<Attribute> attributes = attributeService
                .getAllAttibutesWithIdsSortedByDisplayOrder(requestBody.getAttributes());
        attributes.forEach(attribute -> {
            attributeNames.add(attribute.getNameFI());
        });
        result.put("boundedAreaNames", boundedAreaNames);
        result.put("attributes", attributeNames);
        return result;
    }

}
