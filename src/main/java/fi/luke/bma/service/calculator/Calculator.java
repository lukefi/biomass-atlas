package fi.luke.bma.service.calculator;

import java.util.Map;

/**
 * Interface for objects that provide biomass calculation services based on
 * specific calculation method
 */
public interface Calculator {

    Map<String, ?> calculateBiomass();
    
    /**
     * Return human readable description of the search parameters used by this Calculator
     */
    String getSearchDescription();
}
