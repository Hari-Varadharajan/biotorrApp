export interface Values {
  ph: { value: number; status: boolean };
  temp: { tankTemp: number; cabinTemp: number; status: boolean };
  turbidity: { value: number; status: boolean };
  disOxygen: number;
  agitation: number;
  coolingFan: { value: number; status: boolean };
  aqi: { value: number; status: boolean };
  hpa: number;
  uv: { status: boolean };
}
