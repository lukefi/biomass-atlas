package fi.luke.bma.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.hibernate.annotations.Type;

import com.vividsolutions.jts.geom.LineString;

import fi.rktl.common.model.NonInsertableEntityWithLongId;

@Entity
public class Roadsegment extends NonInsertableEntityWithLongId {

    @Column
    @Type(type="org.hibernate.spatial.GeometryType")
    private LineString geometry;
    
    @Column
    private Integer startNode;
    
    @Column
    private Integer endNode;

    public LineString getGeometry() {
        return geometry;
    }

    public void setGeometry(LineString geometry) {
        this.geometry = geometry;
    }

    public Integer getStartNode() {
        return startNode;
    }

    public void setStartNode(Integer startNode) {
        this.startNode = startNode;
    }

    public Integer getEndNode() {
        return endNode;
    }

    public void setEndNode(Integer endNode) {
        this.endNode = endNode;
    }
    
}
