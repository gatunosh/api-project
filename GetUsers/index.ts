import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User } from "../entities/User.entity";
import '../db/dbConnection';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    
    try {

        const take: number = Number(req.query.take) || 5;
        const skip: number = Number(req.query.skip) || 0;

        const [users, count] = await User.findAndCount({
            where: { is_active: true },
            order: { first_name: "ASC" },
            take: take,
            skip: skip
        });
                                        

        context.res = {
            body: {
                users,
                total: count
            }
        }
        
    } catch (error) {
        if (error instanceof Error) {
            context.res = {
                status: 500,
                body: error.message
            } 
        }
    }

};

export default httpTrigger;