const { Lesson, LessonTeacher } = require('../models/models');
const ApiError = require('../error/ApiError');

class LessonController {
    async create(req, res, next) {
        // const { date, title, status } = req.body;
        // if (!date) {
        //     return next(ApiError.badRequest('Не указана дата проведеня урока!'));
        // }
        // const lesson = await Lesson.create({  date, title, status  });
        // return res.json(lesson);

        let { title, status, firstDate, lessonsCount, lastDate, teacherIds, days } = req.body;

        if (!firstDate) {
            return next(ApiError.badRequest('Не указана дата проведеня урока!'));
        }
        else if (lastDate && lessonsCount) {
            return next(ApiError.badRequest('Необходимо указать только 1 параметр!'));
        }
        else if (!lastDate && !lessonsCount) {
            let date = firstDate;
            const lesson = await Lesson.create({  date, title, status  });
            return res.json(lesson);
        }

        if (!teacherIds)
        {
            return next(ApiError.badRequest('Некому проводить занятия! Необходимо указать учителя!'));
        }

        if (!days) {
            days = [0, 1, 2, 3, 4, 5, 6];
        }
        
        let teacher;
        let date = new Date(firstDate);
        let dayOfWeek = 0;

        if (lessonsCount) {

            for (let i = 0; i < lessonsCount; i++) {

                do {
                    date.setDate(date.getDate() + 1);
                } while (date.getDay() != days[dayOfWeek]);
                console.log(date);
                let newLesson = await Lesson.create({ date, title, status });

                for (let j = 0; j < teacherIds.length; j++) {
                    let lessonId = newLesson.id;
                    let teacherId = teacherIds[j];
                    teacher = await LessonTeacher.create({ lessonId, teacherId });
                }
                dayOfWeek = ( dayOfWeek + 1 ) % days.length;
                console.log(dayOfWeek);
            }
            const lesson = await Lesson.findAll({where: { title: title}});
            return res.json(teacher);
        }

        if (lastDate){

            for (let d = new Date(firstDate); d < lastDate; d.setDate(d.getDate() + 1)){
                console.log(d);
            }
        }
    }

    async getAll(req, res) {
        const lesson = await Lesson.findAll();
        return res.json(lesson);
    }

}
module.exports = new LessonController();