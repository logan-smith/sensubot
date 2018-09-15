import { Component, OnInit, OnDestroy } from '@angular/core';
import * as io from 'socket.io-client';
import { SpeechRecognitionService } from '../services/speech-recognition-service';

import {MatDialog} from '@angular/material';

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

@Component({
  selector: 'chat-bot',
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
  providers: [SpeechRecognitionService]
})
export class ChatBotComponent {
  title = 'Sensubot Chat Page';

  messages = [];
  connection;
  message;

  showSearchButton: boolean;
  speechData: string;

  constructor(private speechRecognitionService: SpeechRecognitionService, public dialog: MatDialog){
    this.connection = io('https://sensu.chat');

    this.connection.on('response-message', function(data){
      console.log("incoming message to " + this.connection.id + "\n" + data);
      var message = {
              content : data,
              isServer: true
      };
      this.messages.push(message);

      this.showSearchButton = true;
      this.speechData = "";

    }.bind(this));

    // Open the dialog window when the user connects.
    this.dialog.open(WelcomeDialog);
  }

  sendMessage(){
    var currentMessage = {
            content : this.message,
            isServer: false
    };

    this.messages.push(currentMessage);

    this.connection.emit('message', {
      id: this.connection.id,
      text: this.message
    });

    this.message = '';
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
    this.speechRecognitionService.DestroySpeechObject();
  }

  activateSpeechSearchMovie(currentMessage) {

    var term = this.speechRecognitionService.record().then(q => {
      console.log('q: ' + q);

      var currentMessage= {
        content: q,
        isServer: false
      };
      this.messages.push(currentMessage);

      this.connection.emit('message', {
        id: this.connection.id,
        text: q
      });
      this.message = '';
    });
  }

  // Opens the dialog when the user clicks "About"
  openWelcomeDialog() {
    this.dialog.open(WelcomeDialog);
  }

  openHelpDialog() {
    this.dialog.open(HelpDialog);
  }
}

// Seperate component for the welcome message dialog window
@Component({
  selector: 'welcome-dialog',
  templateUrl: './welcome-dialog.html',
})
export class WelcomeDialog {}

@Component({
  selector: 'help-dialog',
  templateUrl: './help-dialog.html',
})
export class HelpDialog {}
