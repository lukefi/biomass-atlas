package fi.luke.bma.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import fi.luke.bma.model.GridCell;

@Service
public class DrainageBasinService {
	public static final long DRAINAGE_BASIN_GRID = 4;
	    
	private GridCellService gridCellService;
	
	@Autowired
	public void setGridCellService(GridCellService gridCellService) {
        this.gridCellService = gridCellService;
    }

	public GridCell getDrainageBasinByLocation(int x, int y) {
	    return gridCellService.getByLocation(DRAINAGE_BASIN_GRID, x, y);
	}
	
	public List<GridCell> geDrainageBasinsById(List<Long> drainageBasins) {
	    return gridCellService.getByCellId(DRAINAGE_BASIN_GRID, drainageBasins);
	}
}
