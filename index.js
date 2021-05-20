const express = require('express');
const script = require('./src/script')
const app = express();
const bodyParser = require('body-parser')
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log('Bienvenido a la API de TanTan con blockchain');
});

app.get('/gethash', function(req, res) {
    const hash = req.query.hash || 'Error';
    res.json({hashLacchain : hash});
  });

app.post('/api', async function(req, res) {
    const {id, nombre, papellido, sapellido, carrera, semestre, instituto, 
    tipoCredencial, vigencia, curp} = req.query;
    let alumno = {
        id_alumno : id,
        nombre : nombre,
        primer_apellido : papellido,
        segundo_apellido : sapellido,
        carrera : carrera,
        semestre : semestre,
        instituto : instituto,
        tipo_credencial : tipoCredencial,
        vigencia : vigencia,
        curp : curp
    };
    const hash = await script.hash(JSON.stringify(alumno));
    res.json({"hashLacchain" : hash});
});