const express = require('express')
const router = express.Router()
const axios = require('axios')

router.get('/', async (req, res) => {
    const { pais_id, estado_id, municipio_id } = req.query
    const { data } = await axios(`http://queimadas.dgi.inpe.br/api/focos/?pais_id=${pais_id}&estado_id=${estado_id}`)
    const dataNormalized = []

    for(let i = 0; i < data.length; i++) {
        const newFormData = {
            pais_name: data[i].properties.pais,
            estado_name: data[i].properties.estado,
            municipio_name: data[i].properties.municipio,
            risco_fogo: data[i].properties.risco_fogo,
            sem_chuva_dias: data[i].properties.numero_dias_sem_chuva
        }

        dataNormalized.push(newFormData)
    }
    
    res.json(dataNormalized)
    console.log(dataNormalized);
})

module.exports = app => app.use('/', router)