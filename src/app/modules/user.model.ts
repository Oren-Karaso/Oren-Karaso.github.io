export class User {

    public image: string;
    
    
    constructor(public name: string, public coins: number, public moves: []) {
        this.image = `https://robohash.org/${name}.png?set=set5`;
    }
}