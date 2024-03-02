const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const mongoService  = require('./services/mongoService')
const apiDocsRoutes = require('./api/api_docs_routes')

const API_VERSION_LTS = process.env.API_VERSION_LTS || '0'

//routes
const momentRoutes  = require('./api/v'+API_VERSION_LTS+'/routes/MomentRouter')

const app = express();

app.use(express.json());
app.use(helmet())
app.use(cors());

//connecto to mongodb
mongoService();

app.use('/',apiDocsRoutes)
app.use('/judging_seal/api-docs',apiDocsRoutes)
app.use('/judging_seal/moments',momentRoutes)


const port = process.env.SERVICE_PORT || 9952
app.listen(port, () => console.log(`Storer Service listening on port ${port}`));