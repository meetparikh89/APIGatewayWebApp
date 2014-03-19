package com.apigateway.adminutility.restresources;

import com.apigateway.adminutility.services.APIGatewayDetailService;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;

/**
 * Created by meet on 12/3/14.
 */
@Path("/APIGateway")
public class APIGatewayDetailResource {

    @Context ServletContext context;

    @GET
    @Path("/getRefDetails")
    @Produces(MediaType.TEXT_PLAIN)
    public Response getRefDetails(){
        try{
            APIGatewayDetailService apiGatewayDetailService = new APIGatewayDetailService(context);
            return Response.ok(apiGatewayDetailService.getRefDetails()).build();
        }catch(IOException ioe){
            return Response.noContent().build();
        }
    }



}
