import {Router} from "express";
import {options} from "../controller/web/options.ctrl";

// middleware
import {middleware} from "../middleware/midd"
import opts from "../middleware/perEntity/options"

let router : Router = Router();


router.get("/options/one", middleware.noID ,options._findone);
router.get("/options", options._find);
router.post("/options", opts._newOption, options._new);
router.put("/options", middleware.noID, opts._newOption,  options._update);
router.delete("/options", middleware.noID, options._delete);

module .exports = router; 