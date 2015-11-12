package fi.luke.bma.model;

import java.sql.Timestamp;


public class VerificationToken{
	private String firstname;
	private String lastname;
	private String username;
	private String email;
	private boolean enabled;
	private Timestamp expiryTime;

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}

	public Timestamp getExpiryTime() {
		return expiryTime;
	}

	public void setExpiryTime(Timestamp expiryTime) {
		this.expiryTime = expiryTime;
	}
	
}
