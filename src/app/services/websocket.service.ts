import { Injectable } from '@angular/core';
import {Chat} from 'src/app/chat';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket: WebSocket;
  public chatMessages: Chat[] = [];

  constructor() { }

  // open the connection
  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/chat');
    this.webSocket.onopen = (event) => {
      console.log('Open ', event);
    }

    this.webSocket.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      this.chatMessages.push(newMessage);
    }

    this.webSocket.onclose = (event) => {
      console.log('Close ', event);
    }
  }

  public getMessages() {
    return this.chatMessages;
  }

  public sendMessage(chat: Chat) {
    return this.webSocket.send(JSON.stringify(chat));
  }

  public closeSocket() {
    this.webSocket.close();
  }
}
