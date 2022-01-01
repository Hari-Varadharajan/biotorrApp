import { Component, OnInit } from '@angular/core';
import { MqttService } from '../mqtt.service';
import { Values } from '../Values';
import { NavigationExtras, Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private mqtt: MqttService, private router: Router) {}
  values!: Values;
  ngOnInit(): void {
    this.values = this.mqtt.values;
  }
  uipage(n: number) {
    const navigationExtras: NavigationExtras = {
      state: { slide: n },
    };
    this.router.navigate(['uipages'], navigationExtras);
  }
}
