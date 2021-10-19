export class User {

    public image: string;
    public password: string;
    public isLoggedIn: boolean;
    
    constructor(public name: string, public coins: number, public moves: [] ) {
        this.image = 'https://robohash.org/default-user.png?set=set5';
        this.isLoggedIn = false;
        this.password = '';
    }
}