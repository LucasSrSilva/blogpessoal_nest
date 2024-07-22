import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostagemService{

    constructor(
        @InjectRepository(Postagem)
        private PostagemRepository: Repository<Postagem>
    ){}

    async findAll(): Promise<Postagem[]>{
        return await this.PostagemRepository.find()
    }
}