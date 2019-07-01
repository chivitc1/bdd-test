import Router from 'express';
import messagingCtr from '../../controllers/messaging';

var router = Router();

router.post('/driver/messaging', messagingCtr.publishMessageToChannel)
export default router;