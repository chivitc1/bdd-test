import Router from 'express';
import emailCtr from '../../controllers/emails';

var router = Router();
router.use(function timeLog (req, res, next) {
  console.log('Time: ', new Date().toISOString());
  next();
}
);
router.post('/driver/emails/thread', emailCtr.createEmailThread)
export default router;