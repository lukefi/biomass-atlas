package fi.nls.oskari;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.opencsv.CSVWriter;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.TabularReportData;
import fi.luke.bma.model.ValueAndUnit;
import fi.luke.bma.service.CalculatorFactory;
import fi.luke.bma.service.GeometryService;
import fi.luke.bma.service.calculator.BoundedAreaCalculator;
import fi.luke.bma.service.calculator.Calculator;
import fi.luke.bma.service.calculator.CircleCalculator;
import fi.luke.bma.service.calculator.FreeformPolygonCalculator;
import fi.luke.bma.service.calculator.RoadBufferCalculator;
import fi.rktl.common.model.DataCell;
import fi.rktl.common.reporting.XlsxWriter;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {
	
	@Autowired
	private CalculatorFactory calculatorFactory;
	
    @Autowired
    private GeometryService geometryService;
    
    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<String, ?> calculateBiomassForArea(@RequestBody BiomassCalculationRequestModel requestBody) {
        return calculatorFactory.getInstance(requestBody, FreeformPolygonCalculator.class).calculateBiomass();
    }
    
    @RequestMapping(value="boundedarea/calculate", method=RequestMethod.POST)
    public Map<String, ?> calculateBiomassForBoundedArea(@RequestBody BiomassCalculationRequestModel requestBody) {       
        return calculatorFactory.getInstance(requestBody, BoundedAreaCalculator.class).calculateBiomass();
    }
    
    @RequestMapping(value="circle/calculate", method=RequestMethod.POST)
    public Map<String, ?> calculateBiomassForCircle(@RequestBody BiomassCalculationRequestModel requestBody) { 
        return calculatorFactory.getInstance(requestBody, CircleCalculator.class).calculateBiomass();
    }
    
    @RequestMapping(value="roadbuffer/calculate", method=RequestMethod.POST)
    public Map<String, ?> calculateBiomassForRoadBuffer(@RequestBody BiomassCalculationRequestModel requestBody) { 
        return calculatorFactory.getInstance(requestBody, RoadBufferCalculator.class).calculateBiomass();
    }
    
    @RequestMapping(value="boundedarea/geometry", method=RequestMethod.POST)
    public Map<?, ?> getMunicipalityGeometry(@RequestBody BiomassCalculationRequestModel requestBody) throws IOException {
        return geometryService.getBoundedArea(requestBody.getPoints().get(0), requestBody.getBoundedAreaGridId());
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
    	    new XlsxWriter().writeWithMetadata(response.getOutputStream(), reportData.getHeaders(), reportData.getData(),
    	            "areaReport", requestModel.getSearchDescription());
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
        Calculator calculator = calculatorFactory.getInstance(requestModel);
        Map<String, ValueAndUnit<Long>> biomassData = (Map<String, ValueAndUnit<Long>>) calculator.calculateBiomass().get("values");
        
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

}
