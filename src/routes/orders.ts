import express from 'express';
import { Ordenes } from '../controllers/ClassOrden';
import { verifyToken } from '../middleware/jwt';

const router = express.Router();

router.get('/', 
    verifyToken,
    Ordenes.getOrderByUserId);

router.get('/:orderId', 
    verifyToken,
    Ordenes.getOrderById);

router.post('/complete', 
    verifyToken,
    Ordenes.setOrderComplete);

export default router;