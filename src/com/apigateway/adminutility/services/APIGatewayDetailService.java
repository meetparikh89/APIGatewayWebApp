package com.apigateway.adminutility.services;

import javax.servlet.ServletContext;
import java.io.IOException;
import java.util.Properties;

/**
 * Created by meet on 12/3/14.
 */
public class APIGatewayDetailService {


    private static Properties properties = new Properties();

    public APIGatewayDetailService(ServletContext context) throws IOException{
        String propertiesPath = context.getInitParameter("propertiesfile");
        properties.load(context.getResourceAsStream(propertiesPath));
    }

    public String getRefDetails(){
        return properties.getProperty("ref.environment.url");
    }

}
