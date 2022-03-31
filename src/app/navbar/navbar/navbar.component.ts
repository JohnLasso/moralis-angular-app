import {ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnInit} from '@angular/core';
import Moralis from 'moralis';
import {AuthService} from '../../services/auth.service';
import {User} from "../../user.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  panelOpenState = false;
  public userOb = this.moralisService.observeUser();


  constructor(private moralisService: AuthService) {
    //this.moralisService.startMoralis().subscribe(() => console.log('Started Moralis'));
    // Subscribe to onChainChanged events
  }

  public login(): void {
    this.moralisService.login();
  }

  public logout(): void {
    this.moralisService.logout();
  }

  ngOnInit(): void {
this.moralisService.changeEvents();
  }

}
