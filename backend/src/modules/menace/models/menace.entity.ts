import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn,
} from 'typeorm';
import { MenaceRank } from './menace-rank.entity';
import { Location } from '../../../models/location.entity';

@Entity({
    name: 'menace',
})
export class Menace {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 100 })
    name: string;

    @Column('timestamp without time zone')
    dateRegister?: Date;

    @Column({ type: 'int', nullable: false })
    menaceRankId: number

    @ManyToOne(() => MenaceRank, { cascade: false, eager: true, nullable: false })
    menaceRank?: MenaceRank;

    @Column({ type: 'int', nullable: false })
    locationId?: number

    @OneToOne(() => Location, { cascade: true, eager: true, nullable: false })
    @JoinColumn()
    location: Location;
}
