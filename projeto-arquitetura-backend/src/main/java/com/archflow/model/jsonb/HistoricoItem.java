package com.archflow.model.jsonb;

import java.io.Serializable;
import java.time.LocalDateTime;

public class HistoricoItem implements Serializable {
    private LocalDateTime date;
    private String userId;
    private String userName;
    private String action;
    private String details;

    public HistoricoItem() {
    }

    public HistoricoItem(LocalDateTime date, String userId, String userName, String action, String details) {
        this.date = date;
        this.userId = userId;
        this.userName = userName;
        this.action = action;
        this.details = details;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }
}
