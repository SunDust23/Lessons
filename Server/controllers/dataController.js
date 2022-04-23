const { Teacher, Student, Lesson, LessonStudent, LessonTeacher } = require('../models/models');
const ApiError = require('../error/ApiError');

class DataController {
    
    async getAll(req, res) {
        let { date, status, teacherIds, studentsCount, page, lessonsPerPage } = req.query;
        page = page || 1;
        lessonsPerPage = lessonsPerPage || 9;
        let offset = page * lessonsPerPage - lessonsPerPage;
        let lessons;

        if (date && status) {
            lessons = await Lesson.findAndCountAll({ where: { status, date }, lessonsPerPage, offset });
        }
        if (!date && status) {
            lessons = await Lesson.findAndCountAll({ where: { status }, lessonsPerPage, offset });
        }
        if (date && !status) {
            lessons = await Lesson.findAndCountAll({ where: { date }, lessonsPerPage, offset });
        }
        if (!date && !status) {
            lessons = await Lesson.findAndCountAll({ lessonsPerPage, offset });
        }

        return res.json(lessons);
    }

}
module.exports = new DataController();