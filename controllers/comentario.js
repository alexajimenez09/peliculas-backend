import Comentario from "../models/comentario.js";


const comentarioUsuario= async(req,res)=>{
    const {_id}=req.params
    const comentarios= await Comentario.find({idusuario:_id}).populate("idUsuario",["nombre","apellido"])
    res.json({
        comentarios
    })
}

const comentarioGet= async(req,res)=>{
    const {_id}=req.params
    const comentarios= await Comentario.find({idpelicula:_id}).populate("idPelicula","titulo")
    res.json({
        comentarios
    })
}


const comentarioId= async(req,res)=>{
    const {_id}=req.params
    const comentario=await Comentario.find({comentario,idusuario:_id}).populate("idpelicula","titulo").populate("idusuario","nombre")
    res.json({comentario})
}

const buscarComentario= async(req,res)=>{
    const {comentario}=req.params
    const comentarios=await Comentario.find(
        {
            $or: [
                { comentario: new RegExp(comentario, "i") },
            ]
        }

    )
}

const comentarioPost=async(req,res)=>{
    const {comentario,idPelicula,idUsuario}=req.body
    const comentarios= new Comentario({comentario,idPelicula,idUsuario})
    comentarios.save()
    res.json({comentarios})
}

const comentarioDelete=async(req,res)=>{
    const {_id}=req.query
    const comentarios=await Comentario.findByIdAndDelete({_id})

    res.json({
        msg:`El comentario ha sido eliminado`
    })

}



export {comentarioGet,comentarioPost,comentarioDelete,comentarioId,buscarComentario,comentarioUsuario}
