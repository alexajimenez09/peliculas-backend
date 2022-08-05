import mongoose from "mongoose"

const UsuarioSchema= new mongoose.Schema({
    nombre:{type: String, maxlenght:25, required:true},
    apellido:{type: String, maxlenght:25, required:true},
    email:{type: String, required:true, unique:true},
    estado:{type: Number, default:1},
    password:{type: String, required:true, minlength:6},
    foto:{type:String},
    createAt:{type:Date,default:Date.now},
})



export default mongoose.model('Usuario', UsuarioSchema)