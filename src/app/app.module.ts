import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

//import { FormEditorModule } from './form-editor/form-editor.module';
import { ChatBotModule } from './chat-bot/chat-bot.module';

import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const ROUTES = [
//  {
//    path: 'formEditor',
//    loadChildren: 'app/form-editor/form-editor.module#FormEditorModule',
//    //data: { title: 'Form Editor'}
//  },
  {
    path: 'chatbot',
    loadChildren: 'app/chat-bot/chat-bot.module#ChatBotModule',
    //data: { title: 'Chatbot'}
  },
  {
    path: '',
    redirectTo: '/chatbot',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
  ],
exports: [BrowserAnimationsModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
