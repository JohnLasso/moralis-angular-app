import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Moralis } from 'moralis';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { User } from './user.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  title = 'Brain Network';




  constructor(private moralisService: AuthService) {

    this.moralisService
      .startMoralis()
      .subscribe(() => console.log('Started Moralis'));

      const unsubscribe = Moralis.onAccountChanged((chain) => {
        console.log(chain);
        // returns the new account --> ex. "0x1a2b3c4d..."
      });

  if(!Moralis.isWeb3Enabled()) {
    const web3Provider =  this.enableWeb3();
    console.log(web3Provider);
  }

}

async enableWeb3() {
  // Get a (ethers.js) web3Provider
const web3Provider = await Moralis.enableWeb3();
return web3Provider;
}
}
