import * as uuidv4 from 'uuid/v4';
import {User} from '../model/user';
import request = require('request');

export class RandomData {

    async getRandomUser(): Promise<any> {
        await request.get('https://randomuser.me/api/?nat=AU&results=1', (error, response, body) => {
            if (error) {
                throw new Error(error);
            }
            if (response.statusCode === 200) {
                let data = body;
                if (typeof body === 'string') {
                    data = JSON.parse(body);

                }
                return data.results[0];
            }
        });
    }

    async getUser(domain: string): Promise<any> {
        let randomUser = await this.getRandomUser();
        let user = new User();
        let guid = uuidv4();
        if (domain) {
            user.email = 'automation-' + `${randomUser.name.first}.${randomUser.name.last}-${guid}@${domain}`;
        } else {
            user.email = 'automation-' + randomUser.Email;
        }
        user.firstName = randomUser.name.first;
        user.lastName = randomUser.name.last;
        user.mobile = randomUser.cell.replace(/-/g, '');
        console.log(user);
    }
}