package fi.nls.oskari;

import java.util.HashMap;
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

    //@Resource(name="biomassDataSource")
    public void setDataSource(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @RequestMapping(value="area", method=RequestMethod.POST)
    public Map<?, ?> calculateBiomassForArea(@RequestBody Map<?, ?> requestBody) {
        HashMap<String, Object> result = new HashMap<>();
        // TODO implementation
        result.put("test", 123);
        return result;
    }
    
}
