export class Contact {

    constructor(public _id?: string, public name: string = '',
        public email: string = '', public phone: string = '',
        public img: string = `https://robohash.org/${name}.png?set=set5`) {

    }

    setId?(length = 24) {
        let txt = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < length; i++) {
            txt += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        this._id = txt;
    }
}