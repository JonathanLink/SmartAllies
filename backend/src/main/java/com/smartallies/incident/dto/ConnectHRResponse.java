package com.smartallies.incident.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ConnectHRResponse {
    
    private boolean connected;
    private String hrPartnerName;
    private String hrPartnerImage;
    private String message;
}
