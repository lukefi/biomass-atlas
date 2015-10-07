package fi.luke.bma.dao;

import fi.luke.bma.model.Validity;
import fi.rktl.common.service.BaseStoreLongId;

public interface ValidityDao extends BaseStoreLongId<Validity>{
	
	public Validity getLatest();
}
