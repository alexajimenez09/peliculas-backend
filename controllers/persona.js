import Usuario from "../models/persona.js"
import bcryptjs from "bcryptjs"
import { generarJWT } from "../middlewares/validarToken.js"

const usuarioGet= async(req,res)=>{  //listar todos
    const usuarios =await Usuario.find()
    res.json({
        usuarios
    })
}

const usuarioId= async(req,res)=>{ //listar por id
    const{_id}=req.query
    const usuario =await Usuario.findById(_id)
    res.json({
        usuario
    })
}

const usuarioEmail= async(req,res)=>{ //buscar por email
    const {email}=req.body
    const usuario =await Usuario.find(email)
    res.json({
        usuario
    })
}

const usuarioNombre= async(req,res)=>{//buscar por nombre
    const {nombre}=req.body
    const usuario =await Usuario.find(nombre)
    res.json({
        usuario
    })
}

const usuarioPut = async (req, res) => {   //modificar
    const { id } = req.params;  
    const { _id, createAt,...resto} = req.body;
    const modificar = await Usuario.findByIdAndUpdate(id,resto);

    res.json({
        modificar 
        
    })
}

const usuarioLogin= async(req,res)=>{ //login
    /* const{email,password}=req.query
    const usuario= await Usuario.findOne({email})
    const validar= bcryptjs.compareSync(password,usuario.password)
    if (validar)
        res.json({msg: "Bienvenido"})
    else
        res.json({msg:"Contraseña incorrecta"}) */

        const { email, password } = req.body;  

        try {
            const usuario = await Usuario.findOne({ email })
            if (!usuario) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }


            if (usuario.estado === 0) {
                return res.status(400).json({
                    msg: "Usuario Inactivo"
                })
            }

            const validPassword = bcryptjs.compareSync(password, usuario.password);
            if (!validPassword) {
                return res.status(400).json({
                    msg: "Usuario / Password no son correctos"
                })
            }

            const token = await generarJWT(usuario.id);

            res.json({
                usuario,
                token
            })

        } catch (error) {
            return res.status(500).json({
                msg: "Hable con el WebMaster"
            })
        }
}

const usuarioPost=async(req,res)=>{ //añadir
    const{nombre,apellido,email,password}=req.body
    const usuario= new Usuario({nombre,apellido,email,password})
    const salt= bcryptjs.genSaltSync(10)
    usuario.password=bcryptjs.hashSync(password,salt)
    usuario.save()
    res.json({usuario})
}

const usuarioDelete=async(req,res)=>{ //eliminar
    const {email}=req.query
    const persona=await Usuario.findOneAndDelete({email}) 
    res.json({
        msg:` Ha sido eliminada`
    })
}

const PutActivate=async (req, res) => {   
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:1});
  
    res.json({
        usuario
    })
}
  
const PutDeActivate=async (req, res) => {   
    const { id } = req.params;
    const usuarios = await Usuario.findByIdAndUpdate(id, {estado:0});
  
    res.json({
        usuarios
})
}

export {usuarioGet,usuarioId,usuarioNombre, usuarioPut, usuarioEmail, usuarioLogin,usuarioPost,usuarioDelete,PutActivate,PutDeActivate}