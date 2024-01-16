export class User {
    email:string
    password:string
    company:string
    role:string

    constructor(email?:string,password?:string,company?:string) {
        this.company=company;
        this.email=email;
        this.password=password;
    }
}