package fi.luke.bma.sulkaregistration;

public class AppSettings {

    private int allowedObservationEditingTimeAfterResultConfirmationInMinutes;
    
    private int maxTriangleEditingDistanceInMetres;
    
    private String suHost;
    
    private String suScheme;
    
    private int suPort;
    
    private String suBasePath;
    
    private String suAdminUser;
    
    private String suAdminPassword;
    
    private String pdfMapDirectory;
    
    private String publicRootUrl;
    
    private String riistaWmsInternalUrl;
    
    private String photoUploadDirectory;
    
    private String cachedMapDirectory;
    
    private String errorMailTo;

    public int getAllowedObservationEditingTimeAfterResultConfirmationInMinutes() {
        return allowedObservationEditingTimeAfterResultConfirmationInMinutes;
    }

    public void setAllowedObservationEditingTimeAfterResultConfirmationInMinutes(
            int allowedObservationEditingTimeAfterResultConfirmationInMinutes) {
        this.allowedObservationEditingTimeAfterResultConfirmationInMinutes = allowedObservationEditingTimeAfterResultConfirmationInMinutes;
    }

    public int getMaxTriangleEditingDistanceInMetres() {
        return maxTriangleEditingDistanceInMetres;
    }

    public void setMaxTriangleEditingDistanceInMetres(
            int maxTriangleEditingDistanceInMetres) {
        this.maxTriangleEditingDistanceInMetres = maxTriangleEditingDistanceInMetres;
    }

    public String getSuHost() {
        return suHost;
    }

    public void setSuHost(String suHost) {
        this.suHost = suHost;
    }

    public String getSuScheme() {
        return suScheme;
    }

    public void setSuScheme(String suScheme) {
        this.suScheme = suScheme;
    }

    public int getSuPort() {
        return suPort;
    }

    public void setSuPort(int suPort) {
        this.suPort = suPort;
    }

    public String getSuBasePath() {
        return suBasePath;
    }

    public void setSuBasePath(String suBasePath) {
        this.suBasePath = suBasePath;
    }

    public String getSuAdminUser() {
        return suAdminUser;
    }

    public void setSuAdminUser(String suAdminUser) {
        this.suAdminUser = suAdminUser;
    }

    public String getSuAdminPassword() {
        return suAdminPassword;
    }

    public void setSuAdminPassword(String suAdminPassword) {
        this.suAdminPassword = suAdminPassword;
    }

    public String getPdfMapDirectory() {
        return pdfMapDirectory;
    }

    public void setPdfMapDirectory(String pdfMapDirectory) {
        this.pdfMapDirectory = pdfMapDirectory;
    }

    public String getPublicRootUrl() {
        return publicRootUrl;
    }

    public void setPublicRootUrl(String publicRootUrl) {
        this.publicRootUrl = publicRootUrl;
    }

    public String getRiistaWmsInternalUrl() {
        return riistaWmsInternalUrl;
    }

    public void setRiistaWmsInternalUrl(String riistaWmsUrl) {
        this.riistaWmsInternalUrl = riistaWmsUrl;
    }

    public String getPhotoUploadDirectory() {
        return photoUploadDirectory;
    }

    public void setPhotoUploadDirectory(String photoUploadDirectory) {
        this.photoUploadDirectory = photoUploadDirectory;
    }

    public String getCachedMapDirectory() {
        return cachedMapDirectory;
    }

    public void setCachedMapDirectory(String cachedMapDirectory) {
        this.cachedMapDirectory = cachedMapDirectory;
    }

    public String getErrorMailTo() {
        return errorMailTo;
    }

    public void setErrorMailTo(String errorMailTo) {
        this.errorMailTo = errorMailTo;
    }
    
}
