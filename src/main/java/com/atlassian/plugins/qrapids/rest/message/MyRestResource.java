package com.atlassian.plugins.qrapids.rest.message;

import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * A resource of message.
 */
@Path("/message")
public class MyRestResource {

    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getMessage(@QueryParam("key") String key)
    {
        if(key!=null)
            return Response.ok(new MyRestResourceModel(key, getMessageFromKey(key))).build();
        else
            return Response.ok(new MyRestResourceModel("defaultaaaaa","Hello World")).build();
    }

    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/{key}")
    public Response getMessageFromPath(@PathParam("key") String key)
    {
        return Response.ok(new MyRestResourceModel(key, getMessageFromKey(key))).build();
    }

    private String getMessageFromKey(String key) {
        // In reality, this data would come from a database or some component
        // within the hosting application, for demonstration purpopses I will
        // just return the key
        return key;
    }
}