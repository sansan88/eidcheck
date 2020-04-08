import {
  ApiService
} from './../api.service';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  LoadingController,
  NavController,
  AlertController,
  ToastController,
  Platform
} from '@ionic/angular';

//Capacitor
import {
  Plugins
} from '@capacitor/core';
const {
  Browser,
  Storage

} = Plugins;

@Component({
  selector: 'app-return',
  templateUrl: './return.page.html',
  styleUrls: ['./return.page.scss'],
})
export class ReturnPage implements OnInit {

  constructor(

    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private loadingController: LoadingController,
    private navCtrl: NavController,
    private alertController: AlertController,
    private toastController: ToastController,
    private plt: Platform
  ) {

    this.route.queryParams.subscribe(async params => {

      const loading = await this.loadingController.create({
        message: 'Please wait...'
      });
      await loading.present();
  
      if (params && params.code) {
      
        var isWeb = true;
        if (this.plt.is("cordova")) {
          isWeb = false;
        }

        let check = await this.getObject("check") || {};

        console.log("Data from Storage: " + JSON.stringify(check));

        if (check.checkType.includes("alter")){
          this.api.geteIDDataAge(params.code, "token", isWeb).subscribe(eidDaten => {

            console.log("EID AGE DATA :" + JSON.stringify(eidDaten));
  
            this.navCtrl.navigateForward('/home', {
              state: {
                eIDData: eidDaten,
                check:   check
              }
            }).then(routerSuccess => {
              this.clear();
              loading.dismiss();
              console.log("navigation done!");
            }, error => {
              this.clear();
              console.error(error);
              loading.dismiss();
              this.navCtrl.navigateForward('/home');
            });
          }, error => {
            this.clear();
            console.error(error);
            loading.dismiss();
            this.navCtrl.navigateForward('/home');
          });

/*
* Kurzarbeit
*/                    
        }else if (check.checkType.includes("kurzarbeit")){
          this.api.geteIDData(params.code, "token", isWeb, check.claims).subscribe(eidDaten => {

            console.log("EID DATA :" + JSON.stringify(eidDaten));
  
            this.navCtrl.navigateForward('/kurzarbeit', {
              state: {
                eIDData: eidDaten,
                check:   check
              }
            }).then(routerSuccess => {
              this.clear();
              loading.dismiss();
              console.log("navigation done!");
            }, error => {
              this.clear();
              console.error(error);
              loading.dismiss();
              this.navCtrl.navigateForward('/kurzarbeit');
            });
          }, error => {
            this.clear();
            console.error(error);
            loading.dismiss();
            this.navCtrl.navigateForward('/kurzarbeit');
          });

        }else{
/*
* Allgemein eID+ check
*/          
          
          this.api.geteIDData(params.code, "token", isWeb, check.claims).subscribe(eidDaten => {

            console.log("EID DATA :" + JSON.stringify(eidDaten));
  
            this.navCtrl.navigateForward('/home', {
              state: {
                eIDData: eidDaten,
                check:   check
              }
            }).then(routerSuccess => {
              this.clear();
              loading.dismiss();
              console.log("navigation done!");
            }, error => {
              this.clear();
              console.error(error);
              loading.dismiss();
              this.navCtrl.navigateForward('/home');
            });
          }, error => {
            this.clear();
            console.error(error);
            loading.dismiss();
            this.navCtrl.navigateForward('/home');
          });
        }
      }else{
        this.clear();
        loading.dismiss();
        this.navCtrl.navigateForward('/home');
      }
    });
  }

  ngOnInit() {}

  
  // JSON "set" example
  async setObject(key, object) {
    await Storage.set({
      key: key,
      value: JSON.stringify(object)
    });
  }

  // JSON "get" example
  async getObject(key) {
    const ret = await Storage.get({
      key: key
    });
    const data = JSON.parse(ret.value);
    return data;
  }

  async clear() {
    await Storage.clear();
  }


}