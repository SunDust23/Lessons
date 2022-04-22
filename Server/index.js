//Переменные окружения 
require('dotenv').config();

const express = require('express');

const sequelize = require('./db');



const PORT = process.env.PORT || 3000;

const app = express();



const start = async () => {
    try {
        await sequelize.authenticate(); //Установка подключения к бд
        await sequelize.sync(); //Сверяем состояние бд со схемой данных

        app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();