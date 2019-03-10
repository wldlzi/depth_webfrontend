Synopsis
--------

Web frontend for the depth project (http://depth.openseamap.org).

Branch:	form-based-auth-2019
-------

Installation
------------

in order to install the form based version of the reworked "depth_webfrontend" 
you have to do also some changes to the tomcat7 webserver itself.

there are four extra directories now

WEB-INF
-------
	it contains the new file "web.xml" and have to be put to the corrosponding server directory
	
webapp
------
	the files "loginError.jsp" and "loginForm.jsp" have to be added to the corrosponding server directory
	
java
----
	the files "Login.java", "Logout.java" and "Validate.java" need to be stored to the server directory
	"src/main/java/org/osm/depth/update/"
	
server
------
	the files "server.xml" and "tomcat-users.xml" need to replace the old files in the server directory

