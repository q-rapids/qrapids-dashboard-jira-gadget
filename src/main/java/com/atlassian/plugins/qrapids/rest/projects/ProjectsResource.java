package com.atlassian.plugins.qrapids.rest.projects;

import com.atlassian.jira.permission.ProjectPermissions;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;
import com.atlassian.plugins.qrapids.config.URIRestApi;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import java.util.Collection;
import java.util.LinkedList;
import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

/**
 * @author: German Mora Macias.
 */

@Path("/Projects")
@Named
public class ProjectsResource {

    @ComponentImport
    private PermissionManager permissionManager;
    @ComponentImport
    private JiraAuthenticationContext authenticationContext;

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
     * Constructor.
     * @param authenticationContext context that contains authenticated user
     * @param permissionManager the JIRA object which manages permissions for users and projects
     */
    @Inject
    public ProjectsResource(JiraAuthenticationContext authenticationContext,
            PermissionManager permissionManager) {
        this.authenticationContext = authenticationContext;
        this.permissionManager = permissionManager;
    }

    /**
     * Returns the list of projects browsable by the user in the specified request.
     *
     * @param request the context-injected {@code HttpServletRequest}
     * @return a {@code Response} with the marshalled projects
     */

    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getProjects(@Context HttpServletRequest request) {

        ApplicationUser user = authenticationContext.getLoggedInUser();

        // retrieve all objects for projects this user has permission to browse
        Collection<Project> projects =
                permissionManager.getProjects(ProjectPermissions.BROWSE_PROJECTS, user);

        // convert the project objects to ProjectRepresentations
        Collection<ProjectRepresentation> projectRepresentations = new LinkedList<>();
        projects.forEach(project ->  projectRepresentations.add(new ProjectRepresentation(project)));
        ProjectsRepresentation allProjects = new ProjectsRepresentation(projectRepresentations);

        // return the project representations. JAXB will handle the conversion
        // to XML or JSON.
        return Response.ok(allProjects).build();
    }

    /**
     * @param encodedURL URL encoded in base64 of the dashboard deployment
     */
    @Path("/AssessedProjects/url={url}")
    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response getAssessedProjects(@PathParam("url") String encodedURL) throws IOException {
        String url = getDecodeURI(encodedURL) + uriRestApi.getURIAssessedProjects();
        return Response.ok(getResponseResult(url)).build();
    }
}
