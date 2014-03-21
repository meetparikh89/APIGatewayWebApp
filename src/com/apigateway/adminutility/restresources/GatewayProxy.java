package com.apigateway.adminutility.restresources;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.apigateway.adminutility.utils.GatewayProxyHelper;
import com.apigateway.adminutility.utils.MethodTypes;

@Path("/{targetResource : [a-zA-Z0-9/]+}")
public class GatewayProxy {

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getProxy(@Context HttpServletRequest request, @PathParam("targetResource") String targetResource){
		Response apiGateWayResponse = new GatewayProxyHelper().sessionWorker(request, MethodTypes.GET,targetResource, null);
		return Response.status(apiGateWayResponse.getStatus())
				.entity(apiGateWayResponse.readEntity(String.class))
				.build();
	}
	
	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response postProxy(@Context HttpServletRequest request, String payload, @PathParam("targetResource") String targetResource){
		Response apiGateWayResponse = new GatewayProxyHelper().sessionWorker(request, MethodTypes.POST,targetResource,payload);
		return Response.status(apiGateWayResponse.getStatus())
				.entity(apiGateWayResponse.readEntity(String.class))
				.build();
	}
	
}
