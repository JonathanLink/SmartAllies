package com.smartallies.incident.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FacilityDetailsResponse {

    private String status;
    private Map<String, String> collectedFields;
}
