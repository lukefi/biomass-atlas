package fi.nls.oskari;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class FileDownloadController {

    @Autowired
    ServletContext servletContext;

    private static final int BUFFER_SIZE = 1024;

    private final String filePath = "/downloads/rekisteriseloste_biomassa_atlas.pdf";
    private final String attributeIdMetadataIdJSONFile = "/downloads/attributeid_metadata.json";

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

    @RequestMapping(value = "/getJSON/attributeAndMetadata", method = RequestMethod.GET)
    public @ResponseBody void getJSON(HttpServletResponse response) throws IOException {
        File file = new File(servletContext.getRealPath(attributeIdMetadataIdJSONFile));
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

}
