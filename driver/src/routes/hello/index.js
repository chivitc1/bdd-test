import Router from 'express';
import helloCtr from '../../controllers/hello';

var router = Router();
router.use(function timeLog (req, res, next) {
  console.log('Time: ', new Date().toISOString());
  next();
}
);
router.get('/hello', helloCtr.sayHello)
export default router;