const express = require('express')
const ongController = require('../src/controllers/ongController')
const incidentController = require('../src/controllers/incidentController')
const sessionController = require('../src/controllers/sessionController')

const routes = express.Router()


routes.get('/ongs',ongController.list)

routes.post('/session',sessionController.create)
routes.post('/ongs',ongController.create)

routes.post('/incidents', incidentController.create)
routes.get('/incidents', incidentController.listSpecific)
routes.get('/allIncidents', incidentController.listAll)
routes.delete('/incidents/:id',incidentController.delete)

module.exports = routes;