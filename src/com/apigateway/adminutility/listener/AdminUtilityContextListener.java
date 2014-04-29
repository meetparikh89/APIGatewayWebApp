package com.apigateway.adminutility.listener;

import java.io.File;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import org.apache.log4j.BasicConfigurator;
import org.apache.log4j.xml.DOMConfigurator;

/**
 * Application Lifecycle Listener implementation class AdminUtilityContextListener
 */
public class AdminUtilityContextListener implements ServletContextListener {

	/**
	 * @see ServletContextListener#contextInitialized(ServletContextEvent)
	 */
	public void contextInitialized(ServletContextEvent servletContextEvent) {

		ServletContext ctx = servletContextEvent.getServletContext();

		// initialize log4j
		String log4jConfig = ctx.getInitParameter("log4j-config");
		if (log4jConfig == null) {
			System.err.println("No log4j-config init param, initializing log4j with BasicConfigurator");
			BasicConfigurator.configure();
		} else {
			String webAppPath = ctx.getRealPath("/");
			String log4jProp = webAppPath + log4jConfig;
			File log4jConfigFile = new File(log4jProp);

			if (log4jConfigFile.exists()) {
				System.out.println("Initializing log4j with: " + log4jProp);
				DOMConfigurator.configure(log4jProp);
			} else {
				System.err.println(log4jProp
								+ " file not found, initializing log4j with BasicConfigurator");
				BasicConfigurator.configure();
			}
		}
		System.out.println("log4j configured properly");
	}

	/**
	 * @see ServletContextListener#contextDestroyed(ServletContextEvent)
	 */
	public void contextDestroyed(ServletContextEvent arg0) {

	}
	
}
