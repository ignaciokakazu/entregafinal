import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../../../config/config';
import {UserI, NewUserI, DireccionE} from '../../../interfaces/login.interfaces';
import { infoLogger } from '../../../services/logger';
import { boolean } from 'joi';

/* schemas para mongoose */
const usersSchema = new Mongoose.Schema<UserI>({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    surname: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    username: {
        type: String,
        required: true,
        unique: true,
        min: 3,
        max: 50
    },
    password: {
        type:String,
        required: true,
        min: 8,
        max: 20
    },
    tel: {
        type: Number,
        required: true
    },
    admin: {
        type: Boolean,
        required: false,
        default: false
    },
    direccion: {
        type: {
            calle: {
                type: String,
                required: true,
                min: 3,
                max: 50
            },
            altura: {
                type: Number,
                required: true,
                min:1
            },
            codigoPostal: {
                type: String,
                required: true,
                min: 3,
                max: 50
            },
            piso: {
                type: Number,
                required: false,
                default: 0,
                min: 1
            },
            departamento: {
                type: String,
                required: false,
                default: ''
            }
        }
    }
})




export class LoginAtlasDAO  {
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
        const user: UserI[] = await this.mongoModel.find({username: email}).lean().exec();
        //para que lo convierta a JSON, uso lean(), sino es una query de mongoose
        infoLogger.info(`User log ${email}`)
        return user? user[0] : null;       
    }

    
    async get(id?: string): Promise<UserI[]> {
        let output: UserI[] = [];
        try {
          if (id) {
            const document = await this.mongoModel.findById(id);
            if (document) output.push(document);
          } else {
            output = await this.mongoModel.find();
          }
          infoLogger.log(output)
          return output;
        } catch (err) {
          return output;
        }
      }

    async getAll(): Promise<UserI[]> {
        let output: UserI[] = []; //tipo de dato de ouput es UserI y lo asigna vacío
        output = await this.mongoModel.find({});
        return output; 
    }

    async addUser(data: NewUserI): Promise<UserI> {
        const user = new this.mongoModel(data);
        infoLogger.info(`New user ${data}`)
        await user.save();
        return user;
    } 

    async validatePassword(email:string, password:string): Promise<boolean> {
        infoLogger.log('entro al validate ')
        //auth por Mongo
        try {
        
        // buscar en Mongo
        const userMongo = await this.mongoModel.find({username: email}).lean().exec();
        infoLogger.log(userMongo[0].password)
        const compare = await bcrypt.compare(password, userMongo[0].password)
        infoLogger.log('compare ')
        infoLogger.log(compare)
        return compare
        
        } catch (e:any) {
            infoLogger.warn(e.message)
            return false
        }
    }

    async findById(id:any) {
        return this.mongoModel.findById(id)
    }

}