import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  id: number = null;
  user = {
    username: 'enki',
    firstname: 'Enki',
    lastname: 'Michel',
    firstFollowers: [
      'Alban',
      'Maxime',
      'Théo'
    ],
    countFollowers: 4,
    countPublications: 10,
    countSubscriptions: 3,
    bio: 'Je suis Enki',
    getUserIdentity() {
      return (
        ((this.firstname) ? this.firstname : '')
        + ' '
        + ((this.lastname) ? this.lastname : '')
      ).trim();
    }
  };

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id);
  }

}
