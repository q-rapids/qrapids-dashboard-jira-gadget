package com.atlassian.plugins.qrapids.rest.services.Quality_Factors;

import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

@Path("/QualityFactors")
public class QualityFactors {

    @Path("/CurrentEvaluation")
    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getStrategicIndicatorsEvaluation(@QueryParam("prj") String prj) throws IOException {
        String url = "http://gessi3.cs.upc.edu/QRapids-Dashboard/api/QualityFactors/CurrentEvaluation";

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

        String mainJSON = response.toString();

        return Response.ok(mainJSON).build();
    }
}
