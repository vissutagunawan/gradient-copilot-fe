export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  image?: string;
}

export interface MaterialRecommendation {
  title: string;
  url: string;
  description: string;
  source: string;
}

export interface ChatResponse {
  response: string;
  materials: MaterialRecommendation[];
  has_materials: boolean;
}

export interface ChatRequest {
  message: string;
  conversation_history: Message[];
  image?: File;
}