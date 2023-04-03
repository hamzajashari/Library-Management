import { Role } from "./User";

export class UserToken {
    public sub!: any;
    public username!: string;
    public role!: string;
    
    constructor() { }
  }