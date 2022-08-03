import { Component, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-seizures',
    templateUrl: './seizures.component.html',
    styleUrls: ['./seizures.component.scss'],
    providers: [RaitoService]
})

export class SeizuresComponent implements OnInit, OnDestroy{

  data: any = [];
  loadedData: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(public translate: TranslateService, private raitoService: RaitoService){

  }

  ngOnInit() {
    this.subscription.add(this.raitoService.getSeizures().subscribe(
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
