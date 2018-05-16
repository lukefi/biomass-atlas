package fi.luke.bma.model;

import org.hibernate.annotations.Type;

import com.vividsolutions.jts.geom.MultiPolygon;


public class SearchReport {

	private Long year;

    private String attributeName;

    private Double value;

    @Type(type = "org.hibernate.spatial.GeometryType")
    private MultiPolygon geometry;

    public SearchReport(Long year, String attributeName, Double value, MultiPolygon geometry) {
		this.year = year;
		this.attributeName = attributeName;
		this.value = value;
		this.geometry = geometry;
	}

	public Long getYear() {
        return year;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public String getAttributeName() {
        return attributeName;
    }

    public void setAttributeName(String attributeName) {
        this.attributeName = attributeName;
    }

    public Double getValue() {
        return value;
    }

    public void setValue(Double value) {
        this.value = value;
    }

    public MultiPolygon getGeometry() {
        return geometry;
    }

    public void setGeometry(MultiPolygon geometry) {
        this.geometry = geometry;
    }

}
