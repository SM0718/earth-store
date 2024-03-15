import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async phoneLogin({number}) {
        try {
            const sessionId = ID.unique();
            const sessionToken = await this.account.createPhoneSession(sessionId, number);

            if (sessionToken) {
                return sessionToken.userId;
            }
        } catch (error) {
            alert("Appwrite service :: phoneLogin :: error", error);
            throw error;
        }
    }

    async phoneSession({userId, secretCode}){
        try {
            const session = await this.account.updatePhoneSession(userId, secretCode)
            if(session){
                return session
            }
        } catch (error) {
            alert("Appwrite serive :: phoneSession :: error", error);
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            alert("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService


