import Favorito from "../models/favorito.js"

const favoritoGet=async (req,res)=>{
  const favoritos=await Favorito.find().populate("idpelicula","titulo").populate("idusuario","nombre")
  res.json({favoritos})
}

const favoritoId=async (req,res)=>{
  const {_id}=req.params
  const favorito=await Favorito.find({idusuario:_id}).populate("idpelicula","titulo").populate("idusuario","nombre")
  res.json({favorito})
}

const favoritoPost=async(req,res)=>{
  const{idpelicula,idusuario}=req.body
  const favoritos= new Favorito({idpelicula,idusuario})
  favoritos.save()
  res.json({favoritos})
}

const favoritoDelete=async(req,res)=>{
  const {idpelicula}=req.query
  const favoritos=await Favorito.findOneAndDelete({idpelicula}) 
  res.json({
      msg:` ${favoritos} Ha sido eliminada`
  })
}

const tituloFav=async (req,res)=>{
  const {titulo}=req.params
  const favorito=await Favorito.find().populate("idpelicula",).populate("idusuario","nombre")
  res.json({favorito})
}



export {favoritoGet,favoritoPost,favoritoDelete,favoritoId,tituloFav}

