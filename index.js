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

// Callbacks
superagent.get(`https://robohash.org/${randomString(6)}`).end((err, res) => {
  console.log(res.request.url);
  fs.writeFile("./randomImage.txt", res.request.url, (err) => {
    if (err) {
      console.log("Not able to write image in txt file", err);
      return;
    }
    console.log(`Random Image successfully written inside the file`);
  });
});
