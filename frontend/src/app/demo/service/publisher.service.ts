import { Injectable } from '@angular/core';
import { ApiService } from './general/api.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PublisherService {
  PUBLISHER_PATH = '/publisher';
  PUBLISHER_PATH_PAGE = '/pagination';
  FIND_ALL_BY_NAME_PATH = '/find?name=';

  constructor(private apiService: ApiService, private http: HttpClient) { }

  getAll(): Observable<any> {
    return this.apiService.getAll(this.PUBLISHER_PATH).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  findAllByName(name){
    return this.apiService.findAllByName(this.PUBLISHER_PATH + this.FIND_ALL_BY_NAME_PATH + name).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  getById(id: number): Observable<any> {
    return this.apiService.getById(this.PUBLISHER_PATH + '/' + id).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  post(publisher): Observable<any> {
    return this.apiService.post(this.PUBLISHER_PATH, publisher).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  put(id,publisher): Observable<any> {
    return this.apiService.put(this.PUBLISHER_PATH + '/' + id, publisher).pipe(map(
      res => {
        if (res) {
          return res;
        } else {
          return {};
        }
      }
    ));
  }
  delete(id):  Observable<any> {
    return this.apiService.delete(this.PUBLISHER_PATH + '/' + id).pipe(map(
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
