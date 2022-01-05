import { string } from 'joi';
import Mongoose from 'mongoose';
import config from '../../config/config';
import {UserI, NewUserI} from './login.interfaces';

/*schemas para mongoose*/
const usersSchema = new Mongoose.Schema<UserI>({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type:String,
        required: true
    },
    direction: {
        type:String,
        required: true,
    },
    tel: {
        type: Number,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
    age: {
        type:Number,
        required: true,
    }
})


export class LoginFacebook  {
    private srv: string;
    private mongoModel: any;
    

    constructor() {
        /* hacer según un argumento de entrada */
        this.srv = config.MONGO_ATLAS_SRV;
        Mongoose.connect(this.srv)
        this.mongoModel = Mongoose.model<UserI>('user', usersSchema);
        
    }

    async getByEmail(email:string): Promise<UserI|null> {
        let output: UserI; //tipo de dato de ouput es UserI y lo asigna vacío
        const user: UserI[] = await this.mongoModel.find({email: email}).lean().exec();
        //para que lo convierta a JSON, uso lean(), sino es una query de mongoose

        return user? user[0] : null;       
    }


    async getAll(): Promise<UserI[]> {
        let output: UserI[] = []; //tipo de dato de ouput es UserI y lo asigna vacío
        output = await this.mongoModel.find({});
        return output; 
    }

    async set(data: NewUserI): Promise<UserI> {
        const user = new this.mongoModel(data);
        console.log('setUser');
        console.log(typeof user);
        await user.save();
        return user;
    } 

}