import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { Subscription } from 'rxjs/Subscription';

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
  private subscription: Subscription = new Subscription();

  constructor(public translate: TranslateService, private raitoService: RaitoService){

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

}
