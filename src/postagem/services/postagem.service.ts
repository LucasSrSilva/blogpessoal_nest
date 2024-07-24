import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostagemService {

    constructor(
        @InjectRepository(Postagem)
        private PostagemRepository: Repository<Postagem>
    ) { }

    async findAll(): Promise<Postagem[]> {
        return await this.PostagemRepository.find()
    }

    async findById(id: number): Promise<Postagem> {
        let buscaPostagem = await this.PostagemRepository.findOne({
            where: {
                id
            }
        });

        if (!buscaPostagem) {
            throw new HttpException("Postagem não foi encontrada!", HttpStatus.NOT_FOUND);

        };
        return buscaPostagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {
        return await this.PostagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`)
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        return await this.PostagemRepository.save(postagem);
    }

    async update(postagem: Postagem): Promise<Postagem> {

        let buscaPostagem = await this.findById(postagem.id);

        if (!buscaPostagem || !postagem.id) {
            throw new HttpException("A Postagem não foi encontrada!", HttpStatus.NOT_FOUND);
        }

        return await this.PostagemRepository.save(postagem);
    }

    async delete(id: number): Promise<DeleteResult> {
        let buscaPostagem = await this.findById(id);

        if (!buscaPostagem) {
            throw new HttpException("Postagem não foi encontrada!", HttpStatus.NOT_FOUND);

        };
        return await this.PostagemRepository.delete(id);
    }
}