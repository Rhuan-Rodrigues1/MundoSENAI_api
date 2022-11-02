const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res) => {
    const { data } = await axios('http://queimadas.dgi.inpe.br/api/auxiliar/estados')
    const dataNormalized = []

    for(let i = 0; i < data.length; i++) {
        const newFormData = {
            pais_name: data[i].pais_name,
            estado_id: data[i].estado_id,
            estado_name: data[i].estado_name,
        }

        dataNormalized.push(newFormData)
    }
    
    res.json(dataNormalized)
})

module.exports = app => app.use('/estados', router)