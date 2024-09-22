import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('location')
export  class Location {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    location!: string

    @Column()
    date!: Date

    @Column()
    temperature!: number

    @Column()
    hightemp!: number

    @Column()
    lowtemp!: number

    @Column()
    rainfallPercentage!: number

    @Column()
    humidity!: number

    @Column()
    highHumidity!: number

    @Column()
    lowHumidity!: number

    @Column()
    longitude!: number

    @Column()
    latitude!: number

}