import express from 'express';
import { Ordenes } from '../controllers/ClassOrden';
import { verifyToken } from '../middleware/jwt';

const router = express.Router();

router.get('/', 
    verifyToken,
    Ordenes.getOrderById);

router.get('/:id', 
    verifyToken,
    Ordenes.getOrderByUserId);

router.post('/complete', 
    verifyToken,
    Ordenes.setOrderComplete);

export default router;