package fi.luke.bma.service;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Year;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;

import org.springframework.stereotype.Component;

import com.google.common.base.Joiner;

import fi.luke.bma.model.Data;
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
    public void searchForBiomassData(SearchModel searchModel) throws ParseException {
        List<Long> years = getValiditiesForYears(searchModel.getYears());
        String jpql = "SELECT NEW " + SearchReport.class.getName() + "(d)  d FROM Data d WHERE d.attribute.id in (" + Joiner.on(',').join(searchModel.getAttributeIds()) 
                + ") AND d.validity.id in (" + Joiner.on(',').join(years) + ")";
        Query query = entityManager.createQuery(jpql);
        List<Data> data = query.getResultList(); 
        System.out.println("test");
    }
}
