import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'app/shared/auth/auth-guard.service';
import { RoleGuard } from 'app/shared/auth/role-guard.service';

import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { PromsComponent } from './proms/proms.component';
import { CommunityComponent } from './community/community.component';
import { SeizuresComponent } from './seizures/seizures.component';
import { DrugsComponent } from './drugs/drugs.component';
import { FeelsComponent } from './feels/feels.component';
import { SymptomsComponent } from './symptoms/symptoms.component';
import { DataManagementComponent } from './datamanagement/datamanagement.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'dashboard-admin',
        component: DashboardAdminComponent,
        data: {
          title: 'menu.Dashboard',
          expectedRole: ['Admin']
        },
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        path: 'questionnaires',
        component: PromsComponent,
        data: {
          title: 'do.questionnaires',
          expectedRole: ['Admin']
        },
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        path: 'community',
        component: CommunityComponent,
        data: {
          title: 'do.community',
          expectedRole: ['Admin']
        },
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        path: 'seizures',
        component: SeizuresComponent,
        data: {
          title: 'do.seizures',
          expectedRole: ['Admin']
        },
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        path: 'drugs',
        component: DrugsComponent,
        data: {
          title: 'do.drugs',
          expectedRole: ['Admin']
        },
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        path: 'feels',
        component: FeelsComponent,
        data: {
          title: 'do.quality',
          expectedRole: ['Admin']
        },
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        path: 'symptoms',
        component: SymptomsComponent,
        data: {
          title: 'do.symptoms',
          expectedRole: ['Admin']
        },
        canActivate: [AuthGuard, RoleGuard]
      },
      {
        path: 'datamanagement',
        component: DataManagementComponent,
        data: {
          title: 'do.datamanagement',
          expectedRole: ['Admin']
        },
        canActivate: [AuthGuard, RoleGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
