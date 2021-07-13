const Ts = require('../services/temperature')
const Temperature = new Ts();

test('kelvin to celsius', () => {
    expect(Temperature.kelvinToCelsius(273.15)).toBe(0);
});

