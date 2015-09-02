package fi.nls.oskari.spring;

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
}
