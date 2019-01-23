package com.atlassian.plugins.qrapids.rest.services;

import com.atlassian.plugins.qrapids.rest.dto.DTOStrategicIndicatorEvaluation;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;

/**
 * A resource of message.
 */
@Path("/strategicindicators")
public class StrategicIndicators {
    /*
    @Path("/currentevaluation")
    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public List<DTOStrategicIndicatorEvaluation> getStrategicIndicatorsEvaluation(@QueryParam("prj") String prj, HttpServletRequest request, HttpServletResponse response) {
        List<DTOStrategicIndicatorEvaluation> result = new ArrayList<>();
        return result;
    }*/

    @Path("/currentevaluation")
    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getStrategicIndicatorsEvaluation(@QueryParam("prj") String prj) throws IOException {
        String url = "http://gessi3.cs.upc.edu/QRapids-Dashboard/api/StrategicIndicators/CurrentEvaluation";

        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();
        con.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        return Response.ok(response).build();
    }
}
