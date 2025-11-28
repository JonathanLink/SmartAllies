package com.smartallies.incident.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SamaritanChatResponse {
    private String message;
    private String samaritanName;
    private String samaritanImage;
    private boolean sessionEnded;
    private String ticketId;
}
