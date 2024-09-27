import { Router } from 'express'
import { WeatherController } from '../controller'
import { LocationService } from '../services'

export const weatherRouter = Router()

const locationService = new LocationService()
const weatherController = new WeatherController(locationService)

weatherRouter.post('/updateWeather', async (req, res) => {
    await weatherController.updateWeatherData(req, res)
})
