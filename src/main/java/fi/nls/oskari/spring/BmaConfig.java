package fi.nls.oskari.spring;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

@Configuration
public class BmaConfig {

    @Bean
    public ViewResolver getBmaViewResolver() {
        UrlBasedViewResolver resolver = new UrlBasedViewResolver();
        resolver.setViewClass(JstlView.class);
        resolver.setPrefix("/views/");
        resolver.setSuffix(".jsp");
        resolver.setOrder(10);
        return resolver;
    }
    
    @Bean
    public DataSource biomassDataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl("jdbc:postgresql://jokbaptest1.ns.luke.fi:5432/biomass_data");
        dataSource.setUsername("oskari");
        dataSource.setPassword("TODO read this and the above from preferences");
        dataSource.setMinIdle(0);
        dataSource.setMaxIdle(0);
        return dataSource;
    }
}
