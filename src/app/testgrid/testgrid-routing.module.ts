import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestgridPage } from './testgrid.page';

const routes: Routes = [
  {
    path: '',
    component: TestgridPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestgridPageRoutingModule {}
