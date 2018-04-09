package fi.luke.bma.model;

import java.util.ArrayList;
import java.util.List;

public class BiomassCalculationRequestModel {

    public enum CalculateRule {
        NONE, CALCULATE_BY_MUNICIPALITY_FOR_PROVINCE, CALCULATE_BY_MUNICIPALITY_FOR_ELY, CALCULATE_BY_SUB_DRAINAGE_BASIN;
    }

    public static class Point {

        private Double x;
        private Double y;

        public Double getX() {
            return x;
        }

        public void setX(Double x) {
            this.x = x;
        }

        public Double getY() {
            return y;
        }

        public void setY(Double y) {
            this.y = y;
        }

        public double getDistanceTo(com.vividsolutions.jts.geom.Point jtsPoint) {
            return Math.sqrt(Math.pow(x - jtsPoint.getX(), 2) + Math.pow(y - jtsPoint.getY(), 2));
        }
    }

    private ArrayList<Point> points;

    private ArrayList<Long> attributes;

    private List<Long> areaIds;

    private Float radius;

    private String radiusType;

    private Long boundedAreaGridId;

    private CalculateRule calculateRule; // For Province and ELY center. And also drainage basin 

    public ArrayList<Point> getPoints() {
        return points;
    }

    public void setPoints(ArrayList<Point> points) {
        this.points = points;
    }

    public ArrayList<Long> getAttributes() {
        return attributes;
    }

    public void setAttributes(ArrayList<Long> attributes) {
        this.attributes = attributes;
    }

    public List<Long> getAreaIds() {
        return areaIds;
    }

    public void setAreaIds(List<Long> areaIds) {
        this.areaIds = areaIds;
    }

    public Float getRadius() {
        return radius;
    }

    public void setRadius(Float radius) {
        this.radius = radius;
    }

    public String getRadiusType() {
        return radiusType;
    }

    public void setRadiusType(String radiusType) {
        this.radiusType = radiusType;
    }

    public Long getBoundedAreaGridId() {
        return boundedAreaGridId;
    }

    public void setBoundedAreaGridId(Long boundedAreaGridId) {
        this.boundedAreaGridId = boundedAreaGridId;
    }

    public CalculateRule getCalculateRule() {
        return calculateRule;
    }

    public void setCalculateRule(CalculateRule calculateRule) {
        this.calculateRule = calculateRule;
    }

}
