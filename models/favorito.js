import mongoose from "mongoose"

const FavoritosSchema= new mongoose.Schema({
    idPelicula:{type:mongoose.Schema.ObjectId, ref:"Pelicula", required:true},
    idUsuario:{type:mongoose.Schema.ObjectId,  ref:"Usuario", required:true},
    createAt:{type:Date,default:Date.now}
})

export default mongoose.model('Favorito', FavoritosSchema)