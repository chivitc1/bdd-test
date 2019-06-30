import Router from 'express';
import emailCtr from '../../controllers/emails';

var router = Router();
router.post('/driver/emails/thread', emailCtr.createEmailThread)
router.get('/driver/emails/:emailId',emailCtr.getEmail)
export default router;