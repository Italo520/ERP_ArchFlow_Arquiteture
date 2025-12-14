package com.archflow.model.jsonb;

import java.io.Serializable;

public class ChecklistItem implements Serializable {
    private String id;
    private String text;
    private boolean completed;

    public ChecklistItem() {
    }

    public ChecklistItem(String id, String text, boolean completed) {
        this.id = id;
        this.text = text;
        this.completed = completed;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
