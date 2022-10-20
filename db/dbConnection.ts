import { DataSource } from 'typeorm';
import { User } from '../entities/User.entity';

const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.AZURE_HOST_SERVER,
    port: Number(process.env.PORT),
    username: process.env.AZURE_DB_USERNAME,
    password: process.env.AZURE_DB_PASSWORD,
    database: process.env.AZURE_DB_NAME,
    entities: [
        User
    ],
    extra: {
        trustServerCertificate: true
    },
    synchronize: true,
    
});

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    })