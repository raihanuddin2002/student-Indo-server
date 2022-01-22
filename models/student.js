const { Schema, model } = require("mongoose");

const Student = model("Students", Schema({
    name: { type: String, required: [true, "Please Enter Your Name!!"] },
    age: {
        type: Number, validate: {
            validator: value => value > 8,
            message: "Age must be greater than 8"
        }
    },
    hobbies: {
        type: Array,
        of: String,
        validate: {
            validator: value => value.length > 0,
            message: "Al least write 1 Hobby!"
        }
    },
}));

exports.Student = Student;