import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  templateUrl: "./confirmation.component.html",
  styleUrls: ["./confirmation.component.css"]
})
export class ConfirmationComponent {
  constructor(public router: Router) { }
 
}
