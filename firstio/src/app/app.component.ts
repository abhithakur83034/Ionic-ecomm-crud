import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  user: any;
  userData: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.user = localStorage.getItem('user');
    this.userData = this.user ? JSON.parse(this.user) : null;
    console.log(!this.userData);

    if (this.userData == null) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['']);
    }
  }
}
