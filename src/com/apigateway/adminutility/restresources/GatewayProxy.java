package com.apigateway.adminutility.restresources;

import javax.net.ssl.HostnameVerifier;
import javax.net.ssl.SSLSession;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.apigateway.adminutility.utils.MethodTypes;

@Path("/{targetResource : [a-zA-Z0-9/]+}")
public class GatewayProxy {
	
	private Response worker(int methodType, String targetResource, String payload){
		//TODO Get token from Session Parameter
		//Authorization: Basic YWRtaW46YWRtaW4=
		String token = "Basic YWRtaW46YWRtaW4=";
		
		//TODO Get Base URL from Session Environment Parameter.
		String baseurl = "https://192.168.2.71:8424/admin/";
		String demandedURL = baseurl.concat(targetResource);
		
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

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getProxy(@PathParam("targetResource") String targetResource){
		Response apiGateWayResponse = worker(MethodTypes.GET,targetResource, null);
		return Response.status(apiGateWayResponse.getStatus())
				.entity(apiGateWayResponse.readEntity(String.class))
				.build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response postProxy(String payload, @PathParam("targetResource") String targetResource){
		Response apiGateWayResponse = worker(MethodTypes.POST,targetResource,payload);
		return Response.status(apiGateWayResponse.getStatus())
				.entity(apiGateWayResponse.readEntity(String.class))
				.build();
	}
	
}
