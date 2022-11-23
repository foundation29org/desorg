import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { SearchService } from 'app/shared/services/search.service';
import { AuthService } from '../../../app/shared/auth/auth.service';
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
  loadedAllQuestionaires: boolean = false;
  allQuestionnaires: any = [];
  questionnaires: any = [];
  actualQuestionnaire: any = {};
  changeQuestion: any = {};
  modalReference: NgbModalRef;
  showPanelNew: boolean = false;
  isEditing: boolean = false;
  updatingQuestionnaire: boolean = false;
  actuaGroup: string = '';
  @ViewChild('f') NewForm: NgForm;
  private subscription: Subscription = new Subscription();

  constructor(public translate: TranslateService, private raitoService: RaitoService, private modalService: NgbModal, private searchService: SearchService, private authService: AuthService){

  }

  ngOnInit() {
    this.actuaGroup = this.authService.getGroup();
    this.loadQuestionnaires(false);
    this.subscription.add(this.raitoService.getProms().subscribe(
      data => {
        console.log(data);
        this.data = data.entry;
        this.loadedData = true;
      }
    ));
  }

  getAllQuestionnaire() {
    this.loadedAllQuestionaires = false;
    this.allQuestionnaires = [];
    this.subscription.add(this.raitoService.loadAllQuestionnaire().subscribe(
      data => {
        console.log(data);
        this.allQuestionnaires = data;
        for(var i=0;i<this.allQuestionnaires.length;i++){
          for(var j=0;j<this.questionnaires.length;j++){
            if(this.allQuestionnaires[i].id==this.questionnaires[j].id){
              this.allQuestionnaires[i].installed = true;
            }
          }
        }
        console.log(this.allQuestionnaires);
        this.loadedAllQuestionaires = true;
      }
    ));
  }

  loadQuestionnaires(loadAll){
    this.questionnaires = [];
    this.subscription.add(this.raitoService.getQuestionnairesGroup().subscribe(
      data => {
        if(data.questionnaires!='No data'){
          this.questionnaires = data.questionnaires;
        }
        if(loadAll){
          this.getAllQuestionnaire();
        }
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
      "resourceType": "Questionnaire",
      createdById:this.authService.getGroup(),
      createdby: '',
      id:'',
      title:'',
      description: '',
      items:[],
      img:'',
      rate:{avg:0, ids: []}
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
    this.updatingQuestionnaire=true;
    this.getQuestionnaire(questionnaire.id);
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      windowClass: 'ModalClass-sm'// xl, lg, sm
    };
    this.modalReference = this.modalService.open(contentModalForm, ngbModalOptions);
  }

  promchanged(question, questionnaire){
    console.log(question);
    console.log(questionnaire);
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

  addQuestionnaire(id){
    var info = {id:id}
    this.subscription.add(this.raitoService.addlinkQuestionnaire(info).subscribe(
      data => {
        console.log(data);
        if(data.message=='added'){
          this.loadQuestionnaires(true);
        }else{
          Swal.fire('', data.message, "warning");
        }
      }
    ));

    /*var copy = [];
    for(var i=0;i<this.questionnaires.length;i++){
      if(this.questionnaires[i].id!=id){
        copy.push(this.questionnaires[i])
      }
    }
    this.questionnaires=JSON.parse(JSON.stringify(copy))*/
  }

  deleteQuestionnaire(id){
    var info = {id:id}
    this.subscription.add(this.raitoService.deletelinkQuestionnaire(info).subscribe(
      data => {
        console.log(data);
        if(data.message=='removed'){
          this.loadQuestionnaires(true);
        }else{
          Swal.fire('', data.message, "warning");
        }
      }
    ));

    /*var copy = [];
    for(var i=0;i<this.questionnaires.length;i++){
      if(this.questionnaires[i].id!=id){
        copy.push(this.questionnaires[i])
      }
    }
    this.questionnaires=JSON.parse(JSON.stringify(copy))*/
  }
  

  closeModal() {
    if (this.modalReference != undefined) {
        this.modalReference.close();
        this.modalReference = undefined;
    }
    this.updatingQuestionnaire=false;
    this.showPanelNew = false;
    this.isEditing=false;
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
    this.isEditing=false;
    this.changeQuestion = {text:'', answers:[{text:'', value:''}], idProm:(this.actualQuestionnaire.items.length+1), type:'', other: null}
  }

  addQuestion() {
    this.changeQuestion.answers.push({text:''});
  }

  deleteAltQuestion(index){
    this.changeQuestion.answers.splice(index, 1);
  }

  cancelNewQuestion(){
    this.changeQuestion = {text:'', answers:[{text:'', value:''}], idProm:(this.actualQuestionnaire.items.length+1), type:'', other: null}
    this.showPanelNew = false;
  }

  changeValue(value, index){
    this.changeQuestion.answers[index].value = value;

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
    if(this.isEditing){
      var foundElementIndex = this.searchService.searchIndex(this.actualQuestionnaire.items, 'idProm', this.changeQuestion.idProm);
      if(foundElementIndex!=-1){
        this.actualQuestionnaire.items[foundElementIndex]=this.changeQuestion;
      }else{
        this.actualQuestionnaire.items.push(this.changeQuestion)
      }
    }else{
      this.actualQuestionnaire.items.push(this.changeQuestion)
    }
    this.isEditing = false;
    this.showPanelNew = false;
  }

  editQuestion(question){
    console.log(question);
    this.changeQuestion = question;
    this.isEditing=true;
    this.showPanelNew=true;
  }

  saveQuestionnaire(){
    /*this.loadQuestionnaires();
    this.closeModal();*/

    if(this.updatingQuestionnaire){
      this.subscription.add(this.raitoService.updateQuestionnaire(this.actualQuestionnaire).subscribe(
        data => {
          console.log(data);
          if(data.message=='dont exists'){
            Swal.fire('The id dont exists', 'Change the title please', "warning");
          }else if(data.message=='dont have permissions'){
            Swal.fire('', 'You dont have permissions', "warning");
          }else{
            this.loadQuestionnaires(false);
            this.closeModal();
          }
          
        }
      ));
    }else{
      this.subscription.add(this.raitoService.newQuestionnaire(this.actualQuestionnaire).subscribe(
        data => {
          console.log(data);
          if(data.message=='already exists'){
            Swal.fire('The name already exists', 'Change the title please', "warning");
          }else{
            this.loadQuestionnaires(false);
            this.closeModal();
          }
          
        }
      ));
    }
    
  }

  searchForm(contentModalSearch){
    this.getAllQuestionnaire();
    let ngbModalOptions: NgbModalOptions = {
      backdrop : 'static',
      keyboard : false,
      windowClass: 'ModalClass-lg'// xl, lg, sm
    };
    this.modalReference = this.modalService.open(contentModalSearch, ngbModalOptions);
  }

  callevent(questionnaire, value){
    if(questionnaire.installed){
      console.log(this.authService.getGroup());
      console.log(questionnaire);
      console.log(value);
      //mandar id del cuestionario y el value, y el grupo en la url
      var info = {id: questionnaire.id, value: value};
      this.subscription.add(this.raitoService.rateQuestionnaire(info).subscribe(
        data => {
          console.log(data);
          if(data.message=='updated'){
            this.getAllQuestionnaire();
            Swal.fire('', 'Done', "success");
          }else if(data.message=='dont exists'){
            Swal.fire('The id dont exists', '', "warning");
          }else if(data.message=='dont have permissions'){
            Swal.fire('', 'You cannot vote on a questionnaire created by you.', "warning");
          }else{
            Swal.fire('', data.message, "warning");
          }
          
        }
      ));
    }else{
      Swal.fire('', "You can't vote if it's not installed.", "warning");
    }
    
  }

}
