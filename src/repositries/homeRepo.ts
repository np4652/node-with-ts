import axios from "axios";
import { IHome } from "../interface/IHome";
import { injectable } from "inversify";

@injectable()
export class homeRepo implements IHome {
    async jsonplaceholder() {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
            return response.data;
        } catch (error) {
            return error
        }
    }
    
    async statusCheck() {
        throw new Error("Method not implemented.");
    }
}
