package fi.nls.oskari;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.CalculationService;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {

    private JdbcTemplate jdbcTemplate;
    
    @Autowired
    private CalculationService calculationService;
    
    @Autowired
    private AttributeService attributeService;
    
    @Resource(name="biomassDataSource")
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<?, ?> calculateBiomassForArea(@RequestBody BiomassCalculationRequestModel requestBody) {
        HashMap<String, Object> result = new HashMap<>();
        String polygonAsWkt = polygonToWkt(requestBody.getPoints());
        long gridId = 1;
        for(long attributeId : requestBody.getAttributes()){
        	double calculatedResult =  calculationService.getTotalBiomassForAttribute(attributeId, gridId, polygonAsWkt);
        	List<String> attributeNameAndUnit = attributeService.getAttributeNameAndUnit(attributeId);
        	String attributeName = attributeNameAndUnit.get(0);
        	String attributeUnit = attributeNameAndUnit.get(1);
        	result.put(attributeName, Math.round(calculatedResult) + " " + attributeUnit);
        }
        return result;
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
