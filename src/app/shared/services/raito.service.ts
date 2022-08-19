import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../../environments/environment';
import { AuthService } from '../../../app/shared/auth/auth.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/toPromise';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap, merge, mergeMap, concatMap } from 'rxjs/operators'

@Injectable()
export class RaitoService {
    constructor(private authService: AuthService, private http: HttpClient) {}

    getPatients(){
      return this.http.get(environment.urlRaito+'/api/eo/patients/'+this.authService.getGroup())
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getPatient(idPatient){
      return this.http.get(environment.urlRaito+'/api/eo/patient/'+idPatient)
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getOnlyPatients(){
      return this.http.post(environment.urlRaito+'/api/eo/onlypatients/'+this.authService.getGroup(), {meta:true})
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getSeizures(){
      return this.http.get(environment.urlRaito+'/api/eo/seizures/'+this.authService.getGroup())
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getDrugs(){
      return this.http.get(environment.urlRaito+'/api/eo/drugs/'+this.authService.getGroup())
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getPhenotypes(){
      return this.http.get(environment.urlRaito+'/api/eo/phenotypes/'+this.authService.getGroup())
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getFeels(){
      return this.http.get(environment.urlRaito+'/api/eo/feels/'+this.authService.getGroup())
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getProms(){
      return this.http.get(environment.urlRaito+'/api/eo/proms/'+this.authService.getGroup())
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getWeights(){
      return this.http.get(environment.urlRaito+'/api/eo/weights/'+this.authService.getGroup())
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

    getHeights(){
      return this.http.get(environment.urlRaito+'/api/eo/heights/'+this.authService.getGroup())
        .map( (res : any) => {
          return res;
         }, (err) => {
           console.log(err);
         })
    }

}
