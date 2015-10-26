package fi.luke.bma.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fi.luke.bma.model.GridCell;

@Service
public class MunicipalityService {
    
    public static final long MUNICIPALITY_GRID = 2;
    
	private GridCellService gridCellService;
	
	@Autowired
	public void setGridCellService(GridCellService gridCellService) {
        this.gridCellService = gridCellService;
    }

	public GridCell getMunicipalityByLocation(int x, int y) {
	    return gridCellService.getByLocation(MUNICIPALITY_GRID, x, y);
	}
	
	public List<GridCell> getMunicipalitiesById(List<Long> municipalities) {
	    return gridCellService.getByCellId(MUNICIPALITY_GRID, municipalities);
	}
    
}
