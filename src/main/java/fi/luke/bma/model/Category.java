package fi.luke.bma.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import fi.rktl.common.model.InsertableEntityWithLongId;

@Entity(name = "biomass_category")
public class Category extends InsertableEntityWithLongId{
	@Column(name = "fi")
	private String categoryFI;
	
	@Column(name = "en")
	private String categoryEN;
	
	@Column(name = "parent_category")
	private Long parentCategory;

	public String getCategoryFI() {
		return categoryFI;
	}

	public void setCategoryFI(String categoryFI) {
		this.categoryFI = categoryFI;
	}

	public String getCategoryEN() {
		return categoryEN;
	}

	public void setCategoryEN(String categoryEN) {
		this.categoryEN = categoryEN;
	}

	public Long getParentCategory() {
		return parentCategory;
	}

	public void setParentCategory(Long parentCategory) {
		this.parentCategory = parentCategory;
	}
}
