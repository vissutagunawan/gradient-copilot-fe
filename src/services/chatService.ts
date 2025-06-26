const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ChatService {
  static async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_URL}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}