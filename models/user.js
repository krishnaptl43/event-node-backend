import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "user name is required"],
        trim: true,
        maxLength: [32, "Name is too Long"],
        minLength: [2, "Name is too short"]
    },
    email: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v)
            },
            message: (props) => `${props.value} is Not a valid Email`
        },
        required: [true, "email is required"],
        unique: true
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (v) {
                return /^(?:\+91|91)?[6-9]\d{9}$/.test(v)
            },
            message: (props) => `${props.value} is Not a valid phone`
        },
        required: [true, "phone is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"]
    },
    image: {
        type: String,
        trim: true,
        default: null
    },
    address: {
        type: String,
        trim: true,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},{timestamps : true});

const userModel = model("user",userSchema);

export default userModel;