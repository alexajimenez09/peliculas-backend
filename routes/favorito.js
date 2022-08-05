import {Router} from "express"
import { favoritoGet,favoritoPost,favoritoDelete,favoritoId,tituloFav} from "../controllers/favorito.js"

const router=new Router()

router.get('/buscar',favoritoGet)

router.post('/', favoritoPost)

router.delete('/eliminar',favoritoDelete)

router.get('/:_id',favoritoId)

router.get('/:titulo',tituloFav)


export default router