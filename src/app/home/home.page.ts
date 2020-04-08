import {
  Platform,
  NavController
} from '@ionic/angular';
import {
  ApiService
} from './../api.service';
import {
  Component
} from '@angular/core';
import {
  AlertController
} from '@ionic/angular';

import {
  Router,
  ActivatedRoute
} from '@angular/router';


//Capacitor
import {
  Plugins
} from '@capacitor/core';
const {
  Browser,
  Storage

} = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public data: any;
  public check: any;
  constructor(
    public router: Router,
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private api: ApiService,
    private plt: Platform) {

    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {


        this.data = this.router.getCurrentNavigation().extras.state.eIDData;
        this.check = this.router.getCurrentNavigation().extras.state.check;



      }
    });

  }
  

  checkAlterAllgemein() {
    this.setObject("check", {
      "checkType": "alterAllgemein",
      "claims": ["birth_date", "picture"]
    });
    this.checkIdentity(["birth_date", "picture"]);
  }

  checkAlter18() {
    this.setObject("check", {
      "checkType": "alter18",
      "claims": ["birth_date", "picture"]
    });
    this.checkIdentity(["birth_date", "picture"]);
  }

  checkAlter16() {
    this.setObject("check", {
      "checkType": "alter16",
      "claims": ["birth_date", "picture"]
    });
    this.checkIdentity(["birth_date", "picture"]);
  }

  checkIdentity(claims) {
    var isWeb = true;
    if (this.plt.is("cordova")) {
      isWeb = false;
    }
    this.api.geteIDAuthorizationURL(isWeb, claims.toString()).subscribe(data => {

      //console.log("received token: " + data["token"]);

      if (isWeb) {
        this.openBrowser(data["url"]);
        //this.presentModalQRCode(data["url"], "QR-Code mit eID scannen");
      } else {
        this.openBrowser(data["url"]);
      }

    }, error => {
      console.error(JSON.stringify(error));
    });

  }

  async openBrowser(url) {

    await Browser.open({
      url: url,
      //presentationStyle: "popover",
      windowName: "_self"
    }).catch(rejected => {
      alert(JSON.stringify(rejected));
    });

  }
  async presentClaims() {
    const alert = await this.alertCtrl.create({
      header: 'eID+ Attribute',
      inputs: [{
          name: 'given_name',
          type: 'checkbox',
          label: 'Given name',
          value: 'given_name',
          checked: false
        },
        {
          name: 'family_name',
          type: 'checkbox',
          label: 'Family name',
          value: 'family_name',
          checked: false
        },
        {
          name: 'picture',
          type: 'checkbox',
          label: 'Picture',
          value: 'picture',
          checked: true
        },
        {
          name: 'birth_date',
          type: 'checkbox',
          label: 'Birth date',
          value: 'birth_date',
          checked: false
        },
        {
          name: 'gender',
          type: 'checkbox',
          label: 'Gender',
          value: 'gender',
          checked: false
        },
        {
          name: 'nationality',
          type: 'checkbox',
          label: 'Nationality',
          value: 'nationality',
          checked: false
        },
        {
          name: 'place_of_origin',
          type: 'checkbox',
          label: 'Place of origin',
          value: 'place_of_origin',
          checked: false
        },
        {
          name: 'phone',
          type: 'checkbox',
          label: 'Phone',
          value: 'phone',
          checked: false
        },
        {
          name: 'email',
          type: 'checkbox',
          label: 'Email',
          value: 'email',
          checked: false
        },
        {
          name: 'street_address',
          type: 'checkbox',
          label: 'Street address',
          value: 'street_address',
          checked: false
        },
        {
          name: 'postal_code',
          type: 'checkbox',
          label: 'Postal code',
          value: 'postal_code',
          checked: false
        },
        {
          name: 'locality',
          type: 'checkbox',
          label: 'Locality',
          value: 'locality',
          checked: false
        },
        {
          name: 'region',
          type: 'checkbox',
          label: 'Region',
          value: 'region',
          checked: false
        },
        {
          name: 'country',
          type: 'checkbox',
          label: 'Country',
          value: 'country',
          checked: false
        },
      ],
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          //console.log('Confirm Cancel');
        }
      }, {
        text: 'Ok',
        handler: (data) => {
          //console.log('Confirm Ok');
          //console.log(data);


          this.setObject("check", {
            "checkType": "eid",
            "claims": data
          });
          this.checkIdentity(data);
        }
      }]
    });

    await alert.present();
  }


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