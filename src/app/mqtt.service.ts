import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Observable } from 'rxjs';
import { Values } from './Values';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class MqttService {
  mqttbroker = 'broker.hivemq.com';
  values: Values;
  private _saveUrl = 'http://localhost:3000/values/save';
  private client: any;
  constructor(private http: HttpClient) {
    this.client = new Paho.MQTT.Client(
      this.mqttbroker,
      Number(8000),
      'sankar1'
    );
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.connect({ onSuccess: this.onConnect.bind(this) });
    this.values = { ph: 7, turbidity: 8 };
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
    // if (message.destinationName.indexOf('wind_speed') !== -1) {
    //   this.windSpeed = Number(message.payloadString);
    // }

    this.values.ph = Number(message.payloadString);
    this.values.turbidity = Number(message.payloadString);
    this.saveValues(this.values);
    this.saveValues(this.values).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  saveValues(values: Values) {
    return this.http.post(this._saveUrl, values, { responseType: 'text' });
    //console.log('hello');
  }
}
