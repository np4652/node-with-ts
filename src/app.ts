// src/app.ts
import 'reflect-metadata'; 
import express from 'express';
import bodyParser from 'body-parser';
import home from './routeController'
import router from './routeController';


/* Middleware */
const app = express();
app.use(bodyParser.json());
app.use('/api',router);
/* End Middleware */



// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
