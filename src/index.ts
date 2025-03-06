import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { AppDataSource } from './db'
import { ClientRoute } from './routes/client.route'
import { ArticleRoute } from './routes/article.route'
import { InvoiceRoute } from './routes/invoice.route'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan('short'))

AppDataSource.initialize()
    .then(() => {
        console.log('Connected to database')
        const port = 44000
        app.listen(port, () =>
            console.log(`Listening on port ${port}`)
        )
    })
    .catch(e => console.log(e))

app.use('/api/client', ClientRoute)
app.use('/api/article', ArticleRoute)
app.use('/api/invoice', InvoiceRoute)