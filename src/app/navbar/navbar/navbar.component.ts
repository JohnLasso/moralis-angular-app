import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent implements OnInit {
  public auth: AuthService;

  constructor(authService: AuthService,
              private cdr: ChangeDetectorRef) {
    this.auth = authService; }

  ngOnInit(): void {
    this.cdr.detectChanges();
  }

}
