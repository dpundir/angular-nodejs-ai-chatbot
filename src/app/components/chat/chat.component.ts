import { Component, OnInit, AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService, Message } from '../../service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewChecked {

  messages: Message[] = [];
  value: string;

  @ViewChild('queryContainer') queryContainer!: ElementRef;

  constructor(public crudService: CrudService) { 
    this.value = ''; }

  ngOnInit() {
      this.crudService.conversation.subscribe((val) => {
        this.messages = this.messages.concat(val);
        //this.scrollQueryContainer();
      });
  }

  ngAfterViewChecked() {        
    this.scrollQueryContainerToBottom();        
  } 

  sendMessage() {
    this.crudService.getBotAnswer(this.value).subscribe((res) => {
      console.log(res);
      const botMessage:Message = new Message('bot', res);
      this.messages = this.messages.concat(botMessage);
      //this.scrollQueryContainer();
    });
    this.value = '';
  }

  scrollQueryContainerToBottom() {
    this.queryContainer.nativeElement.scrollTop = this.queryContainer.nativeElement.scrollHeight;
  }

}
