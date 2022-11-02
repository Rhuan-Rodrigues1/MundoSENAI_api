const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res) => {
    const { data } = await axios('http://queimadas.dgi.inpe.br/api/auxiliar/paises')
    const dataNormalized = []

    for(let i = 0; i < data.length; i++) {
        const newFormData = {
            pais_id: data[i].pais_id,
            pais_name: data[i].pais_name,
        }

        dataNormalized.push(newFormData)
    }
    
    res.json(dataNormalized)
    console.log(dataNormalized);
})

module.exports = app => app.use('/paises', router)