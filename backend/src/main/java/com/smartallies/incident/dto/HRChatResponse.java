package com.smartallies.incident.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HRChatResponse {
    
    private String message;
    private String hrPartnerName;
    private String hrPartnerImage;
    private boolean sessionEnded;
    private String ticketId;
}
