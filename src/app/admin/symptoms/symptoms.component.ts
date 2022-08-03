import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-symptoms',
    templateUrl: './symptoms.component.html',
    styleUrls: ['./symptoms.component.scss'],
    providers: [RaitoService]
})

export class SymptomsComponent implements OnInit, OnDestroy{

  data: any = [];
  loadedData: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(public translate: TranslateService, private raitoService: RaitoService){

  }

  ngOnInit() {
    this.subscription.add(this.raitoService.getPhenotypes().subscribe(
      data => {
        this.data = data.entry;
        this.loadedData = true;
      }
    ));
  }

  ngOnDestroy() {
    if(this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
