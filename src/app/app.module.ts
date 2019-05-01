import { NgModule } from '@angular/core';

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UnitsPipe } from './units.pipe';
import {RouterModule, Routes} from '@angular/router';
import { FaqComponent } from './faq/faq.component';
import { HomeComponent } from './home/home.component';
import { WaysToGiveComponent } from './ways-to-give/ways-to-give.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'ways-to-give',
    component: WaysToGiveComponent
  }
];


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FaqComponent,
    WaysToGiveComponent,
    UnitsPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
