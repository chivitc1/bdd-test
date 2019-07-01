import Router from 'express';
import emailCtr from '../../controllers/emails';

var router = Router();
router.get('/driver/emails/:emailId',emailCtr.getEmailById)
export default router;