import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent {
  userName: string = "";
  isChecked: boolean = false;
  needToApplyGlobalListner: boolean = false;
  handler: any = null;
  private boundHideCallback: any;

  constructor(public router: Router) { }
  changeRoute() {
    this.router.navigateByUrl("/route");
  }
  onhidePopup(e) {
    if (this.needToApplyGlobalListner) {
      this.isChecked = false;
      this.needToApplyGlobalListner = false;
      this.removeScrollLiteners(); // Stop listening for events.
    } else {
      this.needToApplyGlobalListner = true;
    }
  }

  /**
   * Remove the event listeners.
   */
  private removeScrollLiteners() {
    document.removeEventListener("click", this.boundHideCallback);
  }
  getUserTag(user: string): string {
    return user.charAt(0);
  }
  onPopup() {
    this.isChecked = true;

    this.boundHideCallback = this.onhidePopup.bind(this);

    document.addEventListener("click", this.boundHideCallback);
  }
  clickedInside($event: Event) {
    $event.preventDefault();
    $event.stopPropagation(); // <- that will stop propagation on lower layers
  }
  onLogOut() {
    this.router.navigateByUrl("/login");
  }
  settings() {
    this.router.navigateByUrl("/settings/rules")
  }
  home() {
    this.router.navigateByUrl("/route")
  }
}
