package fi.luke.bma.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.hibernate.annotations.Type;

import fi.rktl.common.model.InsertableEntityWithLongId;

@Entity
public class Validity extends InsertableEntityWithLongId{
	@Column
	@Type(type="date")
	private Date startDate;
	
	@Column
	@Type(type="date")
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
