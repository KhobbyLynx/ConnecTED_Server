import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import apiRoutes from './routes'

const app = express()

const allowedOrigins = [
	process.env.CLIENT_URL,
].filter(Boolean) as string[]

// Middleware
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())
app.use(
	cors({
		origin: allowedOrigins
	})
)

// Routes
app.use('/api', apiRoutes)

export default app
