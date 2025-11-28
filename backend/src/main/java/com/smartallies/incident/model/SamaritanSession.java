package com.smartallies.incident.model;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SamaritanSession {
    private String sessionId;
    private String samaritanName;
    private String samaritanImage;
    private String samaritanId;
    private boolean isActive;
    private LocalDateTime startedAt;
    private LocalDateTime endedAt;
    private String ticketId;
    private String emergencyLocation;
}
