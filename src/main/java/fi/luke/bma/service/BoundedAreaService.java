package fi.luke.bma.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fi.luke.bma.model.GridCell;

@Service
public class BoundedAreaService {	
    
	private GridCellService gridCellService;
	
	@Autowired
	public void setGridCellService(GridCellService gridCellService) {
        this.gridCellService = gridCellService;
    }

	public GridCell getBoundedAreaByLocation(int x, int y, int gridId) {
	    return gridCellService.getByLocation(gridId, x, y);
	}
	
	public List<GridCell> getBoundedAreasById(List<Long> boundedAreas, int gridId) {
	    return gridCellService.getByCellId(gridId, boundedAreas);
	}
}
