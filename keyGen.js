const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function genKey(length = 200) {
  const CHAR =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=0123456789/|-`',.?";
  let key = "";

  for (let i = 0; i < length; i++) {
    const index = Math.floor(Math.random() * 83);
    key = key + CHAR[index];
  }

  console.log("\nKey generated :");
  return key;
}
console.log(" _     __  _______     _______  ");
console.log("| |   / / |  _____\\   / ______\\ ");
console.log("| |  / /  | |_____   / /   ___  ");
console.log("| | / /   |  _____\\ / /   / _ \\ ");
console.log("| | \\ \\   | |       \\ \\   \\/ \\ \\");
console.log("| |  \\ \\  | |______  \\ \\_____/ /");
console.log("|_|   \\_\\ |_______/   \\_______/ ");
console.log("\nBuild Your Secret Key Easily");

rl.question("\n? How many character should have your key? ", function (length) {
  const pattern = /^[0-9]{0,}$/g;
  const valid = length.match(pattern);

  if (length !== "" && valid !== null) {
    console.log(genKey(+valid[0]));
    console.log("\nEnjoy it!");
    rl.close();
  } else {
    console.log("\n\n you should enter a number!!");
    rl.close();
  }
});

rl.on("close", () => process.exit(0));
