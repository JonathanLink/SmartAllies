package com.smartallies.incident.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ConnectSamaritanResponse {
    private boolean connected;
    private String samaritanName;
    private String samaritanImage;
    private String message;
}
