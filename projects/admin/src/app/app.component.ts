import { Component } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'admin';
  lang :any
   constructor(private translate: TranslateService) {
     // translate.setDefaultLang('en');
     if("language" in localStorage) {
     this.lang = localStorage.getItem('language');
       translate.use(this.lang)
     } else {
       translate.use(this.translate.defaultLang);
       }
  }
}
