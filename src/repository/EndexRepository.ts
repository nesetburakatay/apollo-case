import "reflect-metadata";
import { injectable } from "tsyringe";
import { User } from "../entity/models/User";
import { FakeRepo } from "./FakeRepo";
import { Endex } from "../entity/models/Endex";
import sequelizeconfig from "../../sequelize/sequelizeconfig";
import { QueryTypes } from "sequelize";

@injectable()
export default class EndexRepository {
    async add(endex: Endex): Promise<Endex> {
        debugger
        let a = await sequelizeconfig.query(
            `INSERT INTO endexs (endexvalue, endexdate, addedperson, company) VALUES ('${endex.endexvalue}', '${endex.endexdate}', '${endex.addedperson}', '${endex.company}')`,
            { type: QueryTypes.INSERT });
        // FakeRepo.fakeendexdatebase.push(endex);      
        return endex;
    }
    async remove(endex: Endex): Promise<Endex> {
        // debugger
        // let a = await sequelizeconfig.query(
        //     `INSERT INTO endexs (endexvalue, endexdate, addedperson, company) VALUES ('${endex.endexvalue}', '${endex.endexdate}', '${endex.addedperson}', '${endex.company}')`,
        //     { type: QueryTypes.INSERT });
        // // FakeRepo.fakeendexdatebase.push(endex);      
        // return endex;
        debugger

        let a = await sequelizeconfig.query(
            `DELETE FROM endexs WHERE
             endexdate = '${endex.endexdate}' 
             AND 
             company='${endex.company}';`,
            { type: QueryTypes.DELETE });


        // let a = await sequelizeconfig.query('DELETE FROM "YourModels" WHERE your_condition_field = :yourCondition', {
        //     // replacements: { yourCondition: condition.yourConditionValue },
        //     type: QueryTypes.DELETE
        // })
        //            SET SQL_SAFE_UPDATES = 0;




        return endex;
    }
    async getall(): Promise<Endex[]> {


        let tempEndexs = await sequelizeconfig.query<Endex>(
            `SELECT * FROM endexs`,
            { type: QueryTypes.SELECT });

        return tempEndexs;
    }
    // async getallwithpredicate(_predicate: (value: Endex, index: number, array: Endex[]) => unknown, thisArg?: any):Promise<Endex[]>{
    //     debugger

    //     let tempEndexs = await sequelizeconfig.query<Endex>(
    //         `SELECT * FROM endexs `,
    //         { type: QueryTypes.SELECT });

    //     // var a =FakeRepo.fakeendexdatebase.filter(_predicate);
    //     let a =tempEndexs.filter(_predicate);

    //     return tempEndexs.filter(_predicate);
    // }
    async getallwithpredicate(company: string): Promise<Endex[]> {


        let tempEndexs = await sequelizeconfig.query<Endex>(
            `SELECT * FROM endexs where company='${company}'`,
            { type: QueryTypes.SELECT });

        // var a =FakeRepo.fakeendexdatebase.filter(_predicate);

        return tempEndexs;
    }
    async precheck(endex:Endex): Promise<boolean> {


        let tempEndexs = await sequelizeconfig.query<Endex>(
            `SELECT * FROM endexs where 
            endexdate = '${endex.endexdate}' 
            AND 
            company='${endex.company}';
            `,
            { type: QueryTypes.SELECT });
            

            if (tempEndexs.length>0) {
                return true;
            }
            return false;
        
    }
    getFirstOrUndefined(_predicate: (value: User, index: number, array: User[]) => unknown, thisArg?: any): Endex {
        // return FakeRepo.fakedatabase.find(_predicate);
        return null;
    }

}