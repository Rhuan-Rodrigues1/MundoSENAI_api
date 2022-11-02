const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/:pais_id', async (req, res) => {
    const { pais_id } = req.params
    const { data } = await axios(`http://queimadas.dgi.inpe.br/api/auxiliar/municipios?pais_id=${pais_id}`)
    const dataNormalized = []

    for(let i = 0; i < data.length; i++) {
        const newFormData = {
            pais_id: pais_id,
            pais_name: data[i].pais_name,
            municipio_id: data[i].municipio_id,
            estado_name: data[i].estado_name,
            municipio_name: data[i].municipio_name,
            
        }

        dataNormalized.push(newFormData)
    }
    
    res.json(dataNormalized)
    console.log(dataNormalized);
})

module.exports = app => app.use('/municipios', router)