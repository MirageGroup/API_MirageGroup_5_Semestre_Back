import LocationService from "services/location.service";
import { QueryFailedError } from "typeorm";

export default class LocationController {

    public constructor(
        private readonly locationService: LocationService
    ) { }


    public async createLocation(req: any, res: any) {
        const location = req.body;
        if (!location) return res.sendStatus(400, 'location is required');
        try {
            await this.locationService.createLocation(location)
                .then(() => res.sendStatus(201))
        }
        catch (error) {
            console.error(error)
            if (error instanceof QueryFailedError && error.message.includes('Duplicate entry')) {
                return res.sendStatus(409)
            }
            return res.status(500).send(error)
        }

    }


    public async getAllLocations(req: any, res: any) {
        try {
            const locations = await this.locationService.getAllLocations();
            return res.send(locations);
        }
        catch (error) {
            console.error(error)
            return res.status(500).send(error)
        }
    }

    public async getLocationById(req: any, res: any) {
        const id = req.params.id;
        if (!id) return res.sendStatus(400, 'id is required');
        try {
            const location = await this.locationService.getLocationById(id);
            return res.send(location);
        }
        catch (error) {
            console.error(error)
            return res.status(500).send(error)
        }
    }


    public async deleteLocation(req: any, res: any) {
        const id = req.params.id;
        if (!id) return res.sendStatus(400, 'id is required');
        try {
            await this.locationService.deleteLocation(id)
                .then(() => res.sendStatus(204))
        }   
        catch (error) {
            console.error(error)
            return res.status(500).send(error)
        }
    }

    public async updateLocation(req: any, res: any) {
        const id = req.params.id;
        const location = req.body;
        if (!id || !location) return res.sendStatus(400);
        try {
            await this.locationService.updateLocation(id, location)
                .then(() => res.sendStatus(200))
        } catch (error) {
            console.error(error);
            return res.status(500).send(error);
        }
    }

}   