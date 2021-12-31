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
  values = {
    ph: 7,
    turbidity: 8,
  };
  ngOnInit(): void {
    this.mqtt.getValues().subscribe(
      (data) => (this.values = data),
      (err) => console.log(err)
    );
  }
}
