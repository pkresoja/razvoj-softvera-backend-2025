import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { AppDataSource } from './db'
import { ClientRoute } from './routes/client.route'
import { ArticleRoute } from './routes/article.route'
import { InvoiceRoute } from './routes/invoice.route'
import { ModelRoute } from './routes/model.route'
import { VehicleRoute } from './routes/vehicle.route'
import { configDotenv } from 'dotenv'

const app = express()
configDotenv()
app.use(express.json())
app.use(cors())
app.use(morgan('short'))

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
        const port = Number(process.env.SERVER_PORT) ?? 3000
        app.listen(port, () =>
            console.log(`Listening on port ${port}`)
        )
    })
    .catch(e => console.log(e))

app.use('/api/client', ClientRoute)
app.use('/api/article', ArticleRoute)
app.use('/api/invoice', InvoiceRoute)
app.use('/api/model', ModelRoute)
app.use('/api/vehicle', VehicleRoute)