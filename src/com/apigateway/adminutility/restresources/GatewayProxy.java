package com.apigateway.adminutility.restresources;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.apigateway.adminutility.utils.MethodTypes;

@Path("/GatewayProxy")
public class GatewayProxy {
	
	private String worker(HttpServletRequest httpRequest, int methodType, String payload){
		String token = httpRequest.getHeader("Authorization");
		String demandedURL = httpRequest.getHeader("urldemanded");
		
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
		return response.readEntity(String.class);
	}

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getProxy(@Context HttpServletRequest httpRequest){
		return Response.ok(worker(httpRequest,MethodTypes.GET,null)).build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response postProxy(@Context HttpServletRequest httpRequest, String payload){
		return Response.ok(worker(httpRequest,MethodTypes.POST,payload)).build();
	}
	
}
