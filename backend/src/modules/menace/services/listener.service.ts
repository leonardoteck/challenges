import { ListenerDataPayload } from '../models/listener-data.payload';
import { MenaceRank } from '../models/menace-rank.entity';
import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MenaceService } from './menace.service';
const io = require('socket.io-client');

@Injectable({
    scope: Scope.DEFAULT,
})
export class ListenerService {
    constructor(
        @InjectRepository(MenaceRank)
        private readonly menaceRankRepository: Repository<MenaceRank>,
        private readonly menaceService: MenaceService,
    ) {}

    private menaceTypes: MenaceRank[];

    private timeout: NodeJS.Timeout;

    private socket: SocketIOClient.Socket;

    async listen(): Promise<void> {
        if (!this.menaceTypes || !this.menaceTypes.length) {
            this.menaceTypes = await this.menaceRankRepository.find();
        }

        if (this.timeout != null) {
            clearTimeout(this.timeout);
            this.setTimeout();
            return;
        }

        this.socket = io('https://zrp-challenge-socket.herokuapp.com:443');
        this.socket.on('connect', () => {
            console.log('Connected to server socket.');
            this.setTimeout();
        });
        
        this.socket.on('occurrence', (data: ListenerDataPayload) => {
            console.log('Menace received.');
            const rank = this.menaceTypes.find(menace => menace.name === data.dangerLevel);
            this.menaceService.register({
                dateRegister: new Date(),
                location: {
                    latitude: data.location[0].lat,
                    longitude: data.location[0].lng,
                },
                menaceRank: rank,
                menaceRankId: rank.id,
                name: data.monsterName,
            });
        });
        
        this.socket.on('disconnect', () => {
            this.timeout = null;
        });
    }

    private setTimeout(): void {
        this.timeout = setTimeout(() => {
            this.socket.close();
        }, 1800000)
    }
}
