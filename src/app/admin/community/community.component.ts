import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { DateService } from 'app/shared/services/date.service';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import {Observable, of, OperatorFunction} from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/toPromise';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-community',
    templateUrl: './community.component.html',
    styleUrls: ['./community.component.scss'],
    providers: [RaitoService]
})

export class CommunityComponent implements OnInit, OnDestroy{

  patients: any = [];
  loadedUsers: boolean = false;
  loading: boolean = false;
  modalReference: NgbModalRef;
  actualPatient: any= [];
  step = 0;
  showButtonScroll: boolean = false;
  private subscription: Subscription = new Subscription();
  private eventSubscription: Subscription = new Subscription();
  constructor(public translate: TranslateService, private raitoService: RaitoService, private dateService: DateService, private modalService: NgbModal){

  }

  ngOnInit() {
    this.subscription.add(this.raitoService.getOnlyPatients().subscribe(
      data => {
        this.patients = data;

        for (var index in this.patients) {
          if(this.patients[index].result.entry[0].resource.birthDate !=null){
            this.patients[index].result.entry[0].resource.age = this.ageFromDateOfBirthday(this.patients[index].result.entry[0].resource.birthDate);
          }else{
            this.patients[index].result.entry[0].resource.age = null;
          }
        }
        this.loadedUsers = true;
      }
    ));

    this.eventSubscription = Observable.fromEvent(window, "scroll").subscribe(e => {
      if($('#tabspills')){
          console.log($('#tabspills').height())
          if($('#tabspills').height()>720){
              this.showButtonScroll = true;
          }else{
              this.showButtonScroll = false;
          }
      }
      //console.log(window.innerHeight);
  });
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ageFromDateOfBirthday(dateOfBirth: any){
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    var months;
    months = (today.getFullYear() - birthDate.getFullYear()) * 12;
    months -= birthDate.getMonth();
    months += today.getMonth();
    var age =0;
    if(months>0){
      age = Math.floor(months/12)
    }
    var res = months <= 0 ? 0 : months;
    var m=res % 12;
    return {years:age, months:m }
  }


  viewPatient(patientId, contentModalPatient){
    this.loading = true;
    this.subscription.add( this.raitoService.getPatient(patientId)
    .subscribe( (res : any) => {
      console.log(res);
      this.actualPatient.resume = {};
      this.actualPatient.condition = {};
      this.actualPatient.drugs = [];
      this.actualPatient.questionnaires = [];
      this.actualPatient.phenotypes = [];
      this.actualPatient.seizures = [];
      this.actualPatient.feels = [];
      this.actualPatient.weights = [];
      this.actualPatient.heights = [];
      for(var index in res.result.entry){
        console.log(res.result.entry[index].resource.resourceType);
        if(res.result.entry[index].resource.resourceType=='Patient'){
          this.actualPatient.resume = res.result.entry[index];
          if(this.actualPatient.resume.resource.birthDate !=null){
            this.actualPatient.resume.resource.age = this.ageFromDateOfBirthday(this.actualPatient.resume.resource.birthDate);
          }
        }
        if(res.result.entry[index].resource.resourceType=='Condition'){
          this.actualPatient.condition = res.result.entry[index];
        }
        if(res.result.entry[index].resource.resourceType=='MedicationStatement'){
          this.actualPatient.drugs.push(res.result.entry[index]);
        }
        if(res.result.entry[index].resource.resourceType=='QuestionnaireResponse'){
          this.actualPatient.questionnaires.push(res.result.entry[index]);
        }
        if(res.result.entry[index].resource.resourceType=='Observation'){
          if(res.result.entry[index].resource.code.text=='Phenotype'){
            this.actualPatient.phenotypes.push(res.result.entry[index]);
          }
          if(res.result.entry[index].resource.code.text.indexOf('Seizure - ')!=-1){
            this.actualPatient.seizures.push(res.result.entry[index]);
          }
          if(res.result.entry[index].resource.code.text=='Feel'){
            this.actualPatient.feels.push(res.result.entry[index]);
          }
          if(res.result.entry[index].resource.code.text=='Weight'){
            this.actualPatient.weights.push(res.result.entry[index]);
          }
          if(res.result.entry[index].resource.code.text=='Body height'){
            this.actualPatient.heights.push(res.result.entry[index]);
          }
        }
        
      }
      console.log(this.actualPatient);
      //this.actualPatient = res;
      if(this.modalReference!=undefined){
        this.modalReference.close();
      }
      let ngbModalOptions: NgbModalOptions = {
            backdrop : 'static',
            keyboard : false,
            windowClass: 'ModalClass-xl'
      };
      this.modalReference = this.modalService.open(contentModalPatient, ngbModalOptions);
      this.loading = false;
     }, (err) => {
       console.log(err);
       this.loading = false;
     }));
  }

  closeModal() {
    if (this.modalReference != undefined) {
        this.modalReference.close();
        this.modalReference = undefined;
    }
  }

  download(patientId){
    this.loading = true;
    this.subscription.add( this.raitoService.getPatient(patientId)
    .subscribe( (res : any) => {
          var json = JSON.stringify(res.result);
          var blob = new Blob([json], {type: "application/json"});
          var url  = URL.createObjectURL(blob);
          var p = document.createElement('p');
          document.getElementById('content').appendChild(p);
  
          var a = document.createElement('a');
          var dateNow = new Date();
          var stringDateNow = this.dateService.transformDate(dateNow);
          a.download    = "dataRaito_fhir_"+patientId+'_'+stringDateNow+".json";
          a.target     = "_blank";
          a.href        = url;
          a.textContent = "dataRaito_fhir_"+patientId+'_'+stringDateNow+".json";
          a.setAttribute("id", "download")
  
          document.getElementById('content').appendChild(a);
          document.getElementById("download").click();
          this.loading = false;
     }, (err) => {
       console.log(err);
       this.loading = false;
     }));
  }

  setStep(index: number) {
    this.step = index;
  }

  goTopTabs(){
    document.getElementById('inittabs').scrollIntoView(true);
  }

}
