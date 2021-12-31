import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Observable } from 'rxjs';
import { Values } from './Values';
@Injectable({
  providedIn: 'root',
})
export class MqttService {
  mqttbroker = 'broker.hivemq.com';
  values!: any;
  private client: any;
  constructor() {
    this.client = new Paho.MQTT.Client(
      this.mqttbroker,
      Number(8000),
      'sankar1'
    );
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.connect({ onSuccess: this.onConnect.bind(this) });
  }
  onConnect() {
    console.log('onConnect');
    this.client.subscribe('home/kitchen/temperature');
    //this.client.subscribe('wxstation/wind_direction');
  }
  onConnectionLost(responseObject: any) {
    if (responseObject.errorCode !== 0) {
      console.log('onConnectionLost:' + responseObject.errorMessage);
    }
  }
  onMessageArrived(message: any) {
    console.log(
      'onMessageArrived: ' +
        message.destinationName +
        ': ' +
        message.payloadString
    );
    this.values.ph = Number(message.payloadString);
    this.values.turbidity = Number(message.payloadString);
  }
  getValues(): Observable<Values> {
    return this.values;
  }
}
