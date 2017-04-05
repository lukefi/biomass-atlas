package fi.luke.bma.service.calculator;

import java.util.Map;

import fi.luke.bma.model.BiomassCalculationRequestModel.Point;
import fi.luke.bma.model.TabularReportData;

/**
 * Abstract superclass for objects that provide biomass calculation services based on
 * specific calculation method
 */
public abstract class Calculator {

    protected final Integer GRID_ID_1KM_BY_1KM = 1; // From database table 'grid'
    
    public abstract Map<String, ?> calculateBiomass();
    
    public abstract TabularReportData calculateBiomassInTabularFormat();
    
    public abstract TabularReportData calculateBiomassInTabularFormatForReport();
    
    /**
     * Return human readable description of the search parameters used by this Calculator
     */
    public abstract String getSearchDescription();
    
    protected String describePoint(Point point) {
        return "(" + point.getX().intValue() + ", " + point.getY().intValue() + ")";
    }
    
}
