package fi.luke.bma.model;

import java.util.ArrayList;

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
        
    }
    
    private ArrayList<Point> points;
    
    private ArrayList<Long> attributes;
    
    private Float radius;

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

	public Float getRadius() {
		return radius;
	}

	public void setRadius(Float radius) {
		this.radius = radius;
	}
    
}
