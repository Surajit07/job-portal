import mongoose from "mongoose";

export async function connectToDB(users) {
   try {
    return mongoose.connect(users);
   } catch(error){
    console.error("Error connecting to mongoDB",error)
   }
    
};