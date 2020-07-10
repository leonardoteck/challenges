import {
    Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
    name: 'heroRank',
})
export class HeroRank {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 1 })
    name: string;

    @Column('int')
    value: number;
}
