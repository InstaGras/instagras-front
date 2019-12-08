import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  userList : any[];

  constructor(
    private UserDataService: UserdataService
  ){}

  ngOnInit() {
    this.initUserList();
  }

  initUserList() {
    this.userList=[];
    this.UserDataService.getAllUsers()
    .subscribe(success => {
      success.data.users.forEach(element => {
        const user = {
          username: element.username
        }
        this.userList.push(user);
      });
      this.userList.sort((a, b) => a.username.localeCompare(b.username));
    },
    error => {
      console.log(error);
    });
  }

  openProfilePage(username: string){
    console.log("Ouverture de la page de profile de "+username);
  }

}
