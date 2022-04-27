//Переменные окружения 
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const sequelize = require('./db');
const models = require('./models/models');
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

// Обработка ошибок
app.use(errorHandler);

//Все операции с БД - асинхронные
const start = async () => {
    //обработка наиболее тупых ошибок, связанных с бдшкой
    try {
        await sequelize.authenticate(); //Установка подключения к бд
        await sequelize.sync({ alter: true }); //Сверяем состояние бд со схемой данных

        app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
    } catch (e) {
        console.log(e);
    }
}

start();