import {Schema,model,models} from "mongoose";

const UserSchema = new Schema ({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    password :{
        type : String,
        required:true
    },
    role:{
        type:String,
        enum :["Agent","Admin"],
        default:"Agent",
    }


},{timestamps:true,collection:"UserData"});

const User = models.User || model("User",UserSchema);
export default User;
