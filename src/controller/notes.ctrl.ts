import Task from "../model/task";

const _default = (req: any, res: any): void =>
  res.json({ ruta: "/notes", info: "knock-api " });

const _new = async (req: any, res: any, next: any) => {
  res.setHeader("Content-Type", /json/);
  try {
    const nota = new Task({
      nombre: req.body.nombre,
      conten: req.body.conten,
      author: req.body.author || "kevin",
    });
    await nota.save();
    res.json("todo ok");
  } catch (error) {
    res.status(400).json("datos incompletos");
  }
};
const _recollector = async (req: any, res: any) => {
  const result = await Task.find();
  res.setHeader("Content-Type", /json/);
  res.json(result);
  res.end();
};
const _items = async (req: any, res: any) => {
  const items = await Task.countDocuments();
  res.setHeader("Content-Type", /json/);
  res.json({ items: items }).status(200);
  res.end();
};

const _delete = async (req: any, res: any, next: any) => {
  res.setHeader("Content-Type", /json/);
  try {
    const resolve = await Task.findByIdAndDelete(req.query.id as string);
    if (resolve) {
      res.status(200).json("todo ok");
    }
  } catch (error) {
    res.status(400).json("error, no encontrado!");
  }
  res.end();
};

const _show = async (req: any, res: any, next: any) => {
  let id = req?.query?.id.toString();
  res.setHeader("Content-Type", /json/);
  try {
    const resolve = await Task.findOne({ _id: id });
    if (resolve) {
      res.status(200).json(resolve);
    }
  } catch (error) {
    res.status(400).json("no encontrado!");
  }
  res.end();
};

const _last = async (req: any, res: any) => {
  res.setHeader("Content-Type", "text");
  const aux: any = await Task.find().limit(1).sort({ $natural: -1 });
  const last = aux._id;
  res.send(last);
};

export { _default, _new, _recollector, _items, _delete, _show, _last };
