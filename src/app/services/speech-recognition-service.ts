import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import * as _ from "lodash";

interface IWindow extends Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
}

@Injectable()
export class SpeechRecognitionService {
    speechRecognition: any;
    
    constructor(private zone: NgZone) {
    }

    record() {

        return new Promise((resolve, reject) => {
            let term: string = "";
            console.log('recording');

            const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();
            this.speechRecognition.continuous = true;
            this.speechRecognition.lang = 'en-us';
            this.speechRecognition.maxAlternatives = 1;
            this.speechRecognition.start();
            


            this.speechRecognition.onresult = speech => {

                if (speech.results) {
                    var result = speech.results[speech.resultIndex];
                    var transcript = result[0].transcript;
                    if (result.isFinal) {
                        if (result[0].confidence < 0.3) {
                            alert("Unrecognized result - Please try again");
                            return "Unrecognized result - Please try again";
                            
                        }
                        else {
                            term = _.trim(transcript);
                            this.speechRecognition.stop()
                            resolve(term);
                        }
                    }
                }
            }
        });

        
    }

    /*
    record2(): Observable<string> {

        return Observable.create(observer => {
            const { webkitSpeechRecognition }: IWindow = <IWindow>window;
            this.speechRecognition = new webkitSpeechRecognition();
            //this.speechRecognition = SpeechRecognition;
            this.speechRecognition.continuous = true;
            //this.speechRecognition.interimResults = true;
            this.speechRecognition.lang = 'en-us';
            this.speechRecognition.maxAlternatives = 1;

            this.speechRecognition.onresult = speech => {
                let term: string = "";
                
                this.zone.run(() => {
                    observer.next(term);
                });
            };

            this.speechRecognition.onerror = error => {
                observer.error(error);
            };

            this.speechRecognition.onend = () => {
                observer.complete();
            };

            this.speechRecognition.start();
            //console.log("Say something - We are listening !!!");
        });
    }
    */

    DestroySpeechObject() {
        if (this.speechRecognition)
            this.speechRecognition.stop();
    }

}