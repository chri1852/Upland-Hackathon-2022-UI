import { Observable } from 'rxjs';
import { AjaxResponse, ajax } from 'rxjs/ajax';
import { map } from 'rxjs/operators';

export interface IAjaxClient {
  get(request: AjaxRequestBase): Observable<AjaxResponse>;
  post(request: AjaxRequestWithBody): Observable<AjaxResponse>;
  put(request: AjaxRequestWithBody): Observable<AjaxResponse>;
  patch(request: AjaxRequestWithBody): Observable<AjaxResponse>;
  get(request: AjaxRequestBase): Observable<AjaxResponse>;
}

export interface AjaxRequestBase {
  url: string,
  headers:  Record<string, string>
}

export interface AjaxRequestWithBody extends AjaxRequestBase {
  body?: any
}

export class AjaxClient implements IAjaxClient {

  private createRequest = (method: string, url: string, body: any, headers: Record<string, string>): any => ({
    method,
    url,
    body,
    headers,
    crossDomain: true
  });

  private createAjax = (method: string) => (url: string, headers: Record<string, string>) => {
    return ajax(this.createRequest(method, url, null, headers));
  };
  
  private createAjaxWithBody = (method: string) => (url: string, body: any, headers: Record<string, string>) => {
    return ajax(this.createRequest(method, url, JSON.stringify(body), headers));
  };

  get(request: AjaxRequestBase): Observable<AjaxResponse> {
    return this.createAjax('GET')(request.url, request.headers)
  }
  post(request: AjaxRequestWithBody): Observable<AjaxResponse> {
    return this.createAjaxWithBody('POST')(request.url, request.body, request.headers)
  }
  put(request: AjaxRequestWithBody): Observable<AjaxResponse> {
    return this.createAjaxWithBody('PUT')(request.url, request.body, request.headers)
  }
  patch(request: AjaxRequestWithBody): Observable<AjaxResponse> {
    return this.createAjaxWithBody('PATCH')(request.url, request.body, request.headers)
  }
  delete(request: AjaxRequestBase): Observable<AjaxResponse> {
    return this.createAjax('DELETE')(request.url, request.headers)
  }
  getJSON(url: string, headers: Record<string, string>) {
    ajax({
      url,
      method: 'GET',
      responseType: 'json',
      crossDomain: true,
      headers,
    }).pipe(
      map((response: any) => response.response)
    )
  }
}

