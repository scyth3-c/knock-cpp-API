import { Request, Response, NextFunction } from "express";

const _newOption = ({body}: Request, res: Response, next: NextFunction) => {
    const {name, values, meta} = body;
    if(name && values && meta) next();
    else res.status(400).json("BAD PARAMS");
};

export default {
    _newOption
}