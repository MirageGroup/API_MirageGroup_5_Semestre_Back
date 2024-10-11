import { updateDoc, doc, getFirestore } from 'firebase/firestore'
import { app } from '../infra'
import { LocationService, OpenWeatherService } from '../services'

const firestore = getFirestore(app)

export default class WeatherController {
    private openWeatherService: OpenWeatherService

    constructor(private readonly locationService: LocationService) {
        this.openWeatherService = new OpenWeatherService()
    }

    // Atualiza temperatura e humidade a partir da API
    public async updateWeatherData(req: any, res: any) {
        const { latitude, longitude, id, temperature_min, temperature_max, humidity_min, humidity_max } = req.body

        if (!latitude || !longitude || !id) {
            return res.status(400).send('Latitude, longitude, and location ID are required')
        }

        try {
            const weatherData = await this.openWeatherService.fetchWeatherData(latitude, longitude)

            // Converter temperatura para Celsius
            const currentTemperatureC = this.openWeatherService.convertKelvinToCelsius(weatherData.main.temp)
            const formatedTemperture = currentTemperatureC.toFixed(0)
            const humidity = weatherData.main.humidity

            // ALERTAS de extremidades climaticas
            let alerts: string[] = []

            if (temperature_min && currentTemperatureC < temperature_min) {
                alerts.push(`Temperatura mínima abaixo do limite: ${formatedTemperture}°C`)
            }
            if (temperature_max && currentTemperatureC > temperature_max) {
                alerts.push(`Temperatura máxima acima do limite: ${formatedTemperture}°C`)
            }
            if (humidity_min && humidity < humidity_min) {
                alerts.push(`Umidade mínima está abaixo do limite: ${humidity}%`)
            }
            if (humidity_max && humidity > humidity_max) {
                alerts.push(`Umidade máxima está acima do limite: ${humidity}%`)
            }

            const locationDoc = doc(firestore, 'locales', id)
            await updateDoc(locationDoc, {
                temperature: currentTemperatureC,
                humidity,
                alerts
            })

            // ALERTAS para o front-end
            res.status(200).send({
                temperature: formatedTemperture,
                humidity,
                alerts
            })
        } catch (error) {
            console.error('Failed to update location weather data', error)
            res.status(500).send('Failed to update weather data')
        }
    }
}
