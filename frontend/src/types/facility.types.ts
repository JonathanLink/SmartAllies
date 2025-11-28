export interface FacilityDetailsRequest {
  sessionId: string;
  details?: string;
  imageUrl?: string;
  floor?: string;
}

export interface FacilityDetailsResponse {
  status: string;
  collectedFields?: Record<string, string>;
}
