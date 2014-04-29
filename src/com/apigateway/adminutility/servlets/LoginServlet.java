package com.apigateway.adminutility.servlets;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.Properties;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.json.simple.JSONObject;
import org.json.simple.JSONValue;

import com.apigateway.adminutility.utils.GatewayProxyHelper;

public class LoginServlet extends HttpServlet {

	private Logger log = Logger.getLogger(LoginServlet.class);

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.getSession().invalidate();
		Cookie[] cookies = request.getCookies();
		for(Cookie cookie : cookies){
			if(cookie.getName().equalsIgnoreCase("loginCookie")){
				cookie.setValue("false");
				response.addCookie(cookie);
			}
		}
		log.debug("Send redirect to - " + request.getContextPath());
		response.sendRedirect(request.getContextPath());
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		StringBuilder stringBuilder = new StringBuilder();
		BufferedReader bufferedReader = request.getReader();
		String line;
		while ((line = bufferedReader.readLine()) != null) {
			stringBuilder.append(line);
		}
		JSONObject array = (JSONObject) JSONValue.parse(stringBuilder.toString());
		String token = array.get("token").toString();
		String env = array.get("env").toString();

		log.info("Environment is: " + env);

		String propertiesPath = request.getSession().getServletContext().getInitParameter("propertiesfile");

		log.debug("Loading property file - " + propertiesPath);

		Properties properties = new Properties();
		properties.load(request.getSession().getServletContext().getResourceAsStream(propertiesPath));

		String baseUrl = null;
		log.debug("Get the base url for '" + env + "' environment");
		if (env.equalsIgnoreCase("live")) {
			baseUrl = properties.getProperty("live.environment.url");
		} else {
			baseUrl = properties.getProperty("ref.environment.url");
		}

		log.info("Base url is - " + baseUrl);

		GatewayProxyHelper gatewayProxyHelper = new GatewayProxyHelper();
		boolean validUser = gatewayProxyHelper.loginWorker(token, baseUrl);
		if(validUser == true){
			log.info("User is valid!!!");
			HttpSession session = request.getSession(true);
			session.setAttribute("token",token);
			session.setAttribute("baseUrl",baseUrl);
			response.setStatus(200);
		} else {
			log.info("User is not valid!!!");
			response.setStatus(401);
		}
	}

}
