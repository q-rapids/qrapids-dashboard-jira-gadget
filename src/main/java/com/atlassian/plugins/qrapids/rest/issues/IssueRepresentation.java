package com.atlassian.plugins.qrapids.rest.issues;


import com.atlassian.jira.issue.Issue;
import net.jcip.annotations.Immutable;

import javax.xml.bind.annotation.*;

/**
 * JAXB representation of a project's information. This can be marshalled as either JSON or XML,
 * depending on what the client asks for.
 */
@Immutable
@SuppressWarnings("UnusedDeclaration")
@XmlRootElement
@XmlAccessorType(XmlAccessType.FIELD)
public class IssueRepresentation {

    @XmlAttribute
    private Long id;

    @XmlAttribute
    private String key;

    @XmlAttribute
    private String summary;

    @XmlAttribute
    private String assignedId;

    @XmlAttribute
    private String status;

    @XmlAttribute
    private String description;

    // This private constructor isn't used by any code, but JAXB requires any
    // representation class to have a no-args constructor.
    private IssueRepresentation() {
        id = null;
        key = null;
        summary = null;
        assignedId = null;
        status = null;
        description = null;
    }

    /**
     * Initializes the representation's values to those in the specified {@code Project}.
     *
     * @param issue the issue to use for initialization
     */
    public IssueRepresentation(Issue issue) {
        this.id = issue.getId();
        this.key = issue.getKey();
        this.summary = issue.getSummary();
        this.assignedId = issue.getAssigneeId();
        this.status = issue.getStatus().getName();
        this.description = issue.getDescription();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public String getAssignedId() {
        return assignedId;
    }

    public void setAssignedId(String assignedId) {
        this.assignedId = assignedId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}