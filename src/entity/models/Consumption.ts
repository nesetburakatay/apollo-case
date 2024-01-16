export class Consumption {
    date:Date
    dailyConsumption:number
    company:string

    constructor(date?: Date, dailyConsumption?: number, company?: string) {
        this.date = date;
        this.dailyConsumption = dailyConsumption;
        this.company = company;
      }
}