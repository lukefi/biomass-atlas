package fi.luke.bma.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import fi.luke.bma.model.GridCell;

@Component
public class MunicipalityService {
    
    private static final long MUNICIPALITY_GRID = 2;
    
	private GridCellService gridCellService;
	
	@Autowired
	public void setGridCellService(GridCellService gridCellService) {
        this.gridCellService = gridCellService;
    }

	public GridCell getMunicipalityByLocation(int x, int y) {
	    return gridCellService.getByLocation(MUNICIPALITY_GRID, x, y);
	}
    
}
