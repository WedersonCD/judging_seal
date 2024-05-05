import express, { json } from 'express';
import mongoService from './services/mongoService.js';
import apiDocsRoutes from './api/api_docs_routes.js';

//routes
import sealRoutes from `./api/v0/routes/SealRouter.js`;
import userRoutes from `./api/v0/routes/UserRouter.js`;
import utilsRoutes from `./api/v0/routes/UtilsRouter.js`;
import sealTemplateRoutes from `./api/v0/routes/SealTemplateRouter.js`;

//Middleware
import authMiddleware from `./api/v0/middleware/AuthMiddleware.js`;
import parseCookieMiddleware from `./api/v0/middleware/ParseCookieMiddleware.js`;



const app = express();

app.use(parseCookieMiddleware);
app.use(json());

//connecto to mongodb
mongoService();

app.use('/',apiDocsRoutes)
app.use('/api-docs',apiDocsRoutes)
app.use('/seals',authMiddleware,sealRoutes)
app.use('/users',userRoutes)
app.use('/seal-template',sealTemplateRoutes)

app.use('/utils',utilsRoutes)

const port = process.env.SERVICE_PORT || 9952
app.listen(port, () => console.log(`Storer Service listening on port ${port}`));
