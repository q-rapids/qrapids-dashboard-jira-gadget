package com.atlassian.plugins.qrapids.rest.services.Quality_Requirements;

import com.atlassian.plugins.qrapids.config.URIRestApi;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

@Path("/QualityRequirements")
public class QualityRequirements {

    private URIRestApi uriRestApi = URIRestApi.getInstance();

    private String getResponseResult(String url) throws IOException {
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

        return response.toString();
    }

    private String getDecodeURI(String encodedURL) {
        byte[] decodedBytes = Base64.getDecoder().decode(encodedURL);
        return new String(decodedBytes);
    }

    @Path("/Alerts/url={url}/prj={prj}/")
    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getQualityFactorsCurrentEvaluation(@PathParam("url") String encodedURL, @PathParam("prj") String prj) throws Exception {
        String resultRequest = getDecodeURI(encodedURL) + uriRestApi.getURIAlerts() + "?prj=" + prj ;
        return Response.ok(resultRequest).build();

    }
}
