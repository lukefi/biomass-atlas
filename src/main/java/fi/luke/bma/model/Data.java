package fi.luke.bma.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import fi.rktl.common.model.InsertableEntityWithLongId;

@Entity(name = "biomass_data")
public class Data extends InsertableEntityWithLongId{
	@Column
	private Double value;
	
	@ManyToOne
	@JoinColumn(name = "attribute_id")
	private Attribute attribute;
	
	@ManyToOne
	@JoinColumn(name = "cell_id")
	private GridCell gridCell;
	
	@ManyToOne
	@JoinColumn(name = "validity_id")
	private Validity validity;

	public Double getValue() {
		return value;
	}

	public void setValue(Double value) {
		this.value = value;
	}

	public Attribute getAttribute() {
		return attribute;
	}

	public void setAttribute(Attribute attribute) {
		this.attribute = attribute;
	}

	public GridCell getGridCell() {
		return gridCell;
	}

	public void setGridCell(GridCell gridCell) {
		this.gridCell = gridCell;
	}

	public Validity getValidity() {
		return validity;
	}

	public void setValidity(Validity validity) {
		this.validity = validity;
	}
}
