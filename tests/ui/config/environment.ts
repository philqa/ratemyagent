import * as dotenv from 'dotenv';

dotenv.load();

const CONFIG = {
    environment: {}
};

const ENV_CONFIG = {
    prod: {
        baseUrl: 'https://www.ratemyagent.com.au',
        shortlistingApiUrl: 'https://api.ratemyagent.com.au/Users/Me/Shortlist/Agents',
        logoutUrl: 'https://ratemyagent.com.au/logout',
        data: {
            email: 'phillipmarkhicks@gmail.com',
            username: 'phillipmarkhicks',
            password: '********'
        }
    },
    test: {
        baseUrl: 'https://test.ratemyagent.com.au',
        shortlistingApiUrl: 'https://testapi.ratemyagent.com.au/Users/Me/Shortlist/Agents',
        logoutUrl: 'https://ratemyagent.com.au/logout',
        data: {
            email: 'phillipmarkhicks@gmail.com',
            username: 'phillipmarkhicks',
            password: '********'
        }
    },
    produsa: {
        baseUrl: 'https://ratemyagent.com',
        shortlistingApiUrl: 'https://api.ratemyagent.com/Users/Me/Shortlist/Agents',
        logoutUrl: 'https://ratemyagent.com/logout',
        data: {
            email: 'phillipmarkhicks@gmail.com',
            username: 'phillipmarkhicks',
            password: '********'
        }
    },
    testusa: {
        baseUrl: 'https://test.ratemyagent.com',
        shortlistingApiUrl: 'https://testapi.ratemyagent.com/Users/Me/Shortlist/Agents',
        logoutUrl: 'https://ratemyagent.com/logout',
        data: {
            email: 'phillipmarkhicks@gmail.com',
            username: 'phillipmarkhicks',
            password: '********'
        }
    },
    local: {
        baseUrl: 'https://localhost:8000',
        shortlistingApiUrl: 'https://localhost:8000/Users/Me/Shortlist/Agents',
        logoutUrl: 'https://localhost::8000/logout',
        data: {
            email: 'phillipmarkhicks@gmail.com',
            username: 'phillipmarkhicks',
            password: '********'
        }
    }
};

export function getConfig(env: string) {
    (<any>Object).assign(CONFIG, ENV_CONFIG[env]);
    return CONFIG;
}
