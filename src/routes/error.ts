import express from 'express';

const router = express.Router();

router.get('*', (req, res) => {
    res.status(404).json({error: 'Ruta no implementada'});
  });

export default router;