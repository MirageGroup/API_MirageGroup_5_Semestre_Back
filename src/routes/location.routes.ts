import { Router } from "express"
import LocationService from "../services/location.service"
import { LocationController } from "../controller"

export const locationRouter = Router()

const locationService = new LocationService()
const locationController = new LocationController(locationService)

locationRouter.post('/create', async (req, res) => {
    await locationController.createLocation(req, res)
})

locationRouter.get('/all', async (req, res) => {
    await locationController.getAllLocations(req, res)
})

locationRouter.delete('/delete/:id', async (req,res) => {
    await locationController.deleteLocation(req, res)
})

locationRouter.get('/:id', async (req, res) => {
    await locationController.getLocationById(req, res)
})

locationRouter.patch('/:id', async (req, res) => {
    await locationController.updateLocation(req, res)
})
