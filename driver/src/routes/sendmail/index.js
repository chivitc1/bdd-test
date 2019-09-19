/**
 * @author chinv
 */

import Router from 'express';
import sendmailCtr from '../../controllers/sendmail';

var router = Router();

router.post('/driver/sendmail', sendmailCtr.send)
export default router;