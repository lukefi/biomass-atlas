package fi.luke.bma.service;

import java.text.ParseException;
import java.time.Year;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.google.common.base.Joiner;
import com.vividsolutions.jts.geom.MultiPolygon;

import fi.luke.bma.model.Grid.GridType;
import fi.luke.bma.model.SearchModel;
import fi.luke.bma.model.SearchReport;
import fi.luke.bma.model.Validity;

@Transactional
@Component
public class SearchService {

    @PersistenceContext
    private EntityManager entityManager;

    public void setEntityManager(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @SuppressWarnings("unchecked")
    public List<Validity> getAllValidity() {
        Query query = entityManager.createQuery("SELECT v FROM Validity v");
        return query.getResultList();
    }

    public List<Long> getValiditiesForYears(List<Integer> requestYears) throws ParseException {
        List<Long> requestValidities = new ArrayList<>();
        List<Validity> validities = getAllValidity();
        for (Integer requestYear : requestYears) {
            Year year = Year.of(requestYear);
            for (Validity validity : validities) {
                Calendar cal = Calendar.getInstance();
                cal.setTime(validity.getStartDate());
                if (Year.of(cal.get(Calendar.YEAR)).equals(year)) {
                    requestValidities.add(validity.getId());
                }
            }
        }
        return requestValidities;
    }

    @SuppressWarnings("unchecked")
    public List<SearchReport> searchForBiomassData(SearchModel searchModel) throws ParseException {
        List<Long> years = getValiditiesForYears(searchModel.getYears());
        // Couldn't use "SELECT NEW SearchReport ...", because of problem in constructor with geometry.
        String jpql = "SELECT EXTRACT(year FROM d.validity.startDate) as year, d.attribute.nameFI as attributeName, "
                + "d.value, d.cell.geometry FROM Data d WHERE d.attribute.id IN ("
                + Joiner.on(',').join(searchModel.getAttributeIds()) + ") AND d.validity.id IN ("
                + Joiner.on(',').join(years) + ") AND d.cell.grid.id IN (" + GridType.ONE_BY_ONE_KM.getValue() + ", "
                + GridType.MUNICIPALITY_WITHOUT_SEA_AREA.getValue() + ") ORDER BY year, attributeName";
        Query query = entityManager.createQuery(jpql);
        List<Object[]> data = query.getResultList();
        List<SearchReport> searchReports = new ArrayList<>();
        for (Object[] object : data) {
            Long year = ((Long) object[0]).longValue();
            String attributeName = ((String) object[1]).toString();
            Double value = ((Double) object[2]).doubleValue();
            MultiPolygon geometry = ((MultiPolygon) object[3]);
            searchReports.add(new SearchReport(year, attributeName, value, geometry));
        }
        return searchReports;
    }

}
