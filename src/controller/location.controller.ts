import LocationService from "../services/location.service"
import { app } from "../infra/firebase-config"
import { collection, getFirestore } from 'firebase/firestore'

const firestore = getFirestore(app)

// locales é o nome da coleção do Firestore
export const localesCollection = collection(firestore, 'locales')

export default class LocationController {
    public constructor(
        private readonly locationService: LocationService
    ) {}

    public async createLocation(req: any, res: any) {
        const {
            name = null,
            crop_name = null,
            latitude,
            longitude,
            temperature = null,
            temperature_min = null,
            temperature_max = null,
            rainfall = null,
            rainfall_min = null,
            rainfall_max = null,
            humidity = null,
            humidity_min = null,
            humidity_max = null
        } = req.body
    
        if (!latitude || !longitude) {
            return res.status(400).send('Latitude and longitude are required')
        }
    
        const location = {
            name,
            crop_name,
            latitude,
            longitude,
            temperature,
            temperature_min,
            temperature_max,
            rainfall,
            rainfall_min,
            rainfall_max,
            humidity,
            humidity_min,
            humidity_max
        }
    
        try {
            await this.locationService.createLocation(location)
            res.status(201).send('Location created successfully')
        } catch (error) {
            console.error(error)
            res.status(500).send('Failed to create location')
        }
    }
    
    public async getAllLocations(req: any, res: any) {
        try {
            const locations = await this.locationService.getAllLocations()
            res.send(locations)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }

    public async getLocationById(req: any, res: any) {
        const id = req.params.id
        if (!id) return res.status(400).send('ID is required')
        try {
            const location = await this.locationService.getLocationById(id)
            if (!location) return res.status(404).send('Location not found')
            res.send(location)
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }

    public async deleteLocation(req: any, res: any) {
        const id = req.params.id
        if (!id) return res.status(400).send('ID is required')
        try {
            await this.locationService.deleteLocation(id)
            res.status(204).send('Location deleted')
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }

    public async updateLocation(req: any, res: any) {
        const id = req.params.id
        const { latitude, longitude, name, crop_name, temperature, humidity } = req.body
        const location = { latitude, longitude, name, crop_name, temperature, humidity }
        if (!id || !location) return res.status(400).send('ID and location data are required')

        try {
            await this.locationService.updateLocation(id, location)
            res.status(200).send('Location updated successfully')
        } catch (error) {
            console.error(error)
            res.status(500).send(error)
        }
    }
}
