import axios from 'axios'

const API_KEY_OPEN_WEATHER: any = process.env.API_KEY_OPEN_WEATHER

export default class OpenWeatherService {
    private readonly baseUrl: string

    constructor() {
        this.baseUrl = 'https://api.openweathermap.org/data/2.5/weather'
    }

    public async fetchWeatherData(lat: number, lon: number) {
        try {
            const response = await axios.get(`${this.baseUrl}`, {
                params: {
                    lat,
                    lon,
                    appid: API_KEY_OPEN_WEATHER
                }
            })

            return response.data
        } catch (error) {
            console.error('Error fetching weather data', error)
            throw error
        }
    }

    public convertKelvinToCelsius(kelvin: number) {
        return kelvin - 273.15
    }
}
