const { Lesson } = require('../models/models');
const ApiError = require('../error/ApiError');

class LessonController {
    async create(req, res, next) {
        const { date, title, status } = req.body;
        if (!date) {
            return next(ApiError.badRequest('Не указана дата проведеня урока!'));
        }
        const lesson = await Lesson.create({  date, title, status  });
        return res.json(lesson);
    }
    async getAll(req, res) {
        const lesson = await Lesson.findAll();
        return res.json(lesson);
    }

}
module.exports = new LessonController();