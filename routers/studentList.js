const express = require("express");
const router = express.Router();
const { Student } = require("../models/student");
const authorize = require("../middleware/authorization");
const admin = require("../middleware/admin");

const studentList = async (req, res) => {
    try {
        const data = await Student.find();
        res.send(data);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}
const newStudents = async (req, res) => {
    const student = new Student(req.body);

    try {
        const result = await student.save();
        res.send(result);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}
const studentDetails = async (req, res) => {
    const id = req.params.id;

    try {
        const data = await Student.findById(id);
        if (!data) return res.status(400).send("ID not Found!!");
        res.send(data);
    } catch (err) {
        return res.status(400).send("ID not Found!!");
    }
}

const updateStudent = async (req, res) => {
    const id = req.params.id;
    const upadateData = req.body;
    try {
        // const data = await Student.updateOne({ _id: id }, { $set: upadateData }, { upsert: true });
        const data = await Student.findByIdAndUpdate(id, upadateData, { new: true });
        res.send(data);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}
const deleteStudent = async (req, res) => {
    const id = req.params.id;
    try {
        // const data = await Student.deleteOne({ _id: id });
        const data = await Student.findByIdAndDelete(id);
        res.send(data);
    } catch (err) {
        const errMsg = [];
        for (const field in err.errors) {
            errMsg.push(err.errors[field].message);
        }
        return res.status(400).send(errMsg);
    }
}

router.route("/")
    .get(authorize, studentList)
    .post(newStudents)

router.route("/:id")
    .get(studentDetails)
    .post()
    .put(updateStudent)
    .delete([authorize, admin], deleteStudent)

module.exports = router;
