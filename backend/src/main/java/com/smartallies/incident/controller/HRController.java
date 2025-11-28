package com.smartallies.incident.controller;

import com.smartallies.incident.dto.ConnectHRRequest;
import com.smartallies.incident.dto.ConnectHRResponse;
import com.smartallies.incident.dto.HRChatRequest;
import com.smartallies.incident.dto.HRChatResponse;
import com.smartallies.incident.service.HRPartnerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/api/hr")
@RequiredArgsConstructor
public class HRController {

    private final HRPartnerService hrPartnerService;

    @PostMapping("/connect")
    public ResponseEntity<ConnectHRResponse> connectToHR(
            @Valid @RequestBody ConnectHRRequest request) {
        log.info("Connecting to HR for session: {}", request.getSessionId());
        
        ConnectHRResponse response = hrPartnerService.connectToHR(request.getSessionId());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/chat")
    public ResponseEntity<HRChatResponse> chatWithHR(
            @Valid @RequestBody HRChatRequest request) {
        log.info("HR chat message for session: {}", request.getSessionId());
        
        HRChatResponse response = hrPartnerService.sendMessageToHR(
                request.getSessionId(),
                request.getMessage()
        );
        return ResponseEntity.ok(response);
    }
}
