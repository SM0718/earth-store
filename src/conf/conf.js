const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteBlogCollectionId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_BLOG),
    appwriteOrdersId: String(import.meta.env.VITE_APPWRITE_COLLECTION_ID_ORDERS)
}

export default conf