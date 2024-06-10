// src/app.ts
import express, { Request, Response, Router } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import { IStatusCheckRequest } from './model/IStatusCheckRequest';
import { ITransferResponse } from './model/ITransferResponse';
import { container } from './inversify.config';
import { HomeController } from './controller/homeController';

const router = Router();

const homeController = container.get<HomeController>(HomeController);

 router.get('/jsonplaceholder', async (req, res) => await homeController.getJsonPlaceholder(req, res));
//router.post('/statuscheck', (req, res) => homeController.statusCheck(req, res));


// Define a route for the GET request
router.get("/statuscheck", async (req: Request, res: Response) => {
    let responseData: any;
    let statusCode: number;
    try {
        const apiKey = req.query.key as string;

        if (!apiKey) {
            statusCode = 400;
            responseData = { error: 'API key is required' };
        } else {
            const config: AxiosRequestConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://wire.easebuzz.in/api/v1/transfers/26506436?key=${apiKey}`,
                headers: {
                    'Authorization': '397e76a12b8a13f668fa4b66220eeb369925af3e53ef39632cf45006c276a710405b38e5ed2a442efb4cc9c2ecfdeff1244f52a57db131ddf64f114a235a6efa'
                }
            };

            // Make the request to the external API asynchronously
            const response = await axios.request(config);

            // Log the response data
            console.log(JSON.stringify(response.data));

            statusCode = 200;
            responseData = response.data;
        }
    } catch (error) {
        // If there's an error, log it and set the response accordingly
        console.log(error);
        statusCode = 500;
        responseData = error;
    }

    // Send the response data back to the client
    res.status(statusCode).send(responseData);
});


router.post("/statuscheck", async (req: Request, res: Response) => {
    let responseData: any;
    let statusCode: number;

    try {
        const { key }: IStatusCheckRequest = req.body;
        if (!key) {
            statusCode = 400;
            responseData = { error: 'API key is required' };
        } else {
            const config: AxiosRequestConfig = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://wire.easebuzz.in/api/v1/transfers/26506436?key=${key}`,
                headers: {
                    'Authorization': '397e76a12b8a13f668fa4b66220eeb369925af3e53ef39632cf45006c276a710405b38e5ed2a442efb4cc9c2ecfdeff1244f52a57db131ddf64f114a235a6efa'
                }
            };

            // Make the request to the external API asynchronously
            const response = await axios.request<ITransferResponse>(config);

            // Log the response data
            console.log(JSON.stringify(response.data));

            statusCode = 200;
            responseData = response.data;
        }
    } catch (error) {
        // If there's an error, log it and set the response accordingly
        console.log(error);
        statusCode = 500;
        responseData = error;
    }

    // Send the response data back to the client
    res.status(statusCode).send(responseData);
});

export default router;