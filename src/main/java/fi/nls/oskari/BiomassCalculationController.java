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

import au.com.bytecode.opencsv.CSVWriter;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.vividsolutions.jts.io.WKTWriter;

import fi.luke.bma.model.AdministrativeAreaBiomassCalculationRequestModel;
import fi.luke.bma.model.AdministrativeAreaBiomassCalculationResult;
import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.model.GridCell;
import fi.luke.bma.model.TabularReportData;
import fi.luke.bma.model.ValueAndUnit;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;
import fi.luke.bma.service.MunicipalityService;
import fi.rktl.common.model.DataCell;
import fi.rktl.common.reporting.XlsxWriter;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {

    @Autowired
    private CalculationService calculationService;
    
    @Autowired
    private AttributeService attributeService;
    
    @Autowired
    private MunicipalityService municipalityService;
    
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
     * @throws IOException
     * @throws JsonMappingException
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
     * @throws IOException
     * @throws JsonMappingException
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
    
    private TabularReportData createCalculationReport(BiomassCalculationRequestModel requestModel) {
        @SuppressWarnings("unchecked")
        Map<String, ValueAndUnit<Long>> biomassData = (Map<String, ValueAndUnit<Long>>) calculateBiomassForArea(requestModel).get("values");
        
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
    public Map<?, ?> getMunicipalityGeometry(@RequestBody BiomassCalculationRequestModel requestBody) throws IOException {
    	Point point = requestBody.getPoints().get(0);
    	Map<String, Object> geometryMap = new HashMap<>();
    	GridCell municipality = municipalityService.getMunicipalityByLocation(point.getX().intValue(), point.getY().intValue());
    	geometryMap.put("id", municipality.getCellId());
    	
    	StringWriter stringWriter = new StringWriter();
        WKTWriter wktWriter = new WKTWriter();
        wktWriter.write(municipality.getGeometry(),stringWriter);
        
        geometryMap.put("geometry", stringWriter.toString());
    	//geometryMap.put("geometry", new GeometryJSON().toString(municipality.getGeometry()));
    	return geometryMap;
    }
    
    @RequestMapping(value="municipality/calculate", method=RequestMethod.POST)
    public Map<String, Object> calculateBiomassForMunicipality(@RequestBody AdministrativeAreaBiomassCalculationRequestModel requestBody) {
        List<AdministrativeAreaBiomassCalculationResult> municipalityBiomasses
            = calculationService.getTotalBiomassForMunicipalities(requestBody.getAttributeIds(), requestBody.getAreaIds());
        Map<String, Object> root = new TreeMap<>();
        List<Map<String, ?>> municipalityList = new ArrayList<>();
        Map<Long, Map<String, Object>> municipalityMap = new TreeMap<>();
        for (GridCell cell : municipalityService.getMunicipalitiesById(requestBody.getAreaIds())) {
            Map<String, Object> municipality = new TreeMap<>();
            municipality.put("name", cell.getName());
            municipality.put("id", cell.getCellId());
            municipalityList.add(municipality);
            municipalityMap.put(cell.getCellId(), municipality);
        }
        root.put("municipalities", municipalityList);
        //TreeMap<String, ValueAndUnit<Long>> attributeValues = new TreeMap<>();
       
        for (AdministrativeAreaBiomassCalculationResult result : municipalityBiomasses) {
        	Map<String, Object> municipality = municipalityMap.get(result.getAreaId());
            List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(result.getAttributeId());
            String layerName = attributeNameAndUnit.get(0);
            String layerUnit = attributeNameAndUnit.get(1);
            Long calculatedResult = Math.round(result.getValue());
            String resultAndUnit = Long.toString(calculatedResult) + " " + layerUnit;
            //attributeValues.put(layerName, new ValueAndUnit<Long>(calculatedResult, layerUnit));
            //municipality.put("attributeValues", attributeValues);
            
            municipality.put(layerName, resultAndUnit);
            //municipality.put("a" + result.getAttributeId(), result.getValue());
        }
        return root;
    }
    
    @RequestMapping(value="circle/calculate", method=RequestMethod.POST)
    public Map<String, Object> calculateBiomassForCircle(@RequestBody BiomassCalculationRequestModel requestBody) {    	
        System.out.println(requestBody.getPoints().get(0).getX());        
        System.out.println(requestBody.getPoints().get(0).getY());        
        System.out.println(requestBody.getRadius());        
       return null;
    }
    
}
