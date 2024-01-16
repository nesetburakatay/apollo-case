import "reflect-metadata";
import { injectable } from "tsyringe";
import { User } from "../entity/models/User";
import { FakeRepo } from "./FakeRepo";
import sequelizeconfig from "../../sequelize/sequelizeconfig";
import { QueryTypes } from "sequelize";

@injectable()
export default class AuthRepository {
    async add(user: User): Promise<User> {

        let a = await sequelizeconfig.query(
            `INSERT INTO users (Email, Password, Company, Role) VALUES ('${user.email}', '${user.password}', '${user.company}', '${user.role}')`,
            { type: QueryTypes.INSERT });
        // FakeRepo.fakedatabase.push(user)
        return user;
    }
    async getall(): Promise<User[]> {


        let tempUsers = await sequelizeconfig.query<User>(
            `SELECT * FROM users`,
            { type: QueryTypes.SELECT });

        return tempUsers
    }
    async getFirstOrUndefined(_predicate: (value: User, index: number, array: User[]) => unknown, thisArg?: any): Promise<User> {
        

        let tempUsers = await sequelizeconfig.query<User>(
            `SELECT * FROM users`,
            { type: QueryTypes.SELECT });

        var a =tempUsers.find(_predicate);


        return tempUsers.find(_predicate);
    }

}