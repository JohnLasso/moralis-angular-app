import {ApplicationRef, Injectable} from '@angular/core';
import Moralis from 'moralis';
import User = Moralis.User;

@Injectable()
export class AuthService {
  private user: Moralis.User | undefined;
  constructor(private ref: ApplicationRef) { }

  login(provider: 'metamask' | 'walletconnect' = 'metamask'): void {
    (provider === 'metamask'
      ? Moralis.Web3.authenticate()
      : Moralis.Web3.authenticate({ provider }))
      .then((loggedInUser: Moralis.User<Moralis.Attributes> | undefined) => this.setLoggedInUser(loggedInUser))
      .catch((e: any) => console.error(`Moralis '${provider}' login error:`, e));
  }

  logout(): void {
    Moralis.User.logOut()
      .then((loggedOutUser) => console.log('logout', loggedOutUser))
      // Set user to undefined
      .then(() => this.setLoggedInUser(undefined))
      // Disconnect Web3 wallet
      .then(() => Moralis.Web3.cleanup())
      .catch((e) => console.error('Moralis logout error:', e));
  }

  public setLoggedInUser(loggedInUser?: User): void {
    this.user = loggedInUser;
    console.log('Loggedin user:', loggedInUser);
    /**
     * Manual detect changes due to OnPush change detection.
     * This can be eliminated if you use async pipe and Observables
     * (out of scope of this demo)
     */
    this.ref.tick();
  }

  getUser( user: Moralis.User): Moralis.User {
    let theUser = user;
    return theUser;
  }


}
