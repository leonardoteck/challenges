import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany,
} from 'typeorm';
import { HeroRank } from './hero-rank.entity';
import { Location } from '../../../models/location.entity';
import { HeroFight } from '../../fight/models/hero-fight.entity';

@Entity({
    name: 'hero',
})
export class Hero {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100 })
    name: string;

    @Column('timestamp without time zone')
    dateRegister?: Date;

    @Column({ type: 'int', nullable: false })
    heroRankId: number

    @ManyToOne(() => HeroRank, { cascade: false, eager: true, nullable: false })
    heroRank?: HeroRank;

    @Column({ type: 'int', nullable: false })
    locationId?: number

    @OneToOne(() => Location, { cascade: true, eager: true, nullable: false })
    @JoinColumn()
    location: Location;

    @OneToMany(() => HeroFight, heroFight => heroFight.hero, { cascade: false, eager: false, nullable: false })
    heroFightList?: HeroFight[];
}
