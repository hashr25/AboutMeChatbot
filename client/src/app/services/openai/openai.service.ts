import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OpenAIService {
  private apiUrl = '/api/assistants'; // Relative path for proxy to handle

  constructor(private http: HttpClient) { }

  createThread(): Observable<{ threadId: string }> {
    return this.http.post<{ threadId: string }>(`${this.apiUrl}/thread`, {});
  }

  sendMessage(threadId: string, message: string): Observable<{ response: string }> {
    return this.http.post<{ response: string }>(`${this.apiUrl}/message`, { threadId, message });
  }

  getIntro(): Observable<{ intro: string }> {
    return this.http.get<{ intro: string }>(`${this.apiUrl}/intro`);
  }
}
