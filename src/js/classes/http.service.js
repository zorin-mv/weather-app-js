import env from '../environment'

export default class Http {

    constructor() {
        this.url = env.url;
    }

    get(path) {
        return fetch(`${this.url}${path}`);
    }
    
}
