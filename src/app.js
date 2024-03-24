const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoService  = require('./services/mongoService')
const apiDocsRoutes = require('./api/api_docs_routes')

const API_VERSION_LTS = process.env.API_VERSION_LTS || '0'

//routes
const sealRoutes  = require('./api/v'+API_VERSION_LTS+'/routes/SealRouter')
const userRoutes  = require('./api/v'+API_VERSION_LTS+'/routes/UserRouter')
const utilsRoutes = require('./api/v'+API_VERSION_LTS+'/routes/UtilsRouter')
const sealTemplateRoutes = require('./api/v'+API_VERSION_LTS+'/routes/SealTemplateRouter')

//Middleware
const authMiddleware        = require('./api/v'+API_VERSION_LTS+'/middleware/AuthMiddleware');
const parseCookieMiddleWare = require('./api/v'+API_VERSION_LTS+'/middleware/ParseCookieMiddleware');


const app = express();

app.use(parseCookieMiddleWare);
app.use(express.json());
//app.use(helmet())
//app.use(cors());

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
