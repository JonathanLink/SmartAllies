package com.smartallies.incident.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HRSession {
    
    private String sessionId;
    private String hrPartnerName;
    private String hrPartnerImage;
    private String hrPartnerId;
    private boolean isActive;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private String ticketId;
}
