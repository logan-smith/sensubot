import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkyModule} from 'angular-linky';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ChatBotComponent,  WelcomeDialog, HelpDialog } from './chat-bot.component';

import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatToolbarModule,
  MatDialogModule
} from '@angular/material';

const ROUTES = [
  {
    path: '',
    component: ChatBotComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(ROUTES),
    LinkyModule,
MatButtonModule,
MatIconModule,
MatInputModule,
MatMenuModule,
MatToolbarModule,
MatDialogModule
  ],
  exports: [
    RouterModule
  ],
  declarations: [
  ChatBotComponent,
  WelcomeDialog,
  HelpDialog
  ],
  entryComponents: [
    WelcomeDialog,
    HelpDialog
  ],
  providers: []
})
export class ChatBotModule { }
