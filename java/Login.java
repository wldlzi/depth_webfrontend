package org.osm.depth.upload;

import java.io.*;
import javax.servlet.*;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.osm.depth.upload.Validate;

public class Login extends HttpServlet {

	private static final long serialVersionUID = 6891209232408018034L;

	protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        
//        String email = request.getParameter("username");
//        String pass = request.getParameter("password");

//        if(Validate.checkUser(email, pass))
//        {
//        	out.println("null");
//        	HttpSession session = request.getSession(true);
//        	session.setAttribute("idUsername", email);
//        } else
//        {
//            out.println("Username or Password incorrect");
//        }
        
        String newPage = request.getParameter("lastPage");

        out.println("<html lang=\"en\"><head></head><body><div class=\"hero-unit\">\"OpenSeaMap Login\"<script>window.location.replace('" + newPage + "');OSeaM.frontend.getUser().fetch();</script></div></body></html>");
        return;
	}
}
