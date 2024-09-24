export default class Location {
  private id: string
  private name: string
  private crop_name: string
  private latitude: number
  private longitude: number
  private temperature: number
  private temperature_min: number
  private temperature_max: number
  private rainfall: number
  private rainfall_min: number
  private rainfall_max: number
  private humidity: number
  private humidity_min: number
  private humidity_max: number

  constructor(
    id: string,
    name: string,
    crop_name: string,
    latitude: number,
    longitude: number,
    temperature: number,
    temperature_min: number,
    temperature_max: number,
    rainfall: number,
    rainfall_min: number,
    rainfall_max: number,
    humidity: number,
    humidity_min: number,
    humidity_max: number
  ) {
    this.id = id
    this.name = name
    this.crop_name = crop_name
    this.latitude = latitude
    this.longitude = longitude
    this.temperature = temperature
    this.temperature_min = temperature_min
    this.temperature_max = temperature_max
    this.rainfall = rainfall
    this.rainfall_min = rainfall_min
    this.rainfall_max = rainfall_max
    this.humidity = humidity
    this.humidity_min = humidity_min
    this.humidity_max = humidity_max
  }

  public getId(): string {
    return this.id
  }

  public setId(id: string): void {
    this.id = id
  }

  public getName(): string {
    return this.name
  }

  public setName(name: string): void {
    this.name = name
  }

  public getCropName(): string {
    return this.crop_name
  }

  public setCropName(crop_name: string): void {
    this.crop_name = crop_name
  }

  public getLatitude(): number {
    return this.latitude
  }

  public setLatitude(latitude: number): void {
    this.latitude = latitude
  }

  public getLongitude(): number {
    return this.longitude
  }

  public setLongitude(longitude: number): void {
    this.longitude = longitude
  }

  public getTemperature(): number {
    return this.temperature
  }

  public setTemperature(temperature: number): void {
    this.temperature = temperature
  }

  public getTemperatureMin(): number {
    return this.temperature_min
  }

  public setTemperatureMin(temperature_min: number): void {
    this.temperature_min = temperature_min
  }

  public getTemperatureMax(): number {
    return this.temperature_max
  }

  public setTemperatureMax(temperature_max: number): void {
    this.temperature_max = temperature_max
  }

  public getRainfall(): number {
    return this.rainfall
  }

  public setRainfall(rainfall: number): void {
    this.rainfall = rainfall
  }

  public getRainfallMin(): number {
    return this.rainfall_min
  }

  public setRainfallMin(rainfall_min: number): void {
    this.rainfall_min = rainfall_min
  }

  public getRainfallMax(): number {
    return this.rainfall_max
  }

  public setRainfallMax(rainfall_max: number): void {
    this.rainfall_max = rainfall_max
  }

  public getHumidity(): number {
    return this.humidity
  }

  public setHumidity(humidity: number): void {
    this.humidity = humidity
  }

  public getHumidityMin(): number {
    return this.humidity_min
  }

  public setHumidityMin(humidity_min: number): void {
    this.humidity_min = humidity_min
  }

  public getHumidityMax(): number {
    return this.humidity_max
  }

  public setHumidityMax(humidity_max: number): void {
    this.humidity_max = humidity_max
  }
}
