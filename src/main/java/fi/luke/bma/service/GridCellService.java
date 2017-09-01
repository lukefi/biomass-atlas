package fi.luke.bma.service;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.stereotype.Service;

import fi.luke.bma.model.Grid.GridType;
import fi.luke.bma.model.GridCell;
import fi.rktl.common.service.BaseStoreNonInsertableLongIdEntityManager;

@Service
public class GridCellService extends BaseStoreNonInsertableLongIdEntityManager<GridCell> {

    private EntityManager entityManager;

    @Override
    public Class<GridCell> getEntityClass() {
        return GridCell.class;
    }

    @Override
    public EntityManager getEntityManager() {
        return entityManager;
    }

    @Override
    @PersistenceContext
    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    public GridCell getByLocation(long gridId, int x, int y) {
        String sql = "SELECT c.* " + "FROM grid_cell c "
                + "WHERE c.grid_id = ? AND ST_within(ST_setsrid(ST_point(?, ?), 3067), c.geometry)";
        Query query = entityManager.createNativeQuery(sql, GridCell.class);
        query.setParameter(1, gridId);
        query.setParameter(2, x);
        query.setParameter(3, y);
        return (GridCell) query.getSingleResult();
    }

    public List<GridCell> getByCellId(long gridId, List<Long> cellIds) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<GridCell> query = cb.createQuery(GridCell.class);
        Root<GridCell> from = query.from(GridCell.class);
        query.select(from);
        query.where(cb.and(cb.equal(from.get("grid").get("id"), gridId), from.get("cellId").in(cellIds)));
        return entityManager.createQuery(query).getResultList();
    }

    public List<GridCell> getGrid(long gridId) {
        CriteriaBuilder cb = entityManager.getCriteriaBuilder();
        CriteriaQuery<GridCell> query = cb.createQuery(GridCell.class);
        Root<GridCell> from = query.from(GridCell.class);
        query.select(from);
        query.where(cb.equal(from.get("grid").get("id"), gridId));
        return entityManager.createQuery(query).getResultList();
    }

    /**
     * Returns all the municipalities grid cells which are belonging to the provided bounded area (Either province or
     * ELY)
     * 
     * @param boundedAreaId
     *            long 'gridCellId' of province or ELY center
     * @param gridId
     *            integer 'gridId' of province or ELY center
     * @return
     */
    @SuppressWarnings("unchecked")
    public List<GridCell> getAllMunicipalitiesForBoundaryAreaId(long boundedAreaId, int gridId) {
        String sql = "SELECT c.* " + "FROM grid_cell c " + "WHERE c.grid_id = " + GridType.MUNICIPALITY.getValue()
                + "AND ST_contains( " + "(SELECT a.geometry " + "FROM grid_cell a "
                + "WHERE a.grid_id = ? AND a.cell_id = ?) , c.geometry)";
        Query query = entityManager.createNativeQuery(sql, GridCell.class);
        query.setParameter(1, gridId);
        query.setParameter(2, boundedAreaId);
        return (List<GridCell>) query.getResultList();
    }

}
