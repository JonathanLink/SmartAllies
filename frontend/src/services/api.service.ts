import { APP_CONFIG } from '@/config/constants';
import type { ChatRequest, ChatResponse } from '@/types/incident.types';
import type { IncidentReport, SubmitReportRequest } from '@/types/report.types';
import type { ConnectHRRequest, ConnectHRResponse, HRChatRequest, HRChatResponse } from '@/types/hr.types';
import type { FacilityDetailsRequest, FacilityDetailsResponse } from '@/types/facility.types';

class ApiService {
  private baseUrl = APP_CONFIG.API_BASE_URL;

  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await fetch(`${this.baseUrl}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.statusText}`);
    }

    return response.json();
  }

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${this.baseUrl}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.url;
  }

  async submitReport(request: SubmitReportRequest): Promise<IncidentReport> {
    const response = await fetch(`${this.baseUrl}/reports/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Submit report error: ${response.statusText}`);
    }

    return response.json();
  }

  async getReport(reportId: string): Promise<IncidentReport> {
    const response = await fetch(`${this.baseUrl}/reports/${reportId}`);

    if (!response.ok) {
      throw new Error(`Get report error: ${response.statusText}`);
    }

    return response.json();
  }

  async connectToHR(request: ConnectHRRequest): Promise<ConnectHRResponse> {
    const response = await fetch(`${this.baseUrl}/hr/connect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Connect to HR error: ${response.statusText}`);
    }

    return response.json();
  }

  async sendHRMessage(request: HRChatRequest): Promise<HRChatResponse> {
    const response = await fetch(`${this.baseUrl}/hr/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`HR chat error: ${response.statusText}`);
    }

    return response.json();
  }

  async checkHealth(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/health`);
    return response.text();
  }

  async saveFacilityDetails(request: FacilityDetailsRequest): Promise<FacilityDetailsResponse> {
    const response = await fetch(`${this.baseUrl}/reports/facility-details`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Save facility details error: ${response.statusText}`);
    }

    return response.json();
  }
}

export const apiService = new ApiService();
