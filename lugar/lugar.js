const axios = require('axios');

const getLugarLatLng = async(direccion) => {
    const encodedUlr = encodeURI(direccion);

    const params = {
        access_key: '179d2741c77e39a5dc5a04eee3edeeb3',
        query: encodedUlr
    }

    const instance = axios.create({
        baseURL: 'http://api.positionstack.com/v1/forward',
        params
    });

    /**instance.get()
        .then(response => {
            console.log(response.data.data[0].latitude);
        })
        .catch(error => {
            console.log('Error!!!', error);
        })*/

    const response = await instance.get();

    if (response.data.data.length === 0) {
        throw new Error(`No hay resultado para ${direccion}`);
    }

    const data = response.data.data[0];
    const name = data.name;
    const latitude = data.latitude;
    const longitude = data.longitude

    return {
        name,
        latitude,
        longitude
    }
}

module.exports = {
    getLugarLatLng
}