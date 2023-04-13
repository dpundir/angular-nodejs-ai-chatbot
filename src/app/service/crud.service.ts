import { Injectable } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, throwError, Subject, of } from 'rxjs';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';

import { HttpParams } from '@angular/common/http';

export class Message {
  constructor(public author: string, public content: string) {}
}
export class DropDownOption {
  constructor(public name: string, public value: string) {}
}

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  // Node/Express API
  REST_API: string = 'http://localhost:8000/api';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  
  conversation = new Subject<Message[]>();

  selectedAIProvider!:String;
  selectedAIProviderModel!:String;

  availableAIProviders:[] = [];

  availableAIProviderModels:[] = [];

  constructor(private httpClient: HttpClient) {}

  getAIProviders(): Observable<any> {
    if(this.availableAIProviders.length == 0){
      return this.getProviders();
    } else {
      return of(this.availableAIProviders);
    }
  }

  getAIProviderModels(provider:DropDownOption): Observable<any> {
    return this.getProviderModels(provider.value);
  }

  getDefaultProvider(): string {
    return 'OPEN_AI';
  }

  getDefaultProviderModel() : string{
    return 'text-davinci-003';
  }

  setProviderAndModel(aiProvider:String, aiProviderModel: String){
    this.selectedAIProvider = aiProvider;
    this.selectedAIProviderModel = aiProviderModel;
  }

  getModel(): String {
    return this.selectedAIProviderModel;
  }

  getProvider(): String {
    return this.selectedAIProvider;
  }

  getBotAnswer(msg: string): Observable<any> {
    const userMessage = new Message('user', msg);  
    this.conversation.next([userMessage]);
    return this.postQuery(userMessage);
  }

  // post query
  postQuery(data: Message): Observable<any> {
    let API_URL = `${this.REST_API}/query`;
    return this.httpClient
      .post(API_URL, {
          message: data.content,
          provider: this.selectedAIProvider? this.selectedAIProvider : this.getDefaultProvider(),
          model: this.selectedAIProviderModel? this.selectedAIProviderModel : this.getDefaultProviderModel()
        }, { 
          headers: {'Content-Type': 'application/json'} 
        })
      .pipe(catchError(this.handleError));
  }

  // post query
  getProviders(): Observable<any> {
    let API_URL = `${this.REST_API}/aiproviders`;
    return this.httpClient
      .get(API_URL)
      .pipe(catchError(this.handleError));
  }

  // post query
  getProviderModels(provider: string): Observable<any> {
    let API_URL = `${this.REST_API}/aiprovidermodels`;
    return this.httpClient.get(API_URL, {
          params: new HttpParams().set('provider', provider)
        })
      .pipe(catchError(this.handleError));
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
