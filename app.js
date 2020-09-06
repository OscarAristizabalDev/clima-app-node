const lugar = require('./lugar/lugar');
const clima = require('./clima/clima');

const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'Dirección de la ciudad para obtener el clima',
        demand: true
    }
}).argv;


//clima.getClima(40.4165, -3.70256)
//    .then(console.log)
//    .catch(console.log)

/*lugar.getLugarLatLng(argv.direccion)
    .then(console.log)
    .catch(error => {
        console.log('Error ', error)
    })*/

//console.log(argv.direccion);

/**const instance = axios.create({
    baseURL: 'https://devru-latitude-longitude-find-v1.p.rapidapi.com/latlon.php?location=lima',
    headers: {
        'x-rapidapi-host': 'devru-latitude-longitude-find-v1.p.rapidapi.com',
        'x-rapidapi-key': '331b182f0bmsh1f20709358a72e0p1d908ejsnda0ee86082a5',
        'useQueryString': true
    }
});*/

const getInfo = async(direccion) => {

    try {
        const coordenadas = await lugar.getLugarLatLng(direccion);
        const temperatura = await clima.getClima(coordenadas.latitude, coordenadas.longitude);

        return `El clima de la ciudad ${coordenadas.name} es de ${temperatura} grados centigrados`;
    } catch (error) {
        return `No se pudo determinar el clima de ${direccion}`;
    }

}

getInfo(argv.direccion)
    .then(console.log)
    .catch(console.log);