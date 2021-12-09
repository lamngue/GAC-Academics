import { Injectable } from '@angular/core';
import {Chat} from 'src/app/chat';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private webSocket: WebSocket;
  public chatMessages: Chat[] = [];
  private connection: Event;
  private unreadMessages: number = 0;
  private chat: Chat;
  dialogOpen: boolean;

  constructor() { }

  // open the connection
  public openWebSocket() {
    this.webSocket = new WebSocket(environment.wsUrl + '/chat');
    this.webSocket.onopen = (event) => {
      this.connection = event;
    }

    this.webSocket.onmessage = (event) => {
      console.log(event.data);
      if (event.data === '') {
        this.chatMessages.push(this.chat);
      } else {
        this.unreadMessages++;
        const newMessage = JSON.parse(event.data);
        this.chatMessages.push(newMessage);
      }
    }

    this.webSocket.onclose = (event) => {
      console.log('Close ', event);
    }
  }

  getUnreadMessages() {
    return this.unreadMessages;
  }

  resetUnreadMessages() {
    this.unreadMessages = 0;
  }

  getConnection() {
    return this.connection;
  }


  public sendMessage(chat: Chat) {
    this.chat = chat;
    return this.webSocket.send(JSON.stringify(chat));
  }

  public closeSocket() {
    this.webSocket.close();
  }
}
