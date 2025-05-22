import { DataSource } from "typeorm";
import { Article } from "./entities/Article";
import { Client } from "./entities/Client";
import { Invoice } from "./entities/Invoice";
import { InvoiceArticle } from "./entities/InvoiceArticle";
import { Model } from "./entities/Model";
import { User } from "./entities/User";
import { Vehicle } from "./entities/Vehicle";
import { configDotenv } from "dotenv";

configDotenv()
export const AppDataSource = new DataSource({
    type: 'mysql',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) ?? 3306,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities:[
        Article, Client, Invoice, InvoiceArticle, Model, User, Vehicle
    ],
    logging: false
})
