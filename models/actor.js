import mongoose from "mongoose"

const ActoresSchema= new mongoose.Schema({
    nombre:{type:String, maxlength:50, required:true},
    biografia:{type:String, maxlength:500, required:true},
    alias:{type:String, maxlength:50},
    foto:{type:String},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Actor', ActoresSchema)