import conf from '../conf/conf.js';
import { Client, ID, Databases, Query } from "appwrite";

export class Service{
    client = new Client();
    databases;
    
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
    }

    async createCartItems(name, price, userID, img, amount){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    name,
                    price,
                    userID,
                    img,
                    amount,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createCartItems :: error", error.message);
        }
    }

    async updateCartProducts(slug, {amount}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    amount
                }
            )
        } catch (error) {
            return error.message
        }
    }

    async deleteCartItem(postId){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                postId
            )
            return true
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            // return false
        }
    }

    async getUserInfo(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            alert("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    async getCartData(userID){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.equal("userID", userID)
                ]
            )
        } catch (error) {
            console.log("Appwrite serive :: getCartData :: error", error);
            
        }
    }
}


const appwriteService = new Service()
export default appwriteService