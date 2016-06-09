package fi.luke.bma.model;

import java.util.Date;
import java.util.Iterator;
import java.util.List;

import fi.rktl.common.model.DataCell;
import fi.rktl.common.reporting.ColumnInfo;
import fi.rktl.common.reporting.ReportDataIterator;

public class TabularReportData implements ReportDataIterator {

    private final List<String> headers;
    
    private final List<List<DataCell>> data;
    
    private final Iterator<List<DataCell>> dataIterator;

    public TabularReportData(List<String> headers, List<List<DataCell>> data) {
        this.headers = headers;
        this.data = data;
        this.dataIterator = data.iterator();
    }

    public List<String> getHeaders() {
        return headers;
    }

    public List<List<DataCell>> getData() {
        return data;
    }

    @Override
    public boolean hasNext() {
        return dataIterator.hasNext();
    }

    @Override
    public List<DataCell> next() {
        return dataIterator.next();
    }

    @Override
    public ColumnInfo[] getColumnNames() {
        ColumnInfo[] infoList = new ColumnInfo[headers.size()];
        for (int i = 0; i < headers.size(); i++) {
            ColumnInfo ci = new ColumnInfo();
            ci.setName(headers.get(i));
            infoList[i] = ci;
        }
        return infoList;
    }

    @Override
    public int getColumnCount() {
        return headers.size();
    }

    @Override
    public Date getUpdateTimestamp() {
        return null;
    }
    
}
