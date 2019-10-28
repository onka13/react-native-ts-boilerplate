const fs = require("fs");
const path = require("path");
var baseDir = "../app/src/assets/";

function work(dir) {
  var fileList = fs.readdirSync(dir).map(x => path.resolve(dir + path.sep + x));
  var folders = fileList.filter(x => fs.statSync(x).isDirectory());
  var files = fileList
    .filter(x => !fs.statSync(x).isDirectory())
    .map(x => path.parse(x))
    .filter(x => x.ext != ".ts");

  folders.forEach(folder => {
    work(folder);
  });
  console.log("DONE " + dir);
  
  if (files.length == 0) return;

  var ex =
    "{\n" +
    files
      .map(x => {
        return `"${x.name}": require("./${x.base}"),`;
      })
      .join("\n") +
    "\n}";
  var res = "export default " + ex;
  //console.log(res);
  fs.writeFileSync(dir + "/index.ts", res);
}

work(baseDir);
