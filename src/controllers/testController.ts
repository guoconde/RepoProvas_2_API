import { Request, Response } from "express";
import { prisma } from "../database.js";
import testService from "../services/testService.js";

async function find(req: Request, res: Response) {
  const { groupBy, search } = req.query as { groupBy: string; search: string };

  incrementViews();

  if (groupBy !== "disciplines" && groupBy !== "teachers") {
    return res.sendStatus(400);
  }

  const tests = await testService.find({ groupBy }, search);
  res.send({ tests });
}

export default {
  find,
};

async function incrementViews() {
  const teste = await prisma.test.findMany();

  console.log(teste);
}
