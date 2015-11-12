package fi.luke.bma.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import fi.luke.bma.model.VerificationToken;

@Service
@PropertySource("file:///${luke.oskariconfdir}/oskari-ext.properties")
public class UserService {
	
	@Autowired
	private Environment env;
	
	public void insert(VerificationToken token) {
		  Connection con = null;
		  PreparedStatement ps = null;
		  String dbUrl, dbUsername, dbPassword;
		  dbUrl = dbUsername = dbPassword = null;
		  try {
			  dbUrl = env.getProperty("db.url");
			  dbUsername = env.getProperty("db.username");
			  dbPassword= env.getProperty("db.password");
		  } catch(Exception e) {
			  e.printStackTrace();
		  }
		
		  try {
			  Class.forName("org.postgresql.Driver");
			  con = DriverManager.getConnection(dbUrl, dbUsername, dbPassword);
			  
			  Statement st = con.createStatement();
			  ResultSet rs = st.executeQuery("SELECT nextval('bma_verification_token_id_seq')");
			  Long id = null;
			  while(rs.next()){
				  id = rs.getLong("nextval");
			  }
			  
			  String sql = "Insert into bma_verification_token (id, firstname, lastname, username,"
			  		+ " email, enabled, expiry_time) values (?, ?, ?, ?, ?, ?, ?)";
			  ps = con.prepareStatement(sql);
			  ps.setLong(1, id);
			  ps.setString(2, token.getFirstname());
			  ps.setString(3, token.getLastname());
			  ps.setString(4, token.getUsername());
			  ps.setString(5, token.getEmail());
			  ps.setBoolean(6, token.isEnabled());
			  ps.setTimestamp(7, token.getExpiryTime());
			  ps.executeUpdate();
			  
		  } catch(SQLException se) {
			  se.printStackTrace();
		  } catch (Exception e) {
			  e.printStackTrace();
		  } finally {
		      try {
		         if (ps != null)
		            con.close();
		      } catch(SQLException se) {
		    	  se.printStackTrace();
		      }
		  }
	      try {
	         if (con != null)
	            con.close();
	      }catch(SQLException se){
	         se.printStackTrace();
	      }
	  }
	
}
