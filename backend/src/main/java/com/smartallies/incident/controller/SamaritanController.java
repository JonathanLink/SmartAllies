package com.smartallies.incident.controller;

import com.smartallies.incident.dto.ConnectSamaritanRequest;
import com.smartallies.incident.dto.ConnectSamaritanResponse;
import com.smartallies.incident.dto.SamaritanChatRequest;
import com.smartallies.incident.dto.SamaritanChatResponse;
import com.smartallies.incident.service.SamaritanService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/samaritan")
@RequiredArgsConstructor
public class SamaritanController {

    private final SamaritanService samaritanService;

    @PostMapping("/connect")
    public ResponseEntity<ConnectSamaritanResponse> connectToSamaritan(
            @Valid @RequestBody ConnectSamaritanRequest request) {
        log.warn("EMERGENCY: Connecting to Samaritan for session: {}", request.getSessionId());
        
        ConnectSamaritanResponse response = samaritanService.connectToSamaritan(request.getSessionId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/chat")
    public ResponseEntity<SamaritanChatResponse> chatWithSamaritan(
            @Valid @RequestBody SamaritanChatRequest request) {
        log.info("Samaritan chat message for session: {}", request.getSessionId());
        
        SamaritanChatResponse response = samaritanService.sendMessageToSamaritan(
                request.getSessionId(),
                request.getMessage()
        );
        return ResponseEntity.ok(response);
    }
}
