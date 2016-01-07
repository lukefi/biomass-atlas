package fi.nls.oskari;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vividsolutions.jts.io.WKTWriter;

import au.com.bytecode.opencsv.CSVWriter;
import fi.luke.bma.model.AdministrativeAreaBiomassCalculationRequestModel;
import fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult;
import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.model.TabularReportData;
import fi.luke.bma.model.ValueAndUnit;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.BoundedAreaService;
import fi.luke.bma.service.CalculationService;
import fi.luke.bma.service.GeometryService;
import fi.rktl.common.model.DataCell;
import fi.rktl.common.reporting.XlsxWriter;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {
	
	private final Integer GRID_ID_1KM_BY_1KM = 1; // From database table 'grid' 
	private final Integer GRID_ID_MUNICIPALITY = 2; // From database table 'grid' 
	private final Integer GRID_ID_DRAINAGE_BASIN = 4; // From database table 'grid' 

    @Autowired
    private CalculationService calculationService;
    
    @Autowired
    private GeometryService geometryService;
    
    @Autowired
    private AttributeService attributeService;    
      
    @Autowired
    private BoundedAreaService boundedAreaService;
    
    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<String, ?> calculateBiomassForArea(@RequestBody BiomassCalculationRequestModel requestBody) {
        TreeMap<String, Object> result = new TreeMap<>();
        String polygonAsWkt = polygonToWkt(requestBody.getPoints());
        long gridId = 1;
        double areaOfPolygon =  calculationService.getAreaOfPolygon(polygonAsWkt)/1000000; // For m2 converted to km2
        Integer numberOfCentroids = calculationService.getNumberOfCentroids(gridId, polygonAsWkt);
        if((areaOfPolygon < (0.95 * numberOfCentroids)) || (areaOfPolygon > (1.05 * numberOfCentroids))){
        	result.put("error", "Valittu alue on laskentatarkkuuteen nähden liian pieni, tuloksessa voi olla merkittävää virhettä.");
        }
        TreeMap<String, ValueAndUnit<Long>> attributeValues = new TreeMap<>();
        for(long attributeId : requestBody.getAttributes()){
        	double calculatedResult =  calculationService.getTotalBiomassForAttribute(attributeId, gridId, polygonAsWkt);
        	List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
        	String attributeName = attributeNameAndUnit.get(0);
        	String attributeUnit = attributeNameAndUnit.get(1);
        	attributeValues.put(attributeName, new ValueAndUnit<Long>(Math.round(calculatedResult), attributeUnit));
        }
        result.put("values", attributeValues);
        return result;
    }
    
    /**
     * Export xlsx file
     */
    @RequestMapping(value="area/xlsx", method=RequestMethod.POST)
    public void exportXslx(@RequestParam String query, HttpServletResponse response) throws JsonMappingException, IOException {
        BiomassCalculationRequestModel requestModel = new ObjectMapper().readValue(query, BiomassCalculationRequestModel.class);
    	
    	response.addHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    	response.addHeader("Content-Disposition", "attachment; filename=areaReport.xlsx");
    	
    	TabularReportData reportData = createCalculationReport(requestModel);
    	
    	try {
    	    new XlsxWriter().write(response.getOutputStream(), reportData.getHeaders(), reportData.getData(), "areaReport");
    	} catch (IOException e) {
    		throw new RuntimeException(e);
    	}
    }

    /**
     * Export CSV file
     */
    @RequestMapping(value="area/csv", method=RequestMethod.POST)
    public void exportCsv(@RequestParam String query, HttpServletResponse response) throws JsonMappingException, IOException {
        BiomassCalculationRequestModel requestModel = new ObjectMapper().readValue(query, BiomassCalculationRequestModel.class);
        
        response.addHeader("Content-Type", "text/csv;Charset=" + response.getCharacterEncoding());
        response.addHeader("Content-Disposition", "attachment; filename=areaReport.csv");

        TabularReportData reportData = createCalculationReport(requestModel);
        
        try (CSVWriter writer = new CSVWriter(response.getWriter(), ';')) {
            writer.writeNext(reportData.getHeaders().toArray(new String[reportData.getHeaders().size()]));
            for (List<DataCell> row : reportData.getData()) {
                String[] line = new String[row.size()];
                for (int i = 0; i < line.length; i++) {
                    line[i] = row.get(i).toString();
                }
                writer.writeNext(line);
            }
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
    
    @SuppressWarnings("unchecked")
	private TabularReportData createCalculationReport(BiomassCalculationRequestModel requestModel) {
        Map<String, ValueAndUnit<Long>> biomassData;
        if (requestModel.getRadius() != null && !requestModel.getRadius().isInfinite()){
            if ("road".equals(requestModel.getRadiusType())) {
                biomassData = (Map<String, ValueAndUnit<Long>>) calculateBiomassForRoadBuffer(requestModel).get("values");
            }
            else {
                biomassData = (Map<String, ValueAndUnit<Long>>) calculateBiomassForCircle(requestModel).get("values");
            }
        } else {
        	biomassData = (Map<String, ValueAndUnit<Long>>) calculateBiomassForArea(requestModel).get("values");
        }
        
        List<String> plainColumnNames = new ArrayList<>();
        List<List<DataCell>> data = new ArrayList<>();
        List<DataCell> dataRow = new ArrayList<>();
        List<DataCell> unitRow = new ArrayList<>();
        data.add(dataRow);
        data.add(unitRow);
        for (Entry<String, ValueAndUnit<Long>> attributeEntry : biomassData.entrySet()) {
            plainColumnNames.add(attributeEntry.getKey());
            dataRow.add(new DataCell(attributeEntry.getValue().getValue()));
            unitRow.add(new DataCell(attributeEntry.getValue().getUnit()));
        }
        return new TabularReportData(plainColumnNames, data);
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
    
    @RequestMapping(value="municipality/geometry", method=RequestMethod.POST)
    public Map<?, ?> getMunicipalityGeometry(
    		@RequestBody BiomassCalculationRequestModel requestBody) throws IOException {
    	Map<String, Object> geometryMap = getBoundedAreaGeometry(requestBody, GRID_ID_MUNICIPALITY);
    	return geometryMap;
    }
    
    @RequestMapping(value="municipality/calculate", method=RequestMethod.POST)
    public Map<String, Object> calculateBiomassForMunicipality(
    		@RequestBody AdministrativeAreaBiomassCalculationRequestModel requestBody) {       
        Map<String, Object> root = calculateBiomassForBoundedArea(requestBody, GRID_ID_MUNICIPALITY);
   	 	return root;
    }
    
    @RequestMapping(value="circle/calculate", method=RequestMethod.POST)
    public Map<String, ?> calculateBiomassForCircle(@RequestBody BiomassCalculationRequestModel requestBody) { 
    	String circleAsWkt = geometryService.getCircle(requestBody.getPoints().get(0), requestBody.getRadius());
        return calculateBiomassForWktGeometry(requestBody, circleAsWkt);
    }
    
    @RequestMapping(value="roadbuffer/calculate", method=RequestMethod.POST)
    public Map<String, ?> calculateBiomassForRoadBuffer(@RequestBody BiomassCalculationRequestModel requestBody) { 
        String roadBufferAsWkt = geometryService.getRoadBuffer(requestBody.getPoints().get(0), requestBody.getRadius());
        return calculateBiomassForWktGeometry(requestBody, roadBufferAsWkt);
    }

    private Map<String, ?> calculateBiomassForWktGeometry(BiomassCalculationRequestModel requestBody, String geometryAsWkt) {
        Map<String, String> value = new HashMap<String, String>();
        value.put("geo", geometryAsWkt);
        
        TreeMap<String, ValueAndUnit<Long>> attributeValues = new TreeMap<>();
        TreeMap<String, Object> result = new TreeMap<>();
        for(long attributeId : requestBody.getAttributes()){
        	double calculatedResult =  calculationService.getTotalBiomassForAttribute(attributeId, GRID_ID_1KM_BY_1KM, geometryAsWkt);
        	List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
        	String attributeName = attributeNameAndUnit.get(0);
        	String attributeUnit = attributeNameAndUnit.get(1);
        	attributeValues.put(attributeName, new ValueAndUnit<Long>(Math.round(calculatedResult), attributeUnit));
        }
        result.put("values", attributeValues);
        result.put("geo", geometryAsWkt);
        return result;
    }
    
    @RequestMapping(value="drainagebasin/geometry", method=RequestMethod.POST)
    public Map<String, Object> getDrainageBasinGeometry(
    		@RequestBody BiomassCalculationRequestModel requestBody) throws IOException {
    	Map<String, Object> geometryMap = getBoundedAreaGeometry(requestBody, GRID_ID_DRAINAGE_BASIN);
    	return geometryMap;
    }
    
    @RequestMapping(value="drainagebasin/calculate", method=RequestMethod.POST)
    public Map<String, Object> calculateBiomassForDrainageBasin(
    		@RequestBody AdministrativeAreaBiomassCalculationRequestModel requestBody) {      
    	 Map<String, Object> root = calculateBiomassForBoundedArea(requestBody, GRID_ID_DRAINAGE_BASIN);
    	 return root;    	 
    }
    
    /**
     * Geometry of bounded area (like: municipality, drainage basin, etc) is calculated.
     * @param requestModel is BiomassCalculationRequestModel object which holds point(s) value.
     * @param gridId is an integer id of bounded area.
     * @return m which includes id and geometry of bounded area.
     * @throws IOException if writing fails
     */
    public Map<String, Object> getBoundedAreaGeometry(BiomassCalculationRequestModel requestModel, 
    		int gridId) throws IOException {
    	Point point = requestModel.getPoints().get(0);
    	Map<String, Object> geometryMap = new HashMap<>();
    	GridCell boundedArea = boundedAreaService.getBoundedAreaByLocation(point.getX().intValue(), 
    			point.getY().intValue(), gridId);
    	geometryMap.put("id", boundedArea.getCellId());
    	
    	StringWriter stringWriter = new StringWriter();
        WKTWriter wktWriter = new WKTWriter();
        wktWriter.write(boundedArea.getGeometry(), stringWriter);
        
        geometryMap.put("geometry", stringWriter.toString());
    	return geometryMap;
    }
    
    /**
     * Calculates biomass for bounded areas (like; municipality, drainage basin, etc)
     * @param requestmodel is AdministrativeAreaBiomassCalculationRequestModel object
     * @param gridId is an integer id of bounded area.
     * @return map which includes id, name and biomass of bounded area(s).
     */
    public Map<String, Object> calculateBiomassForBoundedArea(
    		AdministrativeAreaBiomassCalculationRequestModel requestmodel, int gridId) {
    	List<AdministrativeAreaBiomassCalculationResult> boundedAreaBiomasses
    	  		= calculationService.getTotalBiomassForBoundedArea(requestmodel.getAttributeIds(),
    	  				requestmodel.getAreaIds(), gridId);
    	Map<String, Object> root = new TreeMap<>();
    	List<Map<String, ?>> boundedAreaList = new ArrayList<>();
        Map<Long, Map<String, Object>> boundedAreaMap = new TreeMap<>();
        for (GridCell cell : boundedAreaService.getBoundedAreasById(requestmodel.getAreaIds(), gridId)) {
        	Map<String, Object> boundedArea = new TreeMap<>();
        	boundedArea.put("name", cell.getName());
        	boundedArea.put("id", cell.getCellId());
        	boundedAreaList.add(boundedArea);
        	boundedAreaMap.put(cell.getCellId(), boundedArea);
        }
        root.put("boundedAreas", boundedAreaList);
     
        for (AdministrativeAreaBiomassCalculationResult result : boundedAreaBiomasses) {
        	Map<String, Object> boundedArea = boundedAreaMap.get(result.getAreaId());
        	List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(
        			result.getAttributeId());
        	String layerName = attributeNameAndUnit.get(0);
        	String layerUnit = attributeNameAndUnit.get(1);
        	Long calculatedResult = Math.round(result.getValue());
        	String resultAndUnit = Long.toString(calculatedResult) + " " + layerUnit;
          
        	boundedArea.put(layerName, resultAndUnit);
        }
        return root;
    }
    
}
