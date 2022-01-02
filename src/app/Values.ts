export interface Values {
  ph: { value: number; status: boolean };
  temp: { tankTemp: number; cabinTemp: number; status: boolean };
  turbidity: { value: number; status: boolean };
  disOxygen: {value:number;status:boolean};
  agitation: number;
  coolingFan: { value: number; status: boolean };
  aqi: { value: number; status: boolean };
  hpa: number;
  uv: { value:number;status: boolean };
}
