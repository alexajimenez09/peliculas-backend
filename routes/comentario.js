import {Router} from "express"
import { comentarioGet, comentarioPost, comentarioDelete,comentarioId,buscarComentario,comentarioUsuario} from "../controllers/comentario.js"

const router=new Router()

router.get('/:_id',comentarioId)

router.get('/comentarios',comentarioGet)

router.post('/', comentarioPost)

router.delete('/eliminar',comentarioDelete)

router.get('/:comentario',buscarComentario)

router.get('/:_id',comentarioUsuario)

export default router