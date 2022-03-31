import {
  Injectable,
} from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import Moralis from 'moralis';
import { BehaviorSubject, defer, from, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User = Moralis.User;

@Injectable()
export class AuthService {
  private userBS = new BehaviorSubject<Moralis.User | undefined>(undefined);
  private chainIdnew = new BehaviorSubject<string | null>("undefined");

  public observeUser(): Observable<Moralis.User | undefined> {
    return this.userBS.asObservable();
  }

  constructor() {
    this.changeEvents();
  }

  public startMoralis() {
  
    return defer(() =>
      from(
        Moralis.start({
          appId: environment.moralis.appId,
          serverUrl: environment.moralis.serverUrl,
        }).then(() => {this.userBS.next(Moralis.User.current()), console.log(Moralis.User.current())})
      )
    );
  }


  async changeEvents(provider: 'metamask' = 'metamask') {
    const onAcc = Moralis.onAccountChanged((chain) => {
      console.log(chain);
      this.logout();
      window.location.reload();
      this.login();
    });
  }

  async login(provider: 'metamask' | 'walletconnect' = 'metamask'):Promise<void> {
let user = Moralis.User.current();
    (provider === 'metamask' && !user
      ? Moralis.authenticate()
      : Moralis.authenticate({ provider })
    )
      .then((loggedInUser: Moralis.User<Moralis.Attributes> | undefined) => {
        this.userBS.next(loggedInUser);
        console.log(user?.get("ethAddress"));
      }
     
      )
      .catch((e: any) =>
        console.error(`Moralis '${provider}' login error:`, e)
      );
      const chainId = await Moralis.chainId;
console.log(chainId); // 56
  }

  logout(): void {
    Moralis.User.logOut()
      .then((loggedOutUser) => console.log('logout', loggedOutUser))
      // Set user to undefined
      .then(() => this.userBS.next(undefined))
      // Disconnect Web3 wallet
      .then(() => Moralis.cleanup())
      .catch((e) => console.error('Moralis logout error:', e));
  }
}
