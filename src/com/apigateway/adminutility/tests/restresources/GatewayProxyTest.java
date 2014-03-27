package com.apigateway.adminutility.tests.restresources;

import static org.junit.Assert.*;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Application;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.server.ResourceConfig;
import org.glassfish.jersey.test.JerseyTest;
import org.junit.Test;

import com.apigateway.adminutility.restresources.GatewayProxy;

public class GatewayProxyTest extends JerseyTest{

	@Override
	protected Application configure(){
		return new ResourceConfig(GatewayProxy.class);
	}
	
	@Test
	public void getProxyTest(){
		String expectedResult = "{\"client_id\":\"mor\",\"provisions\":[{\"provision_key\":{\"provider_id\":\"identity\",\"capability_id\":\"mor\"}}]}";
		Response response = target("admin/client/mor/").request(MediaType.APPLICATION_JSON).get();
		assertEquals(expectedResult,response.readEntity(String.class));
	}
	
	@Test
	public void getProxyTest2(){
		//String expectedResult = "{\"client_id\":\"mor\",\"provisions\":[{\"provision_key\":{\"provider_id\":\"identity\",\"capability_id\":\"mor\"}}]}";
		Response response = target("client/mor/").request(MediaType.APPLICATION_JSON).get();
		assertEquals(200,response.getStatus());
	}
	
}
