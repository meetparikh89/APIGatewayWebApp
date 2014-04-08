package com.apigateway.adminutility.utils;

import java.io.IOException;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

public class GatewayProxyHelper {
	
	public boolean loginWorker(String token, String baseUrl) throws IOException{
		Response response = worker(token, MethodTypes.GET, null,
				getClient().target(baseUrl.concat("client/")));
		return response.getStatus() == HttpServletResponse.SC_OK;
	}

	public Response sessionWorker(HttpServletRequest request, int methodType, String targetResource, String payload){
		String token = request.getSession().getAttribute("token").toString();
		String baseUrl = request.getSession().getAttribute("baseUrl").toString();
		return worker(token, methodType, payload,
				getClient().target(baseUrl.concat(targetResource)));
	}
	
	private Client getClient() {
		return ClientBuilder.newBuilder()
		        .hostnameVerifier(new HostnameVerifier() {
					
					@Override
					public boolean verify(String arg0, SSLSession arg1) {
						return true;
					}
				})
		        .build();
	}

	private Response worker(String token, int methodType, String payload,
			WebTarget webTarget) {
		Invocation.Builder invocationBuilder = webTarget.request(MediaType.APPLICATION_JSON);
		invocationBuilder.header("Authorization", token);
		Response response = null;
		switch(methodType){
			case MethodTypes.GET :
				response = invocationBuilder.get();
				break;
			case MethodTypes.POST :
				Entity<String> jsonPostEntity = Entity.entity(payload, MediaType.APPLICATION_JSON);
				response = invocationBuilder.post(jsonPostEntity);
				break;
			case MethodTypes.PUT :
				Entity<String> jsonPutEntity = Entity.entity(payload,MediaType.APPLICATION_JSON);
				response = invocationBuilder.put(jsonPutEntity);
				break;
			case MethodTypes.DELETE :
				response = invocationBuilder.delete();
				break;
			default:
				//TODO Handle it
				break;
		}
		return response;
	}
	
	
}
