package com.atlassian.plugins.qrapids.rest.issues;

import com.atlassian.jira.permission.ProjectPermissions;
import com.atlassian.jira.project.Project;
import com.atlassian.jira.security.JiraAuthenticationContext;
import com.atlassian.jira.security.PermissionManager;
import com.atlassian.jira.user.ApplicationUser;
import com.atlassian.plugin.spring.scanner.annotation.imports.ComponentImport;


import com.atlassian.jira.component.ComponentAccessor;
import com.atlassian.jira.issue.IssueManager;
import com.atlassian.jira.issue.Issue;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Collection;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

/**
 * @author: German Mora Macias.
 */

@Path("/Issues")
public class IssuesResources {

    @ComponentImport
    private IssueManager issueManager = ComponentAccessor.getIssueManager();
    @ComponentImport
    private JiraAuthenticationContext authenticationContext;
    @ComponentImport
    private PermissionManager permissionManager;

    /**
     * Constructor.
     * @param authenticationContext context that contains authenticated user
     * @param permissionManager the JIRA object which manages permissions for users and projects
     */
    @Inject
    public IssuesResources(JiraAuthenticationContext authenticationContext,
                            PermissionManager permissionManager) {
        this.authenticationContext = authenticationContext;
        this.permissionManager = permissionManager;
    }

    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    @Path("/prj={prj}")
    public Response getIssues(@PathParam("prj") String CurrentProject) throws Exception {
        ApplicationUser user = authenticationContext.getLoggedInUser();
        Collection<IssueRepresentation> issueRepresentation = new LinkedList<>();
        Collection<Project> projects = permissionManager.getProjects(ProjectPermissions.BROWSE_PROJECTS, user);

        //System.out.println("*************************** CurrentProject: " + CurrentProject);
        //System.out.println("*************************** projects: " + projects);

        Long idProject = null;
        for (Project p : projects) {
            //System.out.println("*************************** prj.name: " + p.getName());
            //System.out.println("*************************** url: " + p.getKey());
            //System.out.println("*************************** id: " + p.getId());
            //System.out.println("*************************** p.getName().equals(CurrentProject): " + p.getName().equals(CurrentProject));
            if (p.getName().equals(CurrentProject)) idProject = p.getId();
        }
        if (idProject != null) {
            List<Long> listIssuesId = (List<Long>) issueManager.getIssueIdsForProject(idProject);
            //System.out.println("*************************** listIssuesId: " + listIssuesId);
            Collections.sort(listIssuesId);
            for (Long longId : listIssuesId) {
                Issue issue = issueManager.getIssueObject(longId);
                //System.out.println("*************************** issue: " + issue);
                IssueRepresentation issueR = new IssueRepresentation(issue);
                issueRepresentation.add(issueR);
            }
        }
        return Response.ok(issueRepresentation).build();
    }
}
