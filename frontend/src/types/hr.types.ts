export interface HRSession {
  connected: boolean;
  hrPartnerName: string;
  hrPartnerImage: string;
  message?: string;
  sessionEnded?: boolean;
  ticketId?: string;
}

export interface HRChatRequest {
  sessionId: string;
  message: string;
}

export interface HRChatResponse {
  message: string;
  hrPartnerName: string;
  hrPartnerImage: string;
  sessionEnded: boolean;
  ticketId?: string;
}

export interface ConnectHRRequest {
  sessionId: string;
}

export interface ConnectHRResponse {
  connected: boolean;
  hrPartnerName: string;
  hrPartnerImage: string;
  message: string;
}
