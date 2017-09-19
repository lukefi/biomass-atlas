package fi.luke.bma.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Type;

import com.vividsolutions.jts.geom.MultiPolygon;

import fi.rktl.common.model.NonInsertableEntityWithLongId;

@Entity
@Table(name = "grid_cell")
public class GridCell extends NonInsertableEntityWithLongId {
	@Column
	private String name;
	
	@Column(name = "name_en")
	private String nameEN;
	
	@Column(name = "name_sv")
	private String nameSV;
	
	@Column
	@Type(type="org.hibernate.spatial.GeometryType")
	private MultiPolygon geometry;
	
	@Column(name = "cell_id")
	private Long cellId;
	
	@ManyToOne
	@JoinColumn(name = "grid_id")
	private Grid grid;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNameEN() {
        return nameEN;
    }

    public void setNameEN(String nameEN) {
        this.nameEN = nameEN;
    }

    public String getNameSV() {
        return nameSV;
    }

    public void setNameSV(String nameSV) {
        this.nameSV = nameSV;
    }

    public MultiPolygon getGeometry() {
		return geometry;
	}

	public void setGeometry(MultiPolygon geometry) {
		this.geometry = geometry;
	}

	public Long getCellId() {
		return cellId;
	}

	public void setCellId(Long cellId) {
		this.cellId = cellId;
	}

	public Grid getGrid() {
		return grid;
	}

	public void setGrid(Grid grid) {
		this.grid = grid;
	}
}
