package fi.luke.bma.service;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class LocalizeService {

	@Autowired
    private MessageSource messageSource;
	
    private static final String FINNISH = "fi";
    private static final String ENGLISH = "en";
    private static final String SWEDISH = "sv";

    public <T> String getLocalizedName(Object obj, Class<T> clazz, String partialMethodName) {
        Method[] methods = clazz.getMethods();
        Field[] fields = clazz.getDeclaredFields();
        Locale locale = LocaleContextHolder.getLocale();
        String language = locale.getLanguage();
        String localizedName = "";
        boolean hasLocalized = false;
        for (Field field : fields) {
            for (Method method : methods) {
                String methodName = method.getName();
                if (methodName.toLowerCase().contains(field.getName().toLowerCase())
                        && (methodName.contains(partialMethodName))) {
                    Object object = null;
                    if (language == FINNISH && methodName.toLowerCase().contains(FINNISH)
                            || (language == ENGLISH && methodName.toLowerCase().contains(ENGLISH))
                            || (language == SWEDISH && methodName.toLowerCase().contains(SWEDISH))) {
                        try {
                            object = method.invoke(obj);
                            localizedName = (String) object;
                            hasLocalized = true;
                        } catch (IllegalAccessException | IllegalArgumentException | InvocationTargetException e) {
                            e.printStackTrace();
                        }
                    }
                }
                if (hasLocalized) {
                    break;
                }
            }
            if (hasLocalized) {
                break;
            }
        }
        return localizedName;
    }
    
    public List<String> getLocalizedMessageSource() {
    	Locale locale = LocaleContextHolder.getLocale();
    	String language = locale.getLanguage();
    	List<String> colunmMessages = new ArrayList<String>();
    	
    	if (language == "en") {
    		colunmMessages.add(messageSource.getMessage("bma.areaName",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.area",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.type",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.amount",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.unit",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.selectedArea",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.areaType",null,locale));
    	}else if(language == "sv") {
    		colunmMessages.add(messageSource.getMessage("bma.areaName",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.area",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.type",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.amount",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.unit",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.selectedArea",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.areaType",null,locale));
    	}else{
    		colunmMessages.add(messageSource.getMessage("bma.areaName",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.area",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.type",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.amount",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.unit",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.selectedArea",null,locale));
    		colunmMessages.add(messageSource.getMessage("bma.areaType",null,locale));
    	}
    	return colunmMessages;
    }
}
