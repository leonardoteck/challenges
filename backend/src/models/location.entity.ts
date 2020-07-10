import {
    Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
    name: 'location',
})
export class Location {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('double precision')
    latitude: number;

    @Column('double precision')
    longitude: number;
}
