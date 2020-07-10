import {
    Entity, Column, PrimaryGeneratedColumn, ManyToOne,
} from 'typeorm';
import { Hero } from '../../hero/models/hero.entity';
import { Fight } from './fight.entity';

@Entity({
    name: 'heroFight',
})
export class HeroFight {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ type: 'int', nullable: true })
    heroId?: number

    @ManyToOne(() => Hero, { cascade: false, eager: true, nullable: true })
    hero?: Hero;

    @Column({ type: 'int', nullable: false })
    fightId: number

    @ManyToOne(() => Fight, fight => fight.heroFightList, { cascade: false, eager: false, nullable: false })
    fight?: Fight;
}
