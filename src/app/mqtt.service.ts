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

  //private _saveUrl = 'https://biotorr.herokuapp.com/values/save';
  private _saveUrl = '/values/save';
  private client: any;
  topicName = ['']; //topic array
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
    this.topicNames();
    this.subscribeToTopic();
  }
  topicNames() {
    this.topicName[0] = 'kardle/biotorr/agitation';
    this.topicName[1] = 'kardle/biotorr/aqi';
    this.topicName[2] = 'kardle/biotorr/aqi/status';
    this.topicName[3] = 'kardle/biotorr/coolingFan';
    this.topicName[4] = 'kardle/biotorr/disOxygen';
    this.topicName[5] = 'kardle/biotorr/hpa';
    this.topicName[6] = 'kardle/biotorr/tankTemp';
    this.topicName[7] = 'kardle/biotorr/cabinTemp';
    this.topicName[8] = 'kardle/biotorr/temp/status';
    this.topicName[9] = 'kardle/biotorr/ph';
    this.topicName[10] = 'kardle/biotorr/turbidity';
    this.topicName[11] = 'kardle/biotorr/turbidity/status';
    this.topicName[12] = 'kardle/biotorr/uv/status';
    this.topicName[13] = 'kardle/biotorr/coolingFan/status';
    this.topicName[14] = 'kardle/biotorr/ph/status';
  }
  ngOnInit(): void {}
  topic(i: number): Observable<IMqttMessage> {
    // let topicName = `/${this.endpoint}/${deviceId}`;
    return this.mqtt.observe(this.topicName[i]);
  }
  private subscribeToTopic() {
    for (let i = 0; i < this.topicName.length; i++) {
      this.subscription = this.topic(i).subscribe((data: IMqttMessage) => {
        let message = JSON.parse(data.payload.toString());
        //console.log(message);
        //this.events.push(item);
        if (i === 0) {
          this.values.agitation = Number(message);
        } else if (i === 1) {
          this.values.aqi.value = Number(message);
        } else if (i === 2) {
          this.values.aqi.status = message;
          //this.values.aqi.status = message.payloadString;
        } else if (i === 3) {
          this.values.coolingFan.value = Number(message);
        } else if (i === 4) {
          this.values.disOxygen.value = Number(message);
        } else if (i === 5) {
          this.values.hpa = Number(message);
        } else if (i === 6) {
          this.values.temp.tankTemp = Number(message);
        } else if (i === 7) {
          this.values.temp.cabinTemp = Number(message);
        } else if (i === 8) {
          this.values.temp.status = message;
          //this.values.temp.status = message.payloadString;
        } else if (i === 9) {
          this.values.ph.value = Number(message);
        } else if (i === 10) {
          this.values.turbidity.value = Number(message);
        } else if (i === 11) {
          this.values.turbidity.status = message;
          //this.values.turbidity.status = message.payloadString;
        } else if (i === 12) {
          this.values.uv.status = message;
          //this.values.uv.status = message.payloadString;
        } else if (i === 13) {
          this.values.coolingFan.status = message;
          //this.values.coolingFan.status = message.payloadString;
        } else if (i === 14) {
          this.values.ph.status = message;
          //this.values.ph.status = message.payloadString;
        }

        this.valueCheck();
        this.user_id = this.auth.getUserId();
        //console.log(this.user_id);
        // console.log(this.values);
        this.saveValues(this.values, this.user_id).subscribe((err) =>
          console.log(err)
        );
      });
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

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
