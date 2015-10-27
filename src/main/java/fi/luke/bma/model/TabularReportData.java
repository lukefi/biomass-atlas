package fi.luke.bma.model;

import java.util.List;

import fi.rktl.common.model.DataCell;

public class TabularReportData {

    private List<String> headers;
    
    private List<List<DataCell>> data;

    public TabularReportData(List<String> headers, List<List<DataCell>> data) {
        this.headers = headers;
        this.data = data;
    }

    public List<String> getHeaders() {
        return headers;
    }

    public void setHeaders(List<String> headers) {
        this.headers = headers;
    }

    public List<List<DataCell>> getData() {
        return data;
    }

    public void setData(List<List<DataCell>> data) {
        this.data = data;
    }
    
}
