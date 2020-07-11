import {
    Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany,
} from 'typeorm';
import { HeroFight } from './hero-fight.entity';
import { Menace } from '../../menace/models/menace.entity';

@Entity({
    name: 'fight',
})
export class Fight {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column('timestamp without time zone')
    dateStart: Date;

    @Column({ type: 'timestamp without time zone', nullable: true})
    dateEnd?: Date;

    @OneToMany(() => HeroFight, heroFight => heroFight.fight, { cascade: true, eager: true, nullable: false })
    heroFightList?: HeroFight[];

    @OneToOne(() => Menace, menace => menace.fight, { cascade: false, eager: true, nullable: true })
    menace?: Menace;
}
