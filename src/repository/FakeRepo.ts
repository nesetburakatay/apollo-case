import { Endex } from "../entity/models/Endex";
import { User } from "../entity/models/User";

export class FakeRepo {
    public static fakedatabase: User[] = [
        { email: "burak", password: "1234", role: "admin" ,company:"a"},
        { email: "burakun", password: "1234", role: "abcd" ,company:"a"}
    ]
    public static fakeendexdatebase: Endex[] = [
        // {endexvalue: 100, endexdate: new Date("2021-10-4"), addedperson: "string", company: "string" },
        {endexvalue: 200, endexdate: new Date("2021-10-05"), addedperson: "string", company: "string" },
        {endexvalue: 300, endexdate: new Date("2021-10-06"), addedperson: "string", company: "string" },
        {endexvalue: 500, endexdate: new Date("2021-10-09"), addedperson: "string", company: "string" },
        {endexvalue: 600, endexdate: new Date("2021-10-10"), addedperson: "string", company: "string" },
        {endexvalue: 700, endexdate: new Date("2021-10-11"), addedperson: "string", company: "string" },
        {endexvalue: 800, endexdate: new Date("2021-10-12"), addedperson: "string", company: "string" },
        {endexvalue: 900, endexdate: new Date("2021-10-13"), addedperson: "string", company: "string" },
        {endexvalue: 1000, endexdate: new Date("2021-10-16"), addedperson: "string", company: "string" },
        {endexvalue: 1100, endexdate: new Date("2021-10-17"), addedperson: "string", company: "string" },
        {endexvalue: 1200, endexdate: new Date("2021-10-18"), addedperson: "string", company: "string" },
  

    ]
    // public static fakeendexdatebase: Endex[] = [
    //     {endexvalue: 1, endexdate: new Date("2021-10-12"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-10-11"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-09-16"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-11-22"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-06-06"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-05-07"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-02-12"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-07-23"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-04-16"), addedperson: "string", company: "string" },
    //     {endexvalue: 1, endexdate: new Date("2021-09-08"), addedperson: "string", company: "string" }
    // ]


}