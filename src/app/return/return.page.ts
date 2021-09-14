import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.queryParams.subscribe(params => {
      const code = params.code;
      const state = params.state;

      //console.log(code);
      //console.log(state);

      const httpOptions = {
        headers: new HttpHeaders({
          authorization: 'Bearer ' + code,
        }),
      };
    });


  }

}
