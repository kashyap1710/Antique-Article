const conf = {
    appwrite: (import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: (import.meta.env.VITE_APPWRITE_PROJECT),
    appWriteDatabse: (import.meta.env.VITE_APPWRITE_COLLECTION),
    appwriteCollectionId: (import.meta.env.VITE_APPWRITE_KEY),
    appwriteBucketId: (import.meta.env.VITE_APPWRITE_ENDPOINT)
}

export default conf
