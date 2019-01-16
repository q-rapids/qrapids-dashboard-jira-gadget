package com.atlassian.plugins.qrapids.rest.message;

import javax.xml.bind.annotation.*;
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class MyRestResourceModel {

    @XmlElement(name = "value")
    private String message;
    @XmlAttribute
    private String key;

    public MyRestResourceModel() {
    }

    public MyRestResourceModel(String message) {
        this.message = message;
    }

    public MyRestResourceModel(String key, String message) {
        this.key = key;
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }
}
