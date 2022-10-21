import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as _ from 'underscore';
import { User } from "../entities/User.entity";
import * as bcrypt from 'bcryptjs';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {

        const { id } = context.bindingData;

        const user = await User.findOne({where: {id}});

        if(!user) {
            context.res = {
                status: 400,
                body: "The user does not exist"
            }
            return;
        } 

        if(req.method === 'PUT') {

            // Filter the data from the body to not to send wrong data to the user when we
            // want to update it. 
            const bodyUpdate = _.pick(req.body, ['first_name', 'last_name', 'email', 'vat', 'password', 'is_active'])

            if (bodyUpdate.password) {
                const salt = bcrypt.genSaltSync();
                bodyUpdate.password = bcrypt.hashSync( bodyUpdate.password, salt );
            }

            User.update(user.id, bodyUpdate);

        } 
        if (req.method === 'DELETE') {
            user.is_active = false;
            user.save();
        }

        context.res = {
            body: {
                msg: 'The user has been modified sucessfully',
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