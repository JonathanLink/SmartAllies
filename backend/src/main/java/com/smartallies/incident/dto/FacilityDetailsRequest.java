package com.smartallies.incident.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FacilityDetailsRequest {

    private String sessionId;
    private String details;
    private String imageUrl;
    private String floor;
}
