import * as jwt from 'jsonwebtoken';

export const generateJWT = ( id: number, first_name: string, last_name:string ) => {

    const payload = {
        id,
        first_name,
        last_name
    }

    return new Promise((resolve, reject) => {
        jwt.sign( payload, process.env.SECRET_JWT_SEED!, {
            expiresIn: '24h'
        }, (err, token) => {
            if (err) {
                console.log(err);
                reject(err);
            } else {
                resolve(token);
            }
        });
    });

}