import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { Subscription } from 'rxjs/Subscription';
import { DateService } from 'app/shared/services/date.service';

@Component({
    selector: 'app-datamanagement',
    templateUrl: './datamanagement.component.html',
    styleUrls: ['./datamanagement.component.scss'],
    providers: [RaitoService]
})

export class DataManagementComponent implements OnInit{

  data: any = [];
  loadedData: boolean = false;
  private subscription: Subscription = new Subscription();
  private msgDownload: string;

  constructor(public translate: TranslateService, private raitoService: RaitoService, private dateService: DateService){

  }

  ngOnInit() {
    this.translate.get('generics.Download').subscribe((res: string) => {
      this.msgDownload=res;
    });
  }

  extractFhir(){
    this.loadedData = true;
    this.subscription.add( this.raitoService.getPatients()
    .subscribe( (res : any) => {
          var json = JSON.stringify(res);
          var blob = new Blob([json], {type: "application/json"});
          var url  = URL.createObjectURL(blob);
          var p = document.createElement('p');
          var t = document.createTextNode(this.msgDownload+":");
          p.appendChild(t);
          document.getElementById('content').appendChild(p);
  
          var a = document.createElement('a');
          var dateNow = new Date();
          var stringDateNow = this.dateService.transformDate(dateNow);
          a.download    = "dataRaito_fhir_"+stringDateNow+".json";
          a.target     = "_blank";
          a.href        = url;
          a.textContent = "dataRaito_fhir_"+stringDateNow+".json";
          a.setAttribute("id", "download")
  
          document.getElementById('content').appendChild(a);
          document.getElementById("download").click();
          this.loadedData = false;
     }, (err) => {
       console.log(err);
       this.loadedData = false;
     }));
  }

}
