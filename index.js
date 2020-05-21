const express = require("express");
var fs = require("fs");
var url = require("url");
const chalk = require('chalk');
const cors = require("cors");
const app = express();
const port = 3001;

try {
  const jsonFile = JSON.parse(fs.readFileSync("./utils/main.json"));

  app.use(cors());
  app.use(express.json());

  app.use((req,res,next)=>{

    console.log(chalk.green(req.url));
    next();

  })

  app.all("*",(req, res, next) => {
      try
      {
    
      let result = jsonFile.find((el,i) => {
        let path = url.parse(el.url).path;

        return path == req.url && el.method == req.method;
      });

      if (result) {
        res.json(JSON.parse(result.response));
      } else {
        res.status(404).json({
          error: "no route"
        });
      }

      }
      catch(err)
      {
          res.status(404).json(
              {
                  error:"no route"
              }
          )
      }
  });

  app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
  );
} catch (err) {
  console.log("Error");
}
