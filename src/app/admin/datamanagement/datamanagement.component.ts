import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { RaitoService } from 'app/shared/services/raito.service';
@Component({
    selector: 'app-datamanagement',
    templateUrl: './datamanagement.component.html',
    styleUrls: ['./datamanagement.component.scss'],
    providers: [RaitoService]
})

export class DataManagementComponent implements OnInit{

  data: any = [];
  loadedData: boolean = false;

  constructor(public translate: TranslateService, private raitoService: RaitoService){

  }

  ngOnInit() {
    
  }

}
