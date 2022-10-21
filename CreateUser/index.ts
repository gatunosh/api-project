import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as bcrypt from 'bcryptjs';
import { User } from '../entities/User.entity';
import { generateJWT } from "../helpers/jwt";
import '../db/dbConnection';


const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
     
    try {

        if (!req.body) {
            context.res = {
                status: 400,
                body: "Please pass a request body"
            }
            return;
        }

        const { email, password, first_name, last_name, vat } = req.body;

        if (!email || !password || !first_name || !last_name) {
            context.res = {
                status: 400,
                body: "Please pass a email, password, first_name, last_name"
            }
            return;
        }

        // Verify Email and Vat
        let user = await User.findOne({where: {email}});
        if(user) {
            context.res = {
                status: 400,
                body: "The email is already registered"
            }
            return;
        } 

        user = await User.findOne({where: {vat}});
        if(user) {
            context.res = {
                status: 400,
                body: "The vat is already registered"
            }
            return;
        } 

        // Create user object
        const dbUser = User.create(req.body);

        // Hash password
        const salt = bcrypt.genSaltSync();
        dbUser.password = bcrypt.hashSync( password, salt );

        // Generate JWT

        const token = await generateJWT(dbUser.id, dbUser.first_name, dbUser.last_name)

        await dbUser.save()

        // Success Response
        context.res = {
            body: {
                id: dbUser.id,
                token,
                name: `${dbUser.first_name} ${dbUser.last_name}`
            }
        };

        
    } catch (error) {
        
        if (error instanceof Error) {
            context.res = {
                status: 500,
                body: error.message
            };
        }
    }

};

export default httpTrigger;