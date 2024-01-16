export class Endex {
    endexvalue: number
    endexdate: Date
    addedperson: string
    company: string

    constructor(endexvalue?: number, endexdate?: Date, addedperson?: string, company?: string) {
        this.endexvalue = endexvalue;
        this.endexdate = endexdate;
        this.addedperson = addedperson;
        this.company = company;
    }
}