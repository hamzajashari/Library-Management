import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseURL=environment.API_BASE_PATH;
  constructor(private http: HttpClient) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getAll(path: string): Observable<any> {
    return this.http.get<number>(this.baseURL +"api" + path);
  }

  getTopBooks(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }

  getById(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getByName(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getCart(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getWish(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getOrders(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getUsersCount(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getRecentSales(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getSlope(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getRec(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  getSubs(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  usersMonthly(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  findAllByName(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  inventoryStatus(path: string): Observable<any> {
    return this.http.get<any>(this.baseURL + "api" + path);
  }
  post(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.post(this.baseURL + "api" + path, params);
  }

  put(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.put(this.baseURL + "api" + path, JSON.stringify(params), this.httpOptions);
  }
  patch(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.patch(this.baseURL + "api" + path, params);
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(this.baseURL + "api" + path);
  }

  login(username,password): Observable<any> {
    return this.http.post<any>( this.baseURL + 'api/main/sign-in', {username, password})
  }
  register(registerData): Observable<any>{
    return this.http.post<any>( this.baseURL + 'api/main/sign-up', registerData)
  }

  // private formatError(error: any) {
  //   return Observable.call(this.baseURL + error.error);
  // }
}
