import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { NgbModal, NgbModalRef, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-proms',
    templateUrl: './proms.component.html',
    styleUrls: ['./proms.component.scss'],
    providers: [RaitoService]
})

export class PromsComponent implements OnInit, OnDestroy{

  data: any = [];
  loadedData: boolean = false;
  questionnaires: any = [];
  actualQuestionnaire: any = {};
  changeQuestion: any = {};
  modalReference: NgbModalRef;
  showPanelNew: boolean = false;
  @ViewChild('f') NewForm: NgForm;
  private subscription: Subscription = new Subscription();

  constructor(public translate: TranslateService, private raitoService: RaitoService, private modalService: NgbModal){

  }

  ngOnInit() {

    this.loadQuestionnaires();

    this.subscription.add(this.raitoService.getProms().subscribe(
      data => {
        console.log(data);
        this.data = data.entry;
        this.loadedData = true;
      }
    ));
  }

  loadQuestionnaires(){

    this.subscription.add(this.raitoService.getQuestionnairesGroup().subscribe(
      data => {
        console.log(data);
        this.questionnaires = data.questionnaires;
      }
    ));
  }
  
  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  addForm(contentModalForm){
    this.actualQuestionnaire = {
      title:'',
      items:[]
    };
    
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      windowClass: 'ModalClass-sm'// xl, lg, sm
    };
    this.modalReference = this.modalService.open(contentModalForm, ngbModalOptions);
  }

  editForm(questionnaire, contentModalForm){
    //this.actualQuestionnaire = questionnaire;
    console.log(questionnaire);
    this.getQuestionnaire(questionnaire.id);
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      windowClass: 'ModalClass-sm'// xl, lg, sm
    };
    this.modalReference = this.modalService.open(contentModalForm, ngbModalOptions);
  }

  deleteForm(questionnaire){
    Swal.fire({
      title: this.translate.instant("generics.Are you sure?"),
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0CC27E',
      cancelButtonColor: '#FF586B',
      confirmButtonText: this.translate.instant("generics.Delete"),
      cancelButtonText: this.translate.instant("generics.No, cancel"),
      showLoaderOnConfirm: true,
      allowOutsideClick: false
  }).then((result) => {
    if (result.value) {
      this.deleteQuestionnaire(questionnaire.id);
    }

  });
    console.log(questionnaire);
  }

  deleteQuestionnaire(id){
    var copy = [];
    for(var i=0;i<this.questionnaires.length;i++){
      if(this.questionnaires[i].id!=id){
        copy.push(this.questionnaires[i])
      }
    }
    this.questionnaires=JSON.parse(JSON.stringify(copy))
  }
  

  closeModal() {
    if (this.modalReference != undefined) {
        this.modalReference.close();
        this.modalReference = undefined;
    }
  }

   getQuestionnaire(questionnaireId) {
    this.subscription.add(this.raitoService.loadQuestionnaire(questionnaireId).subscribe(
      data => {
        console.log(data);
        this.actualQuestionnaire = data;
      }
    ));
  }

  newQuestion() {
    this.showPanelNew = true;
    this.changeQuestion = {text:'', answers:[{text:''}], idProm:(this.actualQuestionnaire.items.length+1)}
  }

  addQuestion() {
    this.changeQuestion.answers.push({text:''});
  }

  deleteAltQuestion(index){
    this.changeQuestion.answers.splice(index, 1);
  }

  submitInvalidForm() {
    if (!this.NewForm) { return; }
    const base = this.NewForm;
    for (const field in base.form.controls) {
      if (!base.form.controls[field].valid) {
          base.form.controls[field].markAsTouched()
      }
    }
  }

  onSubmitNew(){
    this.actualQuestionnaire.items.push(this.changeQuestion)
    this.showPanelNew = false;
  }

  saveQuestionnaire(){
    //.push(this.actualQuestionnaire);
  }

  searchForm(contentModalSearch){
    
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      windowClass: 'ModalClass-sm'// xl, lg, sm
    };
    this.modalReference = this.modalService.open(contentModalSearch, ngbModalOptions);
  }

}
