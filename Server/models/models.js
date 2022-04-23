const sequelize = require('../db');
const { DataTypes } = require('sequelize'); //Описание типов данных


const Student = sequelize.define('student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(10) }
})

const Teacher = sequelize.define('teacher', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(10) }
})

const Lesson = sequelize.define('lesson', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    title: { type: DataTypes.STRING },
    status: { type: DataTypes.INTEGER, defaultValue: 0 }
})

const LessonStudent = sequelize.define('lesson_student', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    visit: { type: DataTypes.BOOLEAN, defaultValue: false}
})

const LessonTeacher = sequelize.define('lesson_teacher', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }
})


Student.belongsToMany(Lesson, {through: LessonStudent});
Lesson.belongsToMany(Student, {through: LessonStudent});

Teacher.belongsToMany(Lesson, {through: LessonTeacher});
Lesson.belongsToMany(Teacher, {through: LessonTeacher});

module.exports={
    Student,
    Teacher,
    Lesson,
    LessonStudent,
    LessonTeacher
}