package fi.luke.bma.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

import fi.rktl.common.model.InsertableEntityWithLongId;

@Entity
public class Validity extends InsertableEntityWithLongId{
	@Column
	private Date startDate;
	
	@Column
	private Date endDate;

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
}
