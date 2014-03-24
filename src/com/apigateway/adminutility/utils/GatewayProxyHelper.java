package com.apigateway.adminutility.utils;

import java.io.IOException;
import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class GatewayProxyHelper {
	
	public boolean loginWorker(String token, String baseUrl) throws IOException{
		Response response = worker(token,baseUrl,MethodTypes.GET,"client/",null);
		if(response.getStatus() != 200){
			return false;
		} else {
			return true;
		}
	}

	public Response sessionWorker(HttpServletRequest request, int methodType, String targetResource, String payload){
		String token = request.getSession().getAttribute("token").toString();
		String baseUrl = request.getSession().getAttribute("baseUrl").toString();
		return worker(token, baseUrl, methodType, targetResource, payload);
	}
	
	private Response worker(String token, String baseUrl, int methodType, String targetResource, String payload){
		String demandedURL = baseUrl.concat(targetResource);
		
		Client client = ClientBuilder.newBuilder()
		        .hostnameVerifier(new HostnameVerifier() {
					
					@Override
					public boolean verify(String arg0, SSLSession arg1) {
						return true;
					}
				})
		        .build();
		
		WebTarget webTarget = client.target(demandedURL);
		Invocation.Builder invocationBuilder = webTarget.request(MediaType.APPLICATION_JSON);
		invocationBuilder.header("Authorization", token);
		Response response = null;
		switch(methodType){
			case MethodTypes.GET :
				response = invocationBuilder.get();
				break;
			case MethodTypes.POST :
				Entity<String> jsonEntity = Entity.entity(payload, MediaType.APPLICATION_JSON);
				response = invocationBuilder.post(jsonEntity);
				break;
			default:
				//TODO Handle it
				break;
		}
		return response;
	}
	
	
}
