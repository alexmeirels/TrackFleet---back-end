import express, { Request, Response } from "express";
import prisma from "../../primaClient";

const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { plate, userId, description } = req.body.data;

    const vehicle = await prisma.vehicle.create({
      data: { plate, userId, description },
    });

    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register vehicle" });
  }
});


router.get("/user/:userId", async (req: Request, res: Response) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { userId: req.params.userId },
    });

    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve vehicles" });
  }
});

export default router;
