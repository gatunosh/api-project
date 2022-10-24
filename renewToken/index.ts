import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as jwt from 'jsonwebtoken';
import { generateJWT } from '../helpers/jwt';

interface JWTPayLoad {
    id: number;
    first_name: string;
    last_name: string;
};

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {

        const token = req.headers['x-token'];

        if (!token) {
            context.res = {
                status: 401,
                body: "Token is required"
            }
            return;
        }

        const seed = process.env.SECRET_JWT_SEED;

        const { id, first_name, last_name } = jwt.verify(token, seed) as JWTPayLoad;


        const newToken = await generateJWT(id, first_name, last_name);
        
        // Success Response

        context.res = {
            status: 200,
            body: {
                id,
                token: newToken,
                first_name,
                last_name
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