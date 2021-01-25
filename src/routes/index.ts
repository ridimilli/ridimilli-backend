import * as express from 'express';
import * as apiController from '../controller/apiControllers';

const router: express.Router = express.Router();

router.get('/api', apiController.naverAPI);
router.get('/api/crawling', apiController.crawling);

export default router;
