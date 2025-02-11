import express, { Request, Response } from "express";
import prisma from "../../primaClient";

const router = express.Router();

router.get('/:userId', async (req: Request, res: Response): Promise<any> => {
  const { userId } = req.params;
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { userId },
    });

    const routes = await prisma.route.findMany({
      where: { vehicleId: { in: vehicles.map((vehicle: any) => vehicle.id) } },
      include: {
        arrival: true,
        departure: true,
        vehicle: true,
      },
    });

    res.json(routes);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving routes' });
  }
});


router.post('/departure', async (req: Request, res: Response) => {
  const { vehicleId, latitude, longitude }: { vehicleId: string; latitude?: number; longitude?: number } = req.body.data;

  try {
    const route = await prisma.route.create({
      data: {
        vehicleId,
        timestamp: new Date(),
      },
    });

    const departure = await prisma.departure.create({
      data: {
        routeId: route.id,
        departedAt: new Date(),
        latitude,
        longitude,
      },
    });

    res.status(201).json({ route, departure });
  } catch (error) {
    res.status(500).json({ error: 'Error creating departure' });
  }
});
router.get('/departure/vehicle/:vehicleId', async (req: Request, res: Response): Promise<any> => {
  const { vehicleId } = req.params;
  try {
    const vehicle = await prisma.vehicle.findUnique({
      where: { id: vehicleId },
    });

    if (!vehicle) {
      return res.status(404).json({ error: 'Vehicle not found' });
    }

    const departures = await prisma.departure.findMany({
      where: { route: { vehicleId } },
      include: {
        route: {
          include: {
            vehicle: true,
          },
        },
      },
    });

    res.json(departures);
  } catch (error) {
    res.status(500).json({ error: 'Error retrieving departure route' });
  }
});


router.patch('/arrival/:routeId', async (req: Request, res: Response) => {

  const { routeId } = req.params;
  const { latitude, longitude }: { latitude?: number; longitude?: number } = req.body.data;
  try {
    const arrival = await prisma.arrival.create({
      data: {
        routeId,
        arrivedAt: new Date(),
        latitude,
        longitude,
      },
    });
    res.json(arrival);
  } catch (error) {
    res.status(500).json({ error: 'Error adding arrival.' });
  }
});



export default router;
