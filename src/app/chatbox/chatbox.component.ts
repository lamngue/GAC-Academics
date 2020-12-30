import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  MatBottomSheetRef,
} from '@angular/material/bottom-sheet';
import {
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { HomeService } from '../services/home.service';
import { Observable } from 'rxjs';
import { WebsocketService } from 'src/app/services/websocket.service';
import { Chat } from 'src/app/chat';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css'],
})
export class ChatboxComponent implements OnInit, OnDestroy {
  chatForm: FormGroup;
  studentName: string;
  messages: Chat[] = [];
  constructor(
    public webSocketService: WebsocketService,
    private formBuilder: FormBuilder,
    private homeService: HomeService,
    private _bottomSheetRef: MatBottomSheetRef<ChatboxComponent>
  ) {
    this.chatForm = this.formBuilder.group({
      chat: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUserInfo().subscribe((data) => {
      this.studentName = data['name']['name'];
    });
    this.webSocketService.openWebSocket();
  }

  getUserInfo(): Observable<any> {
    return this.homeService.getUserInfo();
  }

  matcher = new MyErrorStateMatcher();

  onSubmit(sendForm: NgForm) {
    sendForm.value['username'] = this.studentName;
    const chat = new Chat(sendForm.value['username'], sendForm.value['chat']);
    console.log(chat);
    this.webSocketService.sendMessage(chat);
    sendForm.controls.chat.reset();
  }

  ngOnDestroy() {
    this.webSocketService.closeSocket();
  }
}
