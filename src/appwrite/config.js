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

    async createCartItems(productName, productImg, productPrice, amount, ip){
        console.log(ip)
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                ID.unique(),
                {
                    productName,
                    productImg,
                    productPrice,
                    amount,
                    ip,
                }
            )
        } catch (error) {
            console.log("Appwrite serive :: createCartItems :: error", error.message);
        }
    }

    async updateCartProducts(slug, {productName, productImg, productPrice, amount}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    productName,
                    productImg,
                    productPrice,
                    amount,
                }
            )
        } catch (error) {
            alert("Appwrite serive :: updatePost :: error", error);
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
            alert("Appwrite serive :: deletePost :: error", error);
            return false
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

    async getCartData(ip){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                [
                    Query.startsWith("ip", ip)
                ]
            )
        } catch (error) {
            alert("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }

    // async getBlogData(){
    //     try {
    //         return await this.databases.listDocuments(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteBlogCollectionId,
    //             [
    //                 Query.orderDesc("date")
    //             ]
    //         )
    //     } catch (error) {
    //         alert("Appwrite serive :: getPosts :: error", error);
    //         return false
    //     }
    // }

    // async createOrder({name, address, email, phone, product, price}){
    //     try {
    //         return await this.databases.createDocument(
    //             conf.appwriteDatabaseId,
    //             conf.appwriteOrdersId,
    //             ID.unique(),
    //             {
    //                 name,
    //                 address,
    //                 email,
    //                 phone,
    //                 product,
    //                 price
    //             }
    //         )
    //     } catch (error) {
    //         alert("Appwrite serive :: createOrder :: error", error);
    //     }
    // }
}


const appwriteService = new Service()
export default appwriteService