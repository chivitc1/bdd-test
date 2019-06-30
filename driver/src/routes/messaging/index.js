import Router from 'express';
import messagingCtr from '../../controllers/messaging';

var router = Router();
router.use(function timeLog (req, res, next) {
  console.log('Time: ', new Date().toISOString());
  next();
}
);
router.post('/driver/messaging', messagingCtr.publishMessageToChannel)
export default router;