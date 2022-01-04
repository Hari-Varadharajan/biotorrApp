import { Injectable, OnInit } from '@angular/core';
import { Paho } from 'ng2-mqtt/mqttws31';
import { Observable } from 'rxjs';
import { Values } from './Values';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { ObjectId } from 'mongoose';
import { Subscription } from 'rxjs';
import { IMqttMessage, MqttService as mqttService } from 'ngx-mqtt';

@Injectable({
  providedIn: 'root',
})
export class MqttService implements OnInit {
  mqttbroker = 'broker.hivemq.com';
  private user_id!: ObjectId;
  values!: Values;

  subscription: Subscription = new Subscription();
  private _saveUrl = 'https://biotorr.herokuapp.com/values/save';
  private client: any;

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private mqtt: mqttService
  ) {
    // this.client = new Paho.MQTT.Client(
    //   this.mqttbroker,
    //   Number(8000),
    //   'sankar1'
    // );
    // this.client.onMessageArrived = this.onMessageArrived.bind(this);
    // this.client.onConnectionLost = this.onConnectionLost.bind(this);
    // this.client.connect({ onSuccess: this.onConnect.bind(this) });

    this.values = {
      ph: { value: 7, status: false },
      turbidity: { value: 8, status: false },
      agitation: 0,
      disOxygen: { value: 0, status: false },
      aqi: { value: 0, status: false },
      temp: { tankTemp: 0, cabinTemp: 0, status: false },
      uv: { value: 0, status: false },
      hpa: 0,
      coolingFan: { value: 0, status: false },
    };
    this.subscribeToTopic();
  }
  ngOnInit(): void {}
  topic(): Observable<IMqttMessage> {
    // let topicName = `/${this.endpoint}/${deviceId}`;
    let topicName = 'home/kitchen/temperature';
    return this.mqtt.observe(topicName);
  }
  private subscribeToTopic() {
    this.subscription = this.topic().subscribe((data: IMqttMessage) => {
      let message = JSON.parse(data.payload.toString());
      console.log(message);
      //this.events.push(item);
      this.values.agitation = Number(message);
      this.values.disOxygen.value = Number(message);
      this.values.aqi.value = Number(message);
      //this.values.aqi.status = message.payloadString;

      this.values.hpa = Number(message);
      this.values.temp.tankTemp = Number(message);
      this.values.temp.cabinTemp = Number(message);
      //this.values.temp.status = message.payloadString;
      this.values.ph.value = Number(message);
      //this.values.ph.status = message.payloadString;
      //this.values.coolingFan.status = message.payloadString;
      this.values.coolingFan.value = Number(message);

      this.values.turbidity.value = Number(message);
      //this.values.turbidity.status = message.payloadString;
      //this.values.uv.status = message.payloadString;
      this.valueCheck();
      this.user_id = this.auth.getUserId();
      //console.log(this.user_id);
      this.saveValues(this.values, this.user_id).subscribe(
        (res) => console.log(res),
        (err) => console.log(err)
      );
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  // onConnect() {
  //   console.log('onConnect');
  //   this.client.subscribe('home/kitchen/temperature');
  //   //this.client.subscribe('wxstation/wind_direction');
  // }
  // onConnectionLost(responseObject: any) {
  //   if (responseObject.errorCode !== 0) {
  //     console.log('onConnectionLost:' + responseObject.errorMessage);
  //   }
  // }
  // onMessageArrived(message: any) {
  //   console.log(
  //     'onMessageArrived: ' +
  //       message.destinationName +
  //       ': ' +
  //       message.payloadString
  //   );
  // if (message.destinationName.indexOf('wind_speed') !== -1) {
  //   this.windSpeed = Number(message.payloadString);
  // }

  // }
  valueCheck() {
    if (this.values.coolingFan.value > 38) {
      this.values.coolingFan.status = true;
    } else this.values.coolingFan.status = false;

    if (this.values.disOxygen.value > 50) {
      this.values.disOxygen.status = true;
    } else this.values.disOxygen.status = false;

    if (this.values.ph.value <= 4) this.values.ph.status = true;
    else this.values.ph.status = false;
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
