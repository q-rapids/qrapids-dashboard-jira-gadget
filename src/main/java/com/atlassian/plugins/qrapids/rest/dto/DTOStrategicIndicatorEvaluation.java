package com.atlassian.plugins.qrapids.rest.dto;

import com.atlassian.jira.datetime.LocalDate;
import com.atlassian.jira.util.lang.Pair;

import java.util.List;

public class DTOStrategicIndicatorEvaluation {

    private String id;
    private Long dbId;
    private String name;
    private String description;
    private Pair<Float, String> value;
    private String value_description;
    private List<DTOSIAssesment> probabilities;
    private LocalDate date;
    private String datasource;
    private String categories_description;
    private boolean hasBN;
    private boolean hasFeedback;

    public DTOStrategicIndicatorEvaluation(String id, String name, String description, Pair<Float, String> value, List<DTOSIAssesment> probabilities, LocalDate date, String datasource, Long dbId, String categories, boolean hasBN) {
        setId(id);
        setName(name);
        setDescription(description);
        setValue(value);
        setProbabilities(probabilities);
        setDate(date);
        setDbId(dbId);
        setDatasource(datasource);
        setCategories_description(categories);
        setHasBN(hasBN);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        if (description != null)
            this.description = description;
    }


    public Pair<Float, String> getValue() {
        return value;
    }

    public String getValue_description() { return value_description;}

    private void setValue_description(Pair<Float, String> value) {

        String numeric_value;

        if (value.first()==null)
            numeric_value="";
        else
            numeric_value = String.format("%.2f", value.second());

        if (value.second().isEmpty())
            this.value_description = numeric_value;
        else{
            this.value_description = value.second();
            if (!numeric_value.isEmpty())
                this.value_description += " (" + numeric_value + ')';
        }
    }

    public void setValue(Pair<Float, String> value) {
        this.value = value;
        setValue_description(value);
    }


    public List<DTOSIAssesment> getProbabilities() {
        return probabilities;
    }

    public void setProbabilities(List<DTOSIAssesment> probabilities) {
        this.probabilities = probabilities;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDatasource() {
        return datasource;
    }

    public void setDatasource(String datasource) {

        if (datasource !=null )
            this.datasource = datasource;
    }

    public Long getDbId() {
        return dbId;
    }

    public void setDbId(Long dbId) {
        this.dbId = dbId;
    }

    public String getCategories_description() {
        return categories_description;
    }

    public void setCategories_description(String categories_description) {
        if (categories_description!=null)
            this.categories_description = categories_description;
    }

    public boolean isHasBN() {
        return hasBN;
    }

    public void setHasBN(boolean hasBN) {
        this.hasBN = hasBN;
    }

    public boolean isHasFeedback() {
        return hasFeedback;
    }

    public void setHasFeedback(boolean hasFeedback) {
        this.hasFeedback = hasFeedback;
    }

}
