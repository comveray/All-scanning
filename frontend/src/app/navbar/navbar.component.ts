import { environment } from './../../environments/environment'
import { ChallengeService } from './../Services/challenge.service'
import { UserService } from './../Services/user.service'
import { AdministrationService } from './../Services/administration.service'
import { ConfigurationService } from './../Services/configuration.service'
import { Component, OnInit, NgZone } from '@angular/core'
import { CookieService } from 'ngx-cookie'
import { Router } from '@angular/router'
import { languages } from './languages'
import { faSearch, faSignInAlt, faComment, faBomb, faTrophy, faInfoCircle, faShoppingCart, faUserSecret, faRecycle, faMapMarker, faUserCircle, faFlask, faLanguage } from '@fortawesome/fontawesome-free-solid'
import fontawesome from '@fortawesome/fontawesome'
import { TranslateService } from '@ngx-translate/core'
fontawesome.library.add(faLanguage, faFlask, faSearch, faSignInAlt, faComment, faBomb, faTrophy, faInfoCircle, faShoppingCart, faUserSecret, faRecycle, faMapMarker, faUserCircle)
import * as io from 'socket.io-client'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public userEmail = ''
  public languages = languages
  public selectedLanguage = 'English'
  public version = ''
  public applicationName = 'OWASP Juice Shop'
  public gitHubRibbon = 'orange'
  public logoSrc = 'assets/public/images/JuiceShop_Logo.svg'
  public socket
  public scoreBoardVisible = false

  constructor (private administrationService: AdministrationService, private challengeService: ChallengeService,
    private configurationService: ConfigurationService,private userService: UserService, private ngZone: NgZone,
    private cookieService: CookieService, private router: Router,private translate: TranslateService) { }

  ngOnInit () {

    this.administrationService.getApplicationVersion().subscribe((version: any) => {
      if (version) {
        this.version = 'v' + version
      }
    })

    this.configurationService.getApplicationConfiguration().subscribe((config: any) => {
      if (config && config.application && config.application.name !== null) {
        this.applicationName = config.application.name
      }
      if (config && config.application && config.application.gitHubRibbon !== null) {
        this.gitHubRibbon = config.application.gitHubRibbon !== 'none' ? config.application.gitHubRibbon : null
      }

      let logo: string = config.application.logo

      if (logo.substring(0, 4) === 'http') {
        logo = decodeURIComponent(logo.substring(logo.lastIndexOf('/') + 1))
        this.logoSrc = 'assets/public/images/' + logo
      }
    })

    this.userService.getLoggedInState().subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.updateUserEmail()
      } else {
        this.userEmail = ''
      }
    })

    this.getScoreBoardStatus()

    this.ngZone.runOutsideAngular(() => {
      this.socket = io.connect(environment.hostServer)
      this.socket.on('challenge solved', (data) => {
        this.getScoreBoardStatus()
      })
    })
  }

  search (value: string) {
    if (value) {
      const queryParams = { queryParams: { q: value } }
      this.router.navigate(['/search'], queryParams)
    } else {
      this.router.navigate(['/search'])
    }
  }

  updateUserEmail () {
    this.userService.whoAmI().subscribe((user: any) => {
      this.userEmail = user.email
    },(err) => console.log(err))
  }

  isLoggedIn () {
    return localStorage.getItem('token')
  }

  logout () {
    localStorage.removeItem('token')
    this.cookieService.remove('token', { domain: document.domain })
    delete sessionStorage.bid
    this.userService.isLoggedIn.next(false)
    this.router.navigate(['/'])
  }

  changeLanguage (langKey) {
    this.translate.use(langKey)
  }

  getScoreBoardStatus () {
    this.challengeService.find({ name: 'Score Board' }).subscribe((challenges: any) => {
      this.ngZone.run(() => {
        this.scoreBoardVisible = challenges[0].solved
      })
    }, (err) => console.log(err))
  }

}
