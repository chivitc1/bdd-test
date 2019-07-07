import Router from 'express';
import helloCtr from '../../controllers/hello';

const router = Router();
router.get('/driver/hello', helloCtr.sayHello)
router.patch('/driver/hello', helloCtr.updateHello)
export default router;