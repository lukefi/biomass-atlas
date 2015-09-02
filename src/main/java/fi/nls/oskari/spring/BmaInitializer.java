package fi.nls.oskari.spring;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration.Dynamic;

import org.springframework.web.WebApplicationInitializer;

public class BmaInitializer implements WebApplicationInitializer {

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
        Dynamic staticServletConf = servletContext.addServlet("staticContent", new StaticContentServlet());
        staticServletConf.addMapping("/Oskari/*");
    }

}
