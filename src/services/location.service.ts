import { collection, addDoc, getDocs, doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../infra/firebase-config";

 // Importa a configuração do Firebase

export default class LocationService {
    private locationCollection = collection(db, "locations");

    public async createLocation(location: any) {
        return addDoc(this.locationCollection, location);
    }

    public async getAllLocations() {
        const snapshot = await getDocs(this.locationCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    public async getLocationById(id: string) {
        const locationDoc = doc(this.locationCollection, id);
        const snapshot = await getDoc(locationDoc);
        return snapshot.exists() ? snapshot.data() : null;
    }

    public async deleteLocation(id: string) {
        const locationDoc = doc(this.locationCollection, id);
        return deleteDoc(locationDoc);
    }

    public async updateLocation(id: string, location: any) {
        const locationDoc = doc(this.locationCollection, id);
        return updateDoc(locationDoc, location);
    }
}