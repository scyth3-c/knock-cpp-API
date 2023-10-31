import { Router } from 'express'
import {openmid} from '../controller/web/openmid.ctrl';
import {middleware} from '../middleware/midd'
let router : Router = Router();


/* The code block you provided is defining different routes for a router object in an Express
application. */

router.get('/search', middleware.noVloc ,openmid._search);
router.post('/send', middleware.NewOpenmoid,openmid._send);
router.delete('/delete',middleware.noVloc,  openmid._delete);
router.put('/update',middleware.noVloc, middleware.NewOpenmoid, openmid._update);
router.get("/find", openmid._find);

module.exports = router