package fi.luke.bma.model;

import javax.persistence.Column;
import javax.persistence.Entity;

import fi.rktl.common.model.InsertableEntityWithLongId;

@Entity(name = "user_activity_log")
public class UserActivityLog extends InsertableEntityWithLongId {

    @Column(name = "user_info")
    private String userInfo;
    
    @Column(name = "function_name")
    private String functionName;
    
    @Column(name = "bounded_area")
    private String boundedArea;
    
    @Column(name = "attribute_name")
    private String attributeName;

    public String getUserInfo() {
        return userInfo;
    }

    public void setUserInfo(String userInfo) {
        this.userInfo = userInfo;
    }

    public String getFunctionName() {
        return functionName;
    }

    public void setFunctionName(String functionName) {
        this.functionName = functionName;
    }

    public String getBoundedArea() {
        return boundedArea;
    }

    public void setBoundedArea(String boundedArea) {
        this.boundedArea = boundedArea;
    }

    public String getAttributeName() {
        return attributeName;
    }

    public void setAttributeName(String attributeName) {
        this.attributeName = attributeName;
    }
    
}
