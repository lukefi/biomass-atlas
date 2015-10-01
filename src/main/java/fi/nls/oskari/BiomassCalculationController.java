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

import fi.luke.bma.model.BiomassCalculationRequestModel;
import fi.luke.bma.model.BiomassCalculationRequestModel.Point;

@RestController
@RequestMapping(value="biomass")
public class BiomassCalculationController {

    private JdbcTemplate jdbcTemplate;

    @Resource(name="biomassDataSource")
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<?, ?> calculateBiomassForArea(@RequestBody BiomassCalculationRequestModel requestBody) {
        HashMap<String, Object> result = new HashMap<>();
        String polygonAsWkt = polygonToWkt(requestBody.getPoints());
        long attributeId = requestBody.getAttributes().get(0); // TODO handle more than one attribute
        long validityId = 2; // TODO find out the latest validity ID for each attribute
        long gridId = 1;
        String sql =
                "SELECT COALESCE(sum(d.value), 0) FROM biomass_data d, grid_cell c " +
                "WHERE d.cell_id = c.id AND c.grid_id = ? " +
                "AND d.validity_id = ? AND d.attribute_id = ? " +
                "AND st_contains(st_geomfromtext(?, 3067), st_centroid(c.geometry))";
        Object[] arguments = new Object[]{gridId, validityId, attributeId, polygonAsWkt};
        double theNumber = jdbcTemplate.queryForList(sql, arguments, Double.class).get(0);
        // TODO implementation
        result.put("test", theNumber);
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
