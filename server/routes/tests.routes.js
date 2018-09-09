import { Router } from 'express'
import * as PostController from './../controllers/tests.controllers'

const router = new Router()

router.route('/tests').post(PostController.setTest)// айди юзера, номер теста, кол-во попыток, ответ

export default router