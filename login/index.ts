import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { User } from '../entities/User.entity';
import * as bcrypt from 'bcryptjs';
import { generateJWT } from '../helpers/jwt';
import { Equal } from "typeorm";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({where: {email: Equal(email)}});

        if(!user)  {
            context.res = {
                status: 400,
                body: {
                    msg: 'Email or password is not valid'
                }
            }
            return;
        }
        // Password match
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            context.res = {
                status: 400,
                body: {
                    msg: 'Email or password is not valid'
                }
            }
            return;
        }

        const token = await generateJWT(user.id, user.first_name, user.last_name)
        
        // Success Response

        context.res = {
            status: 200,
            body: {
                id: user.id,
                token,
                first_name: user.first_name,
                last_name: user.last_name
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