package com.apigateway.adminutility.filters;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

public class AuthFilter implements Filter {

	private Logger log = Logger.getLogger(AuthFilter.class);

	@Override
	public void destroy() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response,
			FilterChain filterChain) throws IOException, ServletException {

		HttpServletRequest httpServletRequest = (HttpServletRequest) request;
		HttpServletResponse httpServletResponse = (HttpServletResponse) response;

		log.debug(httpServletRequest.getServletPath());

		if (httpServletRequest.getServletPath().equals("/views/login.html")) {
			log.debug("Going to the login page.");
			filterChain.doFilter(request, response);
		} else if (httpServletRequest.getSession().getAttribute("token") == null
				|| httpServletRequest.getSession().getAttribute("baseUrl") == null) {
			log.debug("Redirecting as no valid session found.");
			httpServletResponse.sendError(HttpServletResponse.SC_UNAUTHORIZED);
		} else {
			log.debug("Successfully Authenticated user.");
			filterChain.doFilter(request, response);
		}
	}

	@Override
	public void init(FilterConfig arg0) throws ServletException {
		// TODO Auto-generated method stub
		
	}

}
