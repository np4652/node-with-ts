// src/controllers/homeController.ts

import { Request, Response } from 'express';
import { IHome } from '../interface/IHome'
import { inject, injectable } from 'inversify';

@injectable()
export class HomeController {
    private homeRepo: IHome;

    constructor(@inject("IHome")homeRepo: IHome) {
        this.homeRepo = homeRepo;
    }

    async getJsonPlaceholder(req: Request, res: Response) {
        try {
            console.log('hit');
            const data = await this.homeRepo.jsonplaceholder();
            return res.status(200).send(data);
        } catch (error) {
            console.log('error',error);
            return res.status(500).send(error);
        }
    }

    statusCheck(req: Request, res: Response) {
        try {
            this.homeRepo.statusCheck();
        } catch (error) {
            res.status(500).send(error);
        }
    }
}
