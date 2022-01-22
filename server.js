const app = require("./index");
const mongoose = require("mongoose");

// Port
const port = process.env.port || 5000;
// Database setup
mongoose.connect('mongodb://localhost:27017/studentList')
    .then(() => console.log("Database Connected!"))
    .catch(err => console.error("Database Connection Failed!!"));

// const studentSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: { type: String, required: [true, "Please Enter Lastname."] },
//     birth: {
//         type: Date, validate: {
//             validator: value => value > new Date("1 January 1998"),
//             message: "Birth Date Must be after 1 January 2000"
//         }
//     },
//     entryDate: { type: Date, default: Date.now },
//     passed: Boolean,
//     hobbies: {
//         type: Array,
//         of: String,
//         validate: {
//             validator: value => value.length > 0,
//             message: "Al least write 1 Hobby!"
//         }
//     },
//     parents: {
//         father: String,
//         mother: String
//     }
// });

// Model
// const Student = mongoose.model('Students', studentSchema);

/* Create */
// const student = new Student({
//     firstName: "Raihan",
//     lastName: "Uddin",
//     birth: new Date("14 may 2002"),
//     passed: true,
//     hobbies: ["Programming", "Cricket"],
//     parents: {
//         father: "Yasin",
//         mother: "Rabeya"
//     }
// });

// student.save()
//     .then(data => console.log(data))
//     .catch(err => console.log(err._message));

// async function createSchema() {
//     try {
//         const data = await Student.create({
//             firstName: "Shahrier Aziz",
//             lastName: "Himel",
//             birth: new Date("20 November 1995"),
//             passed: true,
//             hobbies: ["Reading"],
//             parents: {
//                 father: "Yasin",
//                 mother: "Rabeya"
//             }
//         });
//         console.log(data);
//     } catch (err) {
//         // console.log(err.message);
//         for (field in err.errors) {
//             console.log(err.errors[field].message);
//         }
//     }
// }

// createSchema();

/* ========
    READ
===========*/
// Student.find()
//     .then(data => console.log(data))
//     .catch(err => console.log(err._message))

// async function readSchema(search) {
//     try {
//         // const data = await Student.find({ firstName: { $regex: search, $options: 'si' } });
//         const data = await Student.find();
//         console.log(data);
//     } catch (err) {
//         console.log(err._message);
//     }
// }
// readSchema("Sh");

/* ========
    UPDATE
===========*/
// Student.updateOne({ _id: "61dd884aebc0bd79127c02ae" }, { $set: { birth: new Date("15 May 2002") } })
//     .then(data => console.log(data))
//     .catch(err => console.log(err._message));

// async function updateStudentSchema(id) {
//     try {
//         const data = await Student.updateOne({ _id: id }, { $set: { hobbies: ["Reading", "Cycleing"], parents: { father: "Azizur", mother: "" } } })
//         console.log(data);
//     } catch (err) {
//         console.log(err._message);
//     }
// }
// updateStudentSchema("61dde6d66cb33ee0d134a370");

// Basic Setup
app.get("/", (req, res) => {
    res.send("Practising Express Bohubrihi");
});
app.listen(port, () => {
    console.log("Practising Express server Running on port:", port);
});
