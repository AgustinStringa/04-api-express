import { Response, Request, NextFunction } from "express";
function sanitizeCharacterInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    name: req.body.name,
    characterClass: req.body.characterClass,
    level: req.body.level,
    hp: req.body.hp,
    mana: req.body.mana,
    attack: req.body.attack,
    items: req.body.items,
  };
  //more checks here, data type, malicius content, operations, etc

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key];
    }
  });
  next();
}
export { sanitizeCharacterInput };
