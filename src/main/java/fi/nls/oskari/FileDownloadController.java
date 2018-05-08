package fi.nls.oskari;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import fi.luke.bma.model.SearchModel;
import fi.luke.bma.model.SearchReport;
import fi.luke.bma.service.AttributeService;
import fi.luke.bma.service.SearchService;

@Controller
public class FileDownloadController {

    @Autowired
    ServletContext servletContext;

    @Autowired
    private AttributeService attributeService;
    
    @Autowired
    private SearchService searchService;

    private static final int BUFFER_SIZE = 1024;

    private final String filePath = "/downloads/rekisteriseloste_biomassa_atlas.pdf";

    @RequestMapping(value = "/download/registerLeaflet", method = RequestMethod.GET)
    public void downloadRegisterLeaflet(HttpServletResponse response) throws IOException {
        File file = new File(servletContext.getRealPath(filePath));
        String mimeType = servletContext.getMimeType(filePath);
        if (mimeType == null) {
            // set to binary type if MIME mapping not found
            mimeType = "application/octet-stream";
        }
        response.setContentType(mimeType);
        response.setContentLength((int) file.length());
        response.setHeader("Content-Disposition", String.format("attachment; filename=\"%s\"", file.getName()));
        readFile(file, response);
    }

    private void readFile(File file, HttpServletResponse response) throws IOException {
        FileInputStream inputStream = new FileInputStream(file);
        byte[] buffer = new byte[BUFFER_SIZE];
        int bytesRead = -1;
        OutputStream outStream = response.getOutputStream();
        while ((bytesRead = inputStream.read(buffer)) != -1) {
            outStream.write(buffer, 0, bytesRead);
        }
        inputStream.close();
        outStream.close();
    }

    @RequestMapping(value = "/showAndDownload", method = RequestMethod.GET)
    public ModelAndView showAndDownload() {
        ModelAndView mv = new ModelAndView("searchAndExportData");
        mv.addObject("attributes", attributeService.getAllAttributes());
        return mv;
    }

    @RequestMapping(value = "/showAndDownload", method = RequestMethod.POST, consumes = "application/json", 
            headers = "content-type=application/x-www-form-urlencoded")
    public @ResponseBody List<SearchReport> downloadSearchReport(@RequestBody SearchModel searchModel) throws ParseException {
        searchService.searchForBiomassData(searchModel);
        return null;
    }
}
