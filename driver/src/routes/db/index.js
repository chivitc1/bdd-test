import Router from 'express';
import dbCtr from '../../controllers/db';

var router = Router();
router.post('/driver/db/seed', dbCtr.seed)
export default router;