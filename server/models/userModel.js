import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        min:3
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture: {
      type: String,
      dafault: "",
    },
    role: {
      type: String,
      enum:['user','admin'],
      default: user,
    },
    desc: {
      type: String,
    },
    from: {
      type: String,
      default: "Iran",
    },
    city: {
      type: String,
      default: "Tehran",
    },
    relationship: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    followers: {
      type: Array,
      default: [],
    },
    followings: {
      type: Array,
      default: [],
    },
})


export default mongoose.model("User",userSchema)