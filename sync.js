const fs = require("fs");
const JSONStream = require("JSONStream");
const es = require("event-stream");

let mainJson = JSON.parse(fs.readFileSync("./utils/main.json"));

const getStream = function(file) {
  var jsonData = "./syncup/" + file,
    stream = fs.createReadStream(jsonData, { encoding: "utf8" }),
    parser = JSONStream.parse("*");
  return stream.pipe(parser);
};

let blocker = fs.readdirSync("./syncup").map(fl => {
  let streamer = getStream(fl).pipe(
    es.mapSync(function(data) {
      let checkExist = mainJson.findIndex(fi => {
        return fi.url == data.url && fi.method == data.method;
      });

      if (checkExist != -1) {
        mainJson[checkExist] = data;
      } else {
        mainJson.push(data);
      }

      console.log("dataincoming");
    })
  );

  streamer.on("end", ss => {
    fs.writeFileSync("./utils/main.json", JSON.stringify(mainJson));
  });
});

console.log("----------------Completed-----------------------");
