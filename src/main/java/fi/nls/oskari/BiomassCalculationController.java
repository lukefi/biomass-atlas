package fi.nls.oskari;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.sql.DataSource;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {

    private JdbcTemplate jdbcTemplate;

    @Resource(name="biomassDataSource")
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<?, ?> calculateBiomassForArea(@RequestBody Map<?, ?> requestBody) {
        HashMap<String, Object> result = new HashMap<>();
        String polygonAsWkt = polygonToWkt((List<Map<?,?>>) requestBody.get("points"));
        String sql = "SELECT st_area(st_geomfromtext(?, 3067))";
        Double theNumber = jdbcTemplate.queryForList(sql, new Object[]{polygonAsWkt}, Double.class).get(0);
        // TODO implementation
        result.put("test", theNumber);
        return result;
    }
    
    private String polygonToWkt(List<Map<?, ?>> points) {
        StringBuilder sb = new StringBuilder();
        sb.append("POLYGON((");
        boolean first = true;
        for (Map<?, ?> point : points) {
            if (!first) {
                sb.append(", ");
            }
            first = false;
            sb.append(point.get("x"));
            sb.append(" ");
            sb.append(point.get("y"));
        }
        sb.append("))");
        return sb.toString();
    }
    
}
