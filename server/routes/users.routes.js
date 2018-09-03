import { Router } from 'express'
import * as PostController from './../controllers/users.controllers'

const router = new Router()

router.route('/users').get(PostController.getUsers)

router.route('/users/:id').get(PostController.getUsersById)

router.route('/users').post(PostController.addUser)

router.route('/users/:id').post(PostController.updateUser)

export default router