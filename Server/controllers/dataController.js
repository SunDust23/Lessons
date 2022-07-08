const { Teacher, Student, Lesson, LessonStudent, LessonTeacher } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require("sequelize");
const sequelize = require('../db');

class DataController {

    async getAll(req, res) {
        let { date, status, teacherIds, studentsCount, page, lessonsPerPage } = req.query;
        page = page || 1;
        let limit = lessonsPerPage || 5;
        let offset = page * limit - limit;
        let lessons, students, teachers = [];

        if (date && status) {
            lessons = await Lesson.findAll({ include: [{ model: Student }, { model: Teacher }], where: { status, date }, limit, offset });
        }
        if (!date && status) {
            lessons = await Lesson.findAll({ include: [{ model: Student }, { model: Teacher }], where: { status }, limit, offset });
        }
        if (date && !status) {
            lessons = await Lesson.findAll({ include: [{ model: Student }, { model: Teacher }], where: { date }, limit, offset });
        }
        if (!date && !status) {
            // lessons = await Lesson.findAll({include: [{ model: Student },{ model: Teacher, }], limit, offset });
            //lessons = await Lesson.findAll({include: { model: Student, attributes: [sequelize.fn("COUNT", sequelize.col(`students.id`)), "StudentsCount"]}, limit, offset });
            lessons = await Lesson.findAll({

                include: [
                    {
                        model: Student,
                        attributes: ["id", "name"],
                        through: { attributes: ["visit"] },
                        
                    },
                    {
                        model: Teacher,
                        attributes: ["id", "name"],
                        through: { attributes: [] },
                    },
                ]
            })

        }
        // if(studentsCount){
           studentsCount = await LessonStudent.count({ where: {visit: true, lessonId: 1}});
        return res.json(studentsCount);
        // }

        //console.log(teacherIds);
        //if(teacherIds){
        // for (let i = 0; i < teacherIds.length; i++){
        // console.log(teacherIds[i]);
        //teachers[i] = await LessonTeacher.findAndCountAll({where: {teacherId: teacherIds[i]}});
        //teachers[i] = await Teacher.findOne({where: {id: teacherIds[i]}});

        //, where: { id: {[Op.in]: 1}}

        //  lessons = await Lesson.findAll({ include: [{ model: Student },{ model: Teacher}] });
        //  }
        //}
        return res.json(lessons);
    }

}
module.exports = new DataController();