const { Lesson, LessonTeacher } = require('../models/models');
const ApiError = require('../error/ApiError');

class LessonController {
    async create(req, res, next) {

        let { title, status, firstDate, lessonsCount, lastDate, teacherIds, days } = req.body;

        if (!firstDate) {
            return next(ApiError.badRequest('Не указана дата проведеня урока!'));
        }
        else if (lastDate && lessonsCount) {
            return next(ApiError.badRequest('Необходимо указать только 1 параметр!'));
        }
        else if (!lastDate && !lessonsCount) {
            let date = firstDate;
            const lesson = await Lesson.create({ date, title, status });
            return res.json(lesson);
        }

        if (!teacherIds) {
            return next(ApiError.badRequest('Некому проводить занятия! Необходимо указать учителя!'));
        }

        if (!days) {
            days = [0, 1, 2, 3, 4, 5, 6];
        }

        let teacher;
        let date = new Date(firstDate);
        let dayOfWeek2 = 0;

        if (lessonsCount) {
            let i = 0;
            while ( i < lessonsCount) {

                for (let dayOfWeek = 0; dayOfWeek < days.length; dayOfWeek++) {
                    if (date.getDay() == days[dayOfWeek]) {

                        let newLesson = await Lesson.create({ date, title, status });

                        for (let j = 0; j < teacherIds.length; j++) {
                            let lessonId = newLesson.id;
                            let teacherId = teacherIds[j];
                            teacher = await LessonTeacher.create({ lessonId, teacherId });
                        }
                        i++;
                        break;
                    }
                }
                date.setDate(date.getDate() + 1);
            }
            const lesson = await Lesson.findAll({ where: { title: title } });
            return res.json(lesson);
        }


        if (lastDate) {

            const last = new Date(lastDate);

            while (date.getTime() <= last.getTime()) {

                for (let dayOfWeek = 0; dayOfWeek < days.length; dayOfWeek++) {
                    if (date.getDay() == days[dayOfWeek]) {

                        let newLesson = await Lesson.create({ date, title, status });

                        for (let j = 0; j < teacherIds.length; j++) {
                            let lessonId = newLesson.id;
                            let teacherId = teacherIds[j];
                            teacher = await LessonTeacher.create({ lessonId, teacherId });
                        }
                        break;
                    }
                }
                date.setDate(date.getDate() + 1);
            }
            const lesson = await Lesson.findAll({ where: { title: title } });
            return res.json(lesson);
        }
    }

    async getAll(req, res) {
        const lesson = await Lesson.findAll();
        return res.json(lesson);
    }

}
module.exports = new LessonController();