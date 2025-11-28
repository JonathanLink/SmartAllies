export interface ConnectSamaritanRequest {
  sessionId: string;
}

export interface ConnectSamaritanResponse {
  connected: boolean;
  samaritanName: string;
  samaritanImage: string;
  message: string;
}

export interface SamaritanChatRequest {
  sessionId: string;
  message: string;
}

export interface SamaritanChatResponse {
  message: string;
  samaritanName: string;
  samaritanImage: string;
  sessionEnded: boolean;
  ticketId?: string;
}

export interface SamaritanSession {
  connected: boolean;
  samaritanName: string;
  samaritanImage: string;
  message: string;
}
