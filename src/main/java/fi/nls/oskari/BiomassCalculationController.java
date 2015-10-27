package fi.nls.oskari;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;
import fi.rktl.common.model.DataCell;
import fi.rktl.common.reporting.XlsxWriter;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {

    @Autowired
    private CalculationService calculationService;
    
    @Autowired
    private AttributeService attributeService;
    
    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<String, ?> calculateBiomassForArea(@RequestBody BiomassCalculationRequestModel requestBody) {
        TreeMap<String, Object> result = new TreeMap<>();
        String polygonAsWkt = polygonToWkt(requestBody.getPoints());
        long gridId = 1;
        double areaOfPolygon =  calculationService.getAreaOfPolygon(polygonAsWkt)/1000000; // For m2 converted to km2
        Integer numberOfCentroids = calculationService.getNumberOfCentroids(gridId, polygonAsWkt);
        if((areaOfPolygon < (0.95 * numberOfCentroids)) || (areaOfPolygon > (1.05 * numberOfCentroids))){
        	result.put("Error", "Area selected is too small or too much of grid cell centroids.");
        }
        for(long attributeId : requestBody.getAttributes()){
        	double calculatedResult =  calculationService.getTotalBiomassForAttribute(attributeId, gridId, polygonAsWkt);
        	List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
        	String attributeName = attributeNameAndUnit.get(0);
        	String attributeUnit = attributeNameAndUnit.get(1);
        	result.put(attributeName, Math.round(calculatedResult) + " " + attributeUnit);
        }
        return result;
    }
    
    //Export xlsx file
    //TODO: RequestBody maybe cannot use with exporting xlsx file - should find other 
    @RequestMapping(value="exportXlsx", method=RequestMethod.POST)
    public void exportFile(@RequestBody BiomassCalculationRequestModel requestBody, HttpServletResponse response){
    	
    	response.addHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    	response.addHeader("Content-Disposition", "attachment; filename=areaReport.xlsx");
    	XlsxWriter writer = new XlsxWriter();
    	
    	String filename = "areaReport";
    	
    	Map<String, ?> biomassData = calculateBiomassForArea(requestBody);
    	List<String> plainColumnNames = new ArrayList<>();
    	List<List<DataCell>> data = new ArrayList<>();
    	List<DataCell> dataRow = new ArrayList<>();
    	data.add(dataRow);
    	for (Entry<String, ?> attributeEntry : biomassData.entrySet()) {
    		plainColumnNames.add(attributeEntry.getKey());
    		dataRow.add(new DataCell(attributeEntry.getValue()));
    	}
    	
    	try {
			writer.write(response.getOutputStream(), plainColumnNames, data, filename);
    		//writer.write(response.getOutputStream(), plainColumnNames, data.getData(), info.getActionMethod());
    	} catch (IOException e) {
    		throw new RuntimeException(e);
    	}
    	
    }
    
    
    
    private String polygonToWkt(List<Point> points) {
        StringBuilder sb = new StringBuilder();
        sb.append("POLYGON((");
        boolean first = true;
        for (Point point : points) {
            if (!first) {
                sb.append(", ");
            }
            first = false;
            sb.append(point.getX());
            sb.append(" ");
            sb.append(point.getY());
        }
        sb.append("))");
        return sb.toString();
    }
    
}
