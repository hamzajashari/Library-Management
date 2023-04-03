import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './general/api.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  BOOK_PATH = '/book';
  FIND_BY_NAME = '/find';
  INVENTORY_STATUS ='/inventoryStatus';
  FILTER = '/filter';
  RECENT_SALES='/recentSales';
  RECOMMENDED='/recommended';
  
  constructor(private apiService: ApiService,
              private http: HttpClient) { }
              
getAll(): Observable<any> {
    return this.apiService.getAll(this.BOOK_PATH).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getTopBooks(): Observable<any> {
    return this.apiService.getTopBooks(this.BOOK_PATH + this.FILTER).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getSlope(): Observable<any> {
    return this.apiService.getSlope(this.BOOK_PATH + "/slope").pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getRec(id :string): Observable<any> {
    return this.apiService.getSlope(this.BOOK_PATH + "/" + id + this.RECOMMENDED ).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getById(id: string): Observable<any> {
    return this.apiService.getById(this.BOOK_PATH + '/' + id).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  findAllByName(name: string): Observable<any> {
    return this.apiService.findAllByName(this.BOOK_PATH + this.FIND_BY_NAME + '/' + name).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  inventoryStatus(quantity: number): Observable<any> {
    return this.apiService.inventoryStatus(this.BOOK_PATH + this.INVENTORY_STATUS + '/' + quantity).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getRecentSales(){
    return this.apiService.getRecentSales(this.BOOK_PATH+ this.RECENT_SALES).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  post(params): Observable<any> {
    return this.apiService.post(this.BOOK_PATH, params).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  put(id: number, book): Observable<any> {
    return this.apiService.put(this.BOOK_PATH + '/' + id, book).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  delete(id): Observable<any> {
    return this.apiService.delete(this.BOOK_PATH + '/' + id).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
}
