const express = require("express")
var fs = require("fs");
var url = require("url");
const app = express();
const port = 3001;


try
{
const jsonFile = JSON.parse(fs.readFileSync("./utils/main.json"));



app.use((req,res,next)=>{

    try
    {
 
    let result =  jsonFile.find((el)=>{

       let path =  url.parse(el.url).pathname

       console.log("pathname",path)
        return  (path == req.url)&&(el.method == req.method) 
        
     })

     if(result)
     {
         res.json(
            JSON.parse(result.response)
        )

     }else
     {

        res.status(404).send("No routes")

     }

    }
    catch (err)
    {

        console.log(err)
        res.status(404).send("No routes")

    }

    





})





app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


}
catch(err)
{
    console.log("Error")
}








