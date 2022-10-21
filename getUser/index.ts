import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User } from '../entities/User.entity';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {

        const { id } = context.bindingData;

        const user = await User.findOne({where: {id, is_active: true}});

        if(!user) {
            context.res = {
                status: 400,
                body: "The user does not exist"
            }
            return;
        }

        context.res = {
            body: {
                user
            }
        }

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