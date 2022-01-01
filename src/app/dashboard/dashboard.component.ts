import { Component, OnInit } from '@angular/core';
import { MqttService } from '../mqtt.service';
import { Values } from '../Values';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private mqtt: MqttService) {}
  values!: Values;
  ngOnInit(): void {
    this.values = this.mqtt.values;
  }
}
