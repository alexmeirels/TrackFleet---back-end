import express, { Request, Response, Router } from "express";
import prisma from "../../primaClient";

const router = express.Router();

router.post("/google-login", async (req: Request, res: Response): Promise<any> => {

  try {
    const { id, name, email } = req.body.data;

    let user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      user = await prisma.user.create({
        data: { id, name, email },
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to authenticate user" });
  }
});

export default router;