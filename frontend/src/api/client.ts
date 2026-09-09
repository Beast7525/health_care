import { MedicalRecord, TimelineEvent, WellnessGuidance, DoctorQuestion, RecordQAMessage } from '../types';

// Render production backend URL or local development URL
const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = {
  // Health check
  async checkHealth(): Promise<{ status: string; database: string }> {
    try {
      const res = await fetch(`${API_BASE_URL}/health`, { signal: AbortSignal.timeout(3500) });
      if (!res.ok) throw new Error('Backend offline');
      return await res.json();
    } catch {
      return { status: 'fallback', database: 'disconnected' };
    }
  },

  // Records
  async getRecords(): Promise<MedicalRecord[]> {
    const res = await fetch(`${API_BASE_URL}/records`);
    if (!res.ok) throw new Error('Failed to fetch records');
    return await res.json();
  },

  async addRecord(recordData: Omit<MedicalRecord, 'id'>): Promise<MedicalRecord> {
    const res = await fetch(`${API_BASE_URL}/records`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(recordData)
    });
    if (!res.ok) throw new Error('Failed to add record');
    return await res.json();
  },

  async deleteRecord(id: string): Promise<void> {
    await fetch(`${API_BASE_URL}/records/${id}`, { method: 'DELETE' });
  },

  // Timeline
  async getTimeline(): Promise<TimelineEvent[]> {
    const res = await fetch(`${API_BASE_URL}/timeline`);
    if (!res.ok) throw new Error('Failed to fetch timeline');
    return await res.json();
  },

  async addTimelineEvent(eventData: Omit<TimelineEvent, 'id'>): Promise<TimelineEvent> {
    const res = await fetch(`${API_BASE_URL}/timeline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(eventData)
    });
    if (!res.ok) throw new Error('Failed to add timeline event');
    return await res.json();
  },

  // Guidance
  async getGuidance(): Promise<WellnessGuidance[]> {
    const res = await fetch(`${API_BASE_URL}/guidance`);
    if (!res.ok) throw new Error('Failed to fetch guidance');
    return await res.json();
  },

  // Doctor Questions
  async getDoctorQuestions(): Promise<DoctorQuestion[]> {
    const res = await fetch(`${API_BASE_URL}/doctor-questions`);
    if (!res.ok) throw new Error('Failed to fetch doctor questions');
    return await res.json();
  },

  async addDoctorQuestion(data: { questionText: string; category: string; reason: string }): Promise<DoctorQuestion> {
    const res = await fetch(`${API_BASE_URL}/doctor-questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error('Failed to add question');
    return await res.json();
  },

  async toggleDoctorQuestionBookmark(id: string): Promise<DoctorQuestion> {
    const res = await fetch(`${API_BASE_URL}/doctor-questions/${id}/bookmark`, {
      method: 'PATCH'
    });
    if (!res.ok) throw new Error('Failed to toggle bookmark');
    return await res.json();
  },

  // QA Messages
  async getQAMessages(): Promise<RecordQAMessage[]> {
    const res = await fetch(`${API_BASE_URL}/qa-messages`);
    if (!res.ok) throw new Error('Failed to fetch QA messages');
    return await res.json();
  },

  async sendQAPrompt(text: string): Promise<{ userMsg: RecordQAMessage; aiMsg: RecordQAMessage }> {
    const res = await fetch(`${API_BASE_URL}/qa-messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('Failed to send QA prompt');
    return await res.json();
  }
};
