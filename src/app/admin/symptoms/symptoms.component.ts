import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { Apif29BioService } from 'app/shared/services/api-f29bio.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-symptoms',
    templateUrl: './symptoms.component.html',
    styleUrls: ['./symptoms.component.scss'],
    providers: [RaitoService, Apif29BioService]
})

export class SymptomsComponent implements OnInit, OnDestroy{

  data: any = [];
  loadedData: boolean = false;
  lang: string = 'en';
  private subscription: Subscription = new Subscription();

  constructor(public translate: TranslateService, private raitoService: RaitoService, private apif29BioService: Apif29BioService){

  }

  ngOnInit() {
    this.lang = sessionStorage.getItem('lang');

    this.subscription.add(this.raitoService.getPhenotypes().subscribe(
      data => {
        this.data = data.entry;
        this.getHpoCodes();
        
      }
    ));
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  getHpoCodes(){
    var hposStrins = [];

    for(var i=0;i<this.data.length;i++){
      hposStrins.push(this.data[i].resource.valueString);
    }

    if (hposStrins.length >0) {
      this.callGetInfoSymptoms(hposStrins);
    }else{
      this.loadedData = true;
    }
  }
  
  callGetInfoSymptoms(hposStrins) {
    var lang = this.lang;
    this.subscription.add(this.apif29BioService.getInfoOfSymptoms(lang, hposStrins)
        .subscribe((res: any) => {
            var tamano = Object.keys(res).length;
            if (tamano > 0) {
                for (var i in res) {
                    for (var j = 0; j < this.data.length; j++) {
                        if (res[i].id == this.data[j].resource.valueString) {
                            this.data[j].resource.name = res[i].name;
                            this.data[j].resource.def = res[i].desc;
                            this.data[j].resource.synonyms = res[i].synonyms;
                            this.data[j].resource.comment = res[i].comment;
                        }
                    }
                }
                //this.temporalSymptoms.sort(this.sortService.GetSortOrder("name"));
            }
            this.loadedData = true;
        }, (err) => {
            console.log(err);
            this.loadedData = true;
        }));
  }

}
