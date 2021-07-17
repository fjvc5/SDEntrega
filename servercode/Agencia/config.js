const PORT = process.env.PORT || 3100;

const URL_Avion = "https://localhost:3000/api/avion";
const URL_Coche = "https://localhost:3006/api/coche";
const URL_Hotel = "https://localhost:3002/api/hotel";
const URL_Auth =  "https://localhost:3004/api/auth/usuarios";
const URL_Token=  "https://localhost:3004/api/auth/tokens";
const URL_Reserva= "https://localhost:3007/api/reservas";
const URL_Banco=    "https://localhost:3008/api/cuenta";

SECRET_TOKEN = 'francisco8';


module.exports = { PORT, URL_Coche, URL_Avion, URL_Hotel, URL_Auth, SECRET_TOKEN, URL_Token,URL_Reserva,URL_Banco }