package com.atlassian.plugins.qrapids.rest.services.Metrics;

import com.atlassian.plugins.qrapids.config.URIRestApi;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;

/**
 * @author: German Mora Macias.
 */

@Path("/Metrics")
public class Metrics {

    private URIRestApi uriRestApi = URIRestApi.getInstance();

    /**
     * @param url of the dashboard deployment
     */
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

    /**
     * @param encodedURL URL encoded in base64 of the dashboard deployment
     */
    private String getDecodeURI(String encodedURL) {
        byte[] decodedBytes = Base64.getDecoder().decode(encodedURL);
        return new String(decodedBytes);
    }

    /**
     * @param encodedURL URL encoded in base64 of the dashboard deployment
     * @param prj The name of the current project
     */
    @Path("/CurrentEvaluation/url={url}/prj={prj}")
    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getMetricsCurrentEvaluation(@PathParam("url") String encodedURL, @PathParam("prj") String prj) throws IOException {
        String url = getDecodeURI(encodedURL) + uriRestApi.getURIMCurrentEvaluation() + "?prj=" + prj ;
        return Response.ok(getResponseResult(url)).build();
    }

    /**
     * @param encodedURL URL encoded in base64 of the dashboard deployment
     * @param prj The name of the current project
     * @param from The start date to obtain the data information
     * @param to The end date to obtain the data information
     */
    @Path("/HistoricalData/url={url}/prj={prj}/from={from}&to={to}")
    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getMetricsHistoricalData(@PathParam("url") String encodedURL, @PathParam("prj") String prj, @PathParam("from") String from, @PathParam("to") String to) throws IOException {
        String url = getDecodeURI(encodedURL) + uriRestApi.getURIMHistoricalData() + "?prj=" + prj + "&from=" + from + "&to=" + to ;
        return Response.ok(getResponseResult(url)).build();
    }
}
