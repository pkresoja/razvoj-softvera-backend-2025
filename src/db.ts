import { DataSource } from "typeorm";
import { Article } from "./entities/Article";
import { Client } from "./entities/Client";
import { Invoice } from "./entities/Invoice";
import { InvoiceArticle } from "./entities/InvoiceArticle";
import { Model } from "./entities/Model";
import { User } from "./entities/User";
import { Vehicle } from "./entities/Vehicle";

export const AppDataSource = new DataSource({
    type: 'mysql',
    host: 'contabo.pequla.com',
    port: 3306,
    username: 'singidunum',
    password: 'singidunum',
    database: 'fir_rs_2025',
    entities:[
        Article, Client, Invoice, InvoiceArticle, Model, User, Vehicle
    ],
    logging: false
})
