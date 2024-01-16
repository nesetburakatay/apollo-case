import express, { Request, Response } from "express";

var router = express.Router();

const myList = [
  {
    id: 1,
    name: "burak"
  },
  {
    id: 2,
    name: "elifcan"
  }
]



/* GET users listing. */
router.get('/', function (req: Request, res: Response, next: any) {
  res.send(myList);
});
router.post('/', function (req: Request, res: Response, next: any) {
     if (req.body) {
      console.log(req.body);
      
     }
      res.send("sss");
});


module.exports = router;
