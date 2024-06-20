import express from 'express';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/', userController.createUser);
router.post('/fund', userController.fundAccount);
router.post('/transfer', userController.transferFunds);
router.post('/withdraw', userController.withdrawFunds);

export default router;
