package fi.luke.bma.service;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Locale;

import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

@Component
public class LocalizeService {

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
}
