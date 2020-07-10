import {
    Entity, Column, PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
    name: 'menaceRank',
})
export class MenaceRank {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ length: 20 })
    name: string;

    @Column('int')
    value: number;
}
