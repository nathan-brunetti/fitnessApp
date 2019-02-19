import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <h1>Welcome Home!</h1>
  `,
  styles: [`
    h1 {text-align: center;}
  `]
})

export class HomeComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
  }
}
