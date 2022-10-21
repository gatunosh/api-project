import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { generateJWT } from '../helpers/jwt';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        

        // const { id, first_name, last_name } = req;

        // const newToken = await generateJWT(id, first_name, last_name);
        
        // Success Response

        // context.res = {
        //     status: 500,
        //     body: {
        //         id: id,
        //         newToken,
        //         first_name,
        //         last_name
        //     }
        // };

        context.res = {
            status: 500,
            body: 'TODO'
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