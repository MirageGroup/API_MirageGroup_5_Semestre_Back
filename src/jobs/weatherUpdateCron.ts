import cron from 'node-cron'
import { collection, doc, getDocs, updateDoc } from 'firebase/firestore'
import { firestore } from '../infra'
import { OpenWeatherService } from '../services'

interface Location {
    id: string
    name: string
    latitude: number
    longitude: number
    temperature?: number
    humidity?: number
}

const openWeatherService = new OpenWeatherService()

cron.schedule('*/1 * * * *', async () => {
    console.log('Cron job executado: Atualizando dados climáticos...')
    try {
        const localesSnapshot = await getDocs(collection(firestore, 'locales'))

        // Mapeando e aplicando a interface para garantir a tipagem correta
        const locales: Location[] = localesSnapshot.docs.map(doc => ({
            ...doc.data() as Location,
            id: doc.id
        }))

        for (const location of locales) {
            if (!location.latitude || !location.longitude) {
                console.error(`Latitude/Longitude missing for location ID: ${location.id}`)
                continue 
            }

            const weatherData = await openWeatherService.fetchWeatherData(location.latitude, location.longitude)

            const currentTemperatureC = openWeatherService.convertKelvinToCelsius(weatherData.main.temp)
            const formattedTemperature = currentTemperatureC.toFixed(2)
            const humidity = weatherData.main.humidity

            const previousTemperatureC = location.temperature !== undefined ? location.temperature : 'desconhecida'

            const locationDoc = doc(firestore, 'locales', location.id)
            await updateDoc(locationDoc, {
                temperature: parseFloat(formattedTemperature),
                humidity
            })

            console.log(`Localidade: ${location.name}`)
            console.log(`Temperatura anterior: ${previousTemperatureC}°C`)
            console.log(`Nova temperatura: ${formattedTemperature}°C`)
            console.log(`Humidade atual: ${humidity}%`)
            console.log('---')
        }
        console.log('--------------------')
    } catch (error) {
        console.error('Error updating weather data for locations', error)
    }
})
