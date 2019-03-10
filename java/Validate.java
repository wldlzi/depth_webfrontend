package org.osm.depth.upload;

import java.sql.*;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.osm.depth.upload.exceptions.DatabaseException;

public class Validate
 {
     public static boolean checkUser(String email,String pass) 
     {
      boolean st =false;

      Context initContext;
      try {
    	  initContext = new InitialContext();
    	  DataSource ds = (DataSource) initContext.lookup("java:/comp/env/jdbc/postgres"); //$NON-NLS-1$

    	  try{

    		  Connection con = ds.getConnection();

    		  PreparedStatement ps = con.prepareStatement("select * from user_profiles where user_name=? and password=?");
    		  ps.setString(1, email);
    		  ps.setString(2, pass);
    		  ResultSet rs = ps.executeQuery();
    		  st = rs.next();
        
    	  	} catch(Exception e)
    	  		{
    	  			e.printStackTrace();
    	  		} 

    	  	return st;
    	  	
      	} catch (NamingException e) {
			e.printStackTrace();
			throw new DatabaseException("Database unavailable");
      	}  
     }
 }
