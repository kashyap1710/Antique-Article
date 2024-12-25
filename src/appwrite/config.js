import conf from "../config/conf";
import { Client, ID, Databases, Storage, Query } from "appwrite";   

export class Service{

    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
        .setEndpoint(conf.appwrite.endpoint)
        .setProject(conf.appwrite.project)
        this.database = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userID}){
        try {
            return await this.databases.createDocument(
                conf.appwriteCollectionId,
                conf.appWriteDatabse,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
        } catch (error) {
            console.log("Appwrite Service :: createPost :: error ", error);
           
        }
    }

    async updatePost(slug, {title, content, featuredImage, status, userID, documentID}){
        try {
            return await this.databases.updateDocument(
            conf.appWriteDatabse,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        ) 
        } catch (error) {
            console.log("Appwrite Service :: updatePost :: error ", error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocmument(
                conf.appWriteDatabse,
                conf.appwriteCollectionId,
                slug,
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deletePost :: error ", error);
            return false;
        }
    }

    async getPost(queries = [Query.equal("status" , "active")]){
        try {
            return await this.databases.listDocuments(
                conf.appWriteDatabse,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("Appwrite Service :: getPost :: error ", error);
        }
    }

    // file upload service

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("Appwrite Service :: uploadFile :: error ", error);
        }
        return false;
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite Service :: deleteFile :: error ", error);
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
}

const service = new Service();  
export default service;

