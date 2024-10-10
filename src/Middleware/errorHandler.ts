import { Request, Response} from "express";

export function globalErrorHandler(err: any, _: Request, res: Response) {
  switch(err) {
    case err.message === "BadRequest":
      return res.status(400).json({message: "Missing required word!"});

    default:
      return res.status(500).json({message: err.message || "Internal Server Error"});
  }
}