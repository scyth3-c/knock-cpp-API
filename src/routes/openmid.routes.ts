import { Router } from 'express'
import * as ctrls from '../controller/openmid.ctrl';
import midds from '../middleware/midd'
let router : Router = Router();


/* The code block you provided is defining different routes for a router object in an Express
application. */

router.get('/search', midds.noVloc ,ctrls._search)
router.post('/send', midds.NewOpenmoid,ctrls._send)
router.delete('/delete',midds.noVloc,  ctrls._delete)
router.put('/update',midds.noVloc, midds.NewOpenmoid, ctrls._update)

module.exports = router