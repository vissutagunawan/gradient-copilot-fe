import { ChatResponse, Message } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export class ChatService {
  static async sendMessage(
    message: string,
    conversationHistory: Message[],
    image?: File
  ): Promise<ChatResponse> {
    const formData = new FormData();
    formData.append('message', message);
    
    // Convert conversation history to the format expected by backend
    const historyForBackend = conversationHistory.map(msg => ({
      role: msg.role,
      content: msg.content
    }));
    
    formData.append('conversation_history', JSON.stringify(historyForBackend));
    
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ChatResponse = await response.json();
      return data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw new Error('Failed to send message. Please try again.');
    }
  }

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