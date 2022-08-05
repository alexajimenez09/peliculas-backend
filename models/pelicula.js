import mongoose from "mongoose"
const PeliculaSchema= new mongoose.Schema({
    titulo:{type:String, maxlength:50, required:true},
    subtitulo:{type:String, maxlength:50, required:true},
    sinopsis:{type:String, maxlength:500, required:true},
    duracion:{type:String, maxlength:10, require:true},
    fechaPublicacion:{type:String, maxlength:50, require:true},
    categoria:{type:String, maxlength:25,required:true},
    reparto:[
        {
        idactor:{type:mongoose.Schema.ObjectId, ref:"Actor", required:true},
        personaje:{type:String, maxlength:15},
        rol:{type:String,maxlength:10}, 
        }
    ],
    poster:{type:String, unique:true},
    creador:{type:String, maxlength:25,required:true},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Pelicula', PeliculaSchema)