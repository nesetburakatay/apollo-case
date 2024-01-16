import "reflect-metadata";
import { ValidateUserResult } from "../entity/dto/ValidateUserResult";
import { User } from "../entity/models/User";
import jwt from 'jsonwebtoken';
import { container, injectable } from "tsyringe";
import AuthRepository from "../repository/AuthRepository";
import EndexRepository from "../repository/EndexRepository";
import { Endex } from "../entity/models/Endex";
import { Consumption } from "../entity/models/Consumption";

@injectable()
export default class EndexService {
    private _endexRepository: EndexRepository;

    constructor() {
        this._endexRepository = container.resolve(EndexRepository);
    }




    async AddEndex(newEndex: Endex): Promise<Consumption[]> {
        debugger

        
        let isavailible =this._endexRepository.precheck(newEndex);
        if (isavailible) {
            await this.RemoveEndex(newEndex);
        }

        let addedendex = await this._endexRepository.add(newEndex);
        //let endexList = await this._endexRepository.getallwithpredicate(x => x.company == newEndex.company);
        let endexList = await this._endexRepository.getallwithpredicate(newEndex.company);
        
        let tempConsumptionList = this.CalculateConsumption([...endexList])
        debugger


        return tempConsumptionList;
    }
    async RemoveEndex(removeEndex: Endex): Promise<Consumption[]> {
        debugger

        let addedendex = await this._endexRepository.remove(removeEndex);
        //let endexList = await this._endexRepository.getallwithpredicate(x => x.company == newEndex.company);
        let endexList = await this._endexRepository.getallwithpredicate(removeEndex.company);
        
        let tempConsumptionList = this.CalculateConsumption([...endexList])
        debugger


        return tempConsumptionList;
    }

    GetAllEndex() {
        this._endexRepository.getall();
    }

    private CalculateConsumption(endexList: Endex[]):Consumption[] {
        debugger
        endexList.forEach(x=>{
            x.endexdate=new Date(x.endexdate);
        })
        let consumptionList: Consumption[] = [];

        
        let sortedEndexList = endexList.sort((a, b) => b.endexdate.getTime() - a.endexdate.getTime());

        //sortedEndexList.forEach(element => { console.log(element.endexdate.toUTCString()) });



        
        for (let i = 0; i < sortedEndexList.length - 1; i++) {

            let zzz =sortedEndexList[i].endexdate;
            let aaa =sortedEndexList[i + 1].endexdate;

            let dateDiff = this.dateDifferenceInDays(sortedEndexList[i].endexdate, sortedEndexList[i + 1].endexdate);

            if (dateDiff > 1) {
                let dividedValue=(sortedEndexList[i].endexvalue -sortedEndexList[i+1].endexvalue)/dateDiff;
                
                for (let k = 0; k < dateDiff; k++) {
                    let tempDate= new Date(new Date(sortedEndexList[i].endexdate).toISOString())
                   

                    // var ll=tempDate.toUTCString();
                    // var l2=tempDate.toISOString()
                    // var l3 = tempDate.toDateString()
                     var l4 = tempDate.setUTCDate((tempDate.getUTCDate()-k))
                   
                 
                   consumptionList.push(
                    new Consumption(
                        new Date(l4),
                        dividedValue,
                        sortedEndexList[i].company
                    ))  
                }
            }
            else {
                consumptionList.push(
                    new Consumption(
                        new Date(new Date(sortedEndexList[i].endexdate).toISOString()),
                        (sortedEndexList[i].endexvalue -sortedEndexList[i+1].endexvalue),
                        sortedEndexList[i].company
                    ))
            }

            // console.log(dateDiff);
            // console.log(consumptionList[i]);

        }


        // console.log(consumptionList);
        
        
        return consumptionList

    }
    private dateDifferenceInDays(date2: Date, date1: Date) {
        const timestamp1 = date1.getTime();
        const timestamp2 = date2.getTime();

        const differenceInMilliseconds = timestamp2 - timestamp1;

        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        return Math.floor(differenceInDays);
    }

}
