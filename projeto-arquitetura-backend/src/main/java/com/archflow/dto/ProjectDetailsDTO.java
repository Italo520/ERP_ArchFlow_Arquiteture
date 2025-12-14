package com.archflow.dto;

import java.util.List;
import java.util.UUID;

public class ProjectDetailsDTO extends ProjectDTO {
    private List<StageDTO> stages;

    public ProjectDetailsDTO() {
        super();
    }

    public ProjectDetailsDTO(UUID id, String name, String clientName, String status, String imageUrl,
            List<StageDTO> stages) {
        super(id, name, clientName, status, imageUrl);
        this.stages = stages;
    }

    public List<StageDTO> getStages() {
        return stages;
    }

    public void setStages(List<StageDTO> stages) {
        this.stages = stages;
    }
}
