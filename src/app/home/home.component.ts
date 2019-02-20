import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styles: [`
    h1 {text-align: center;}

    .hero {width: 100%;}
  `]
})

export class HomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
}
