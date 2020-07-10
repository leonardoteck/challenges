import {
    Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn,
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

    @Column('timestamp without time zone')
    dateEnd: Date;

    @OneToMany(() => HeroFight, heroFight => heroFight.fight, { cascade: false, eager: true, nullable: false })
    heroFightList?: HeroFight[];

    @Column({ type: 'int', nullable: false })
    menaceId: number;

    @OneToOne(() => Menace, { cascade: false, eager: true, nullable: false })
    @JoinColumn()
    menace: Menace;
}
