package com.apigateway.adminutility.restresources;

import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.apache.log4j.Logger;

import com.apigateway.adminutility.utils.GatewayProxyHelper;
import com.apigateway.adminutility.utils.MethodTypes;

@Path("/{targetResource : [a-zA-Z0-9/]+}")
public class GatewayProxy {

	private Logger log = Logger.getLogger(GatewayProxy.class);

	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response getProxy(@Context HttpServletRequest request, @PathParam("targetResource") String targetResource){

		Response apiGateWayResponse = new GatewayProxyHelper().sessionWorker(request, MethodTypes.GET, targetResource, null);
		log.info("getProxy - targetResourse: " + targetResource + ", Gateway response status: " + apiGateWayResponse.getStatus() + ", apigw_transaction_id " + getAPIGatewayTransactionId(apiGateWayResponse));
		return Response.status(apiGateWayResponse.getStatus())
				.entity(apiGateWayResponse.readEntity(String.class))
				.build();
	}

	@POST
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response postProxy(@Context HttpServletRequest request, String payload, @PathParam("targetResource") String targetResource){

		Response apiGateWayResponse = new GatewayProxyHelper().sessionWorker(request, MethodTypes.POST,targetResource,payload);

		log.info("postProxy - targetResourse: " + targetResource + ", Gateway response status: " + apiGateWayResponse.getStatus() + ", apigw_transaction_id " + getAPIGatewayTransactionId(apiGateWayResponse));
		return Response.status(apiGateWayResponse.getStatus())
				.entity(apiGateWayResponse.readEntity(String.class))
				.build();
	}

	@PUT
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response putProxy(@Context HttpServletRequest request, String payload, @PathParam("targetResource") String targetResource){

		Response apiGateWayResponse = new GatewayProxyHelper().sessionWorker(request,MethodTypes.PUT, targetResource, payload);

		log.info("putProxy - targetResourse: " + targetResource + ", Gateway response status: " + apiGateWayResponse.getStatus() + ", apigw_transaction_id " + getAPIGatewayTransactionId(apiGateWayResponse));
		return Response.status(apiGateWayResponse.getStatus())
				.entity(apiGateWayResponse.readEntity(String.class))
				.build();
	}


	@DELETE
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	public Response deleteProxy(@Context HttpServletRequest request, String payload, @PathParam("targetResource") String targetResource){

		Response apiGateWayResponse = new GatewayProxyHelper().sessionWorker(request,MethodTypes.DELETE, targetResource, payload);

		log.info("deleteProxy - targetResourse: " + targetResource + ", Gateway response status: " + apiGateWayResponse.getStatus() + ", apigw_transaction_id " + getAPIGatewayTransactionId(apiGateWayResponse));
		return Response.status(apiGateWayResponse.getStatus())
				.entity(apiGateWayResponse.readEntity(String.class))
				.build();
	}
	
	private String getAPIGatewayTransactionId(Response apiGateWayResponse) {
		return apiGateWayResponse.getHeaderString("apigw-transaction-id");
	}
	
}
