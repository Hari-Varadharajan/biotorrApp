import { Injectable } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Observable } from 'rxjs';
import { Values } from './Values';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ObjectId } from 'mongoose';
@Injectable({
  providedIn: 'root',
})
export class MqttService {
  mqttbroker = 'broker.hivemq.com';
  private user_id!: ObjectId;
  values: Values;
  private _saveUrl = 'http://localhost:3000/values/save';
  private client: any;
  constructor(private http: HttpClient, private auth: AuthService) {
    this.client = new Paho.MQTT.Client(
      this.mqttbroker,
      Number(8000),
      'sankar1'
    );
    this.client.onMessageArrived = this.onMessageArrived.bind(this);
    this.client.onConnectionLost = this.onConnectionLost.bind(this);
    this.client.connect({ onSuccess: this.onConnect.bind(this) });
    this.values = {
      ph: { value: 7, status: false },
      turbidity: { value: 8, status: false },
    };
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

    this.values.ph.value = Number(message.payloadString);
    this.values.turbidity.value = Number(message.payloadString);

    this.user_id = this.auth.getUserId();
    //console.log(this.user_id);
    this.saveValues(this.values, this.user_id).subscribe(
      (res) => console.log(res),
      (err) => console.log(err)
    );
  }
  saveValues(values: Values, user_id: ObjectId) {
    return this.http.post(
      this._saveUrl,
      { values, user_id },
      { responseType: 'text' }
    );
    //console.log('hello');
  }
}
