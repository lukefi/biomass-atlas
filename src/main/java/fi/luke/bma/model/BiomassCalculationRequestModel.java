package fi.luke.bma.model;

import java.util.ArrayList;
import java.util.List;

public class BiomassCalculationRequestModel {

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

    public String getSearchDescription() {
        // FIXME the selection logic here is duplicate from BiomassCalcu
        if (getRadius() != null && !getRadius().isInfinite()) {
            String typeString;
            if ("road".equals(getRadiusType())) {
                typeString = "Tieverkon kautta";
            }
            else {
                typeString = "Linnuntietä ";
            }
            return typeString + " saavutettavissa olevat alueet pisteestä " + describePoint(getPoints().get(0)) +
                   " säteellä " + getRadius().intValue() + " km";
        } else {
            StringBuilder sb = new StringBuilder();
            sb.append("Monikulmion alueelta lasketut biomassat. Monikulmion kulmapisteet ovat");
            for (Point point : getPoints()) {
                sb.append(' ');
                sb.append(describePoint(point));
            }
            return sb.toString();
        }
    }
    
    private String describePoint(Point point) {
        return "(" + point.getX().intValue() + ", " + point.getY().intValue() + ")";
    }
    
}
