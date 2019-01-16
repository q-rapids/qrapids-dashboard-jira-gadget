package com.atlassian.plugins.qrapids.rest.projects;


import com.atlassian.jira.project.Project;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;
import net.jcip.annotations.Immutable;

/**
 * JAXB representation of a project's information. This can be marshalled as either JSON or XML,
 * depending on what the client asks for.
 */
@Immutable
@SuppressWarnings("UnusedDeclaration")
@XmlRootElement
public class ProjectRepresentation {

    @XmlElement
    private Long id;

    @XmlElement
    private String key;

    @XmlElement
    private String name;

    @XmlElement
    private String projectUrl;

    @XmlElement
    private String projectLead;

    @XmlElement
    private String description;

    // This private constructor isn't used by any code, but JAXB requires any
    // representation class to have a no-args constructor.
    private ProjectRepresentation() {
        id = null;
        key = null;
        name = null;
        projectUrl = null;
        projectLead = null;
        description = null;
    }

    /**
     * Initializes the representation's values to those in the specified {@code Project}.
     *
     * @param project the project to use for initialization
     */
    public ProjectRepresentation(Project project) {
        this.id = project.getId();
        this.key = project.getKey();
        this.name = project.getName();
        this.projectUrl = project.getUrl();
        this.projectLead = project.getLead().getDisplayName();
        this.description = project.getDescription();
    }

}
