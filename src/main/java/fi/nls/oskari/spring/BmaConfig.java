package fi.nls.oskari.spring;

import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.hibernate.jpa.HibernatePersistenceProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;
import org.springframework.core.env.Environment;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

@Configuration
@PropertySources(value=@PropertySource("file:///${luke.oskariconfdir}/bma.conf"))
@ComponentScan({"fi.luke.bma.dao", "fi.luke.bma.service"})
public class BmaConfig extends WebMvcConfigurerAdapter {

    @Autowired
    private Environment env;
    
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
        dataSource.setUrl(env.getProperty("jdbc.url"));
        dataSource.setUsername(env.getProperty("jdbc.username"));
        dataSource.setPassword(env.getProperty("jdbc.password"));
        dataSource.setMinIdle(0);
        dataSource.setMaxIdle(0);
        return dataSource;
    }
    
    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
       LocalContainerEntityManagerFactoryBean entityManager = new LocalContainerEntityManagerFactoryBean();
       entityManager.setDataSource(biomassDataSource());
       entityManager.setPackagesToScan(new String[] { "fi.luke.bma.model" });
       entityManager.setPersistenceProviderClass(HibernatePersistenceProvider.class);

       JpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
       entityManager.setJpaVendorAdapter(vendorAdapter);
       entityManager.setJpaProperties(additionalProperties());
       return entityManager;
    }
    
    public Properties additionalProperties() {
        Properties properties = new Properties();
        properties.setProperty("hibernate.hbm2ddl.auto", "validate");
        properties.setProperty("hibernate.dialect", "org.hibernate.spatial.dialect.postgis.PostgisDialect");
        properties.setProperty("testWhileIdle", "true");
        properties.setProperty("timeBetweenEvictionRunsMillis", "60000");
        return properties;
     }
    
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**").addResourceLocations("/resources/");
    }
 
    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }
}
