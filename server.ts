import express from 'express'
import dotenv from 'dotenv';
import userRoutes from './src/api/user'
import vehicleRoutes from './src/api/vehicle'
import Routes from './src/api/routes'

dotenv.config()
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/users', userRoutes)
app.use('/vehicles', vehicleRoutes)
app.use('/routes', Routes)

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`)
})
