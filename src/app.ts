// src/app.ts

import express, { Request, Response } from 'express';
import axios, { AxiosRequestConfig } from 'axios';
import bodyParser from 'body-parser';

/* Modal */
// Define an interface for the request model
interface StatusCheckRequest {
    key: string;
}
/* End Modal */

// Create an Express application
const app = express();

/* Middleware */
app.use(bodyParser.json());
/* End Middleware */

// Define a route for the GET request
app.get('/', async (req: Request, res: Response) => {
    try {
        // Make a GET request to an external API asynchronously
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');

        // Send the response data back to the client
        res.status(200).send(response.data);
    } catch (error) {
        // If there's an error, send an error response
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// Define a route for the GET request
app.get("/statuscheck", async (req: Request, res: Response) => {
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


app.post("/statuscheck", async (req: Request, res: Response) => {
    let responseData: any;
    let statusCode: number;

    try {
        const { key }: StatusCheckRequest = req.body;

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

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
