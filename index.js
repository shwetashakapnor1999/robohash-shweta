var fs = require("fs");
var superagent = require("superagent");

// Function to generate random string

// declare all characters
const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function randomString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}
//Promises
function writeFilePromise(fileLocation, result) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileLocation, result, (err) => {
      if (err) {
        reject("not able to write to the file");
      }
      resolve();
    });
  });
}
superagent.get(`https://robohash.org/${randomString(6)}`).end((err, res) => {
  console.log(res.request.url);
  return writeFilePromise("./randomImage.txt", res.request.url)
    .then(() => {
      console.log("Sucessfully written the file");
    })
    .catch((err) => {
      console.log(err);
    });
});

// Callbacks
// superagent.get(`https://robohash.org/${randomString(6)}`).end((err, res) => {
//   console.log(res.request.url);
//   fs.writeFile("./randomImage.txt", res.request.url, (err) => {
//     if (err) {
//       console.log("Not able to write image in txt file", err);
//       return;
//     }
//     console.log(`Random Image successfully written inside the file`);
//   });
// });
