package fi.luke.bma.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import fi.rktl.common.model.NonInsertableEntityWithLongId;

@Entity
@Table(name = "biomass_data")
public class Data extends NonInsertableEntityWithLongId {
	@Column
	private Double value;
	
	@ManyToOne
	@JoinColumn(name = "attribute_id")
	private Attribute attribute;
	
	@ManyToOne
	@JoinColumn(name = "cell_id")
	private GridCell cell;
	
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

	public GridCell getCell() {
		return cell;
	}

	public void setcell(GridCell cell) {
		this.cell = cell;
	}

	public Validity getValidity() {
		return validity;
	}

	public void setValidity(Validity validity) {
		this.validity = validity;
	}
}
