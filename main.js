const keyContainer = document.getElementsByClassName("keyContainer");
const length = document.getElementById("keyLength");
const generate = document.getElementById("generate");
const alarm = document.getElementById("alarm");

//creating a copy button and append it to the doc after key generated
const copyButton = document.createElement("button");
copyButton.addEventListener("click", () => copyTextToClipboard());

let Key = "";

generate.addEventListener("click", function (e) {
  handler();
});

length.addEventListener("keypress", function (e) {
  if (e.key === "Enter" || e.keycode === 13) {
    handler();
  }
});


function handler() {
  const len = length.value;

  if (validation(len) && len) {
    const key = keyGen(len);
    Key = key;
    keyContainer[0].innerHTML = `
        <p id="key">${key}</p>
        `;
    if (alarm.innerHTML !== "") {
      alarm.innerHTML = "";
    }

    
    if (document.getElementsByClassName("copyBtn").length === 0) {
        copyButton.innerHTML = "Copy Key";
        copyButton.className = "copyBtn";
        generate.after(copyButton);
    }
  } else {
    alarm.innerHTML = `You have to enter a number bigger than 0`;
  }
}

//copying the key to the clipboard
function copyTextToClipboard() {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = Key;
    textarea.style.display = "hidden";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    try {
        document.execCommand("copy");
        document.body.removeChild(textarea);
        generatePopUp("Key Copied")
    } catch (err) {
        generatePopUp(`some error happened: ${err}`);
    }

   /*other way for copying in clipboard -->

  navigator.clipboard
    .writeText(text)
    .then(() => {
      generatePopUp("Key Copied")
    })
    .catch((err) => generatePopUp(`some error happened: ${err}`)); */
}

//handling pop ups for notifications
function generatePopUp(msg) {
    const div = document.createElement("div");
    div.id = "popUp";
    div.innerHTML = msg;

    const container = document.getElementsByClassName("container")[0];
    container.appendChild(div);
    setTimeout(() => container.removeChild(div), 3000);
}

//generating the key
function keyGen(length = 1) {
  const CHAR =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHUJKLMNOPQRSTUVWXYZ!@#$%^&*()_+=0123456789/|-`',.?";
  let key = "";

  for (let i = 0; i < +length; i++) {
    const index = Math.floor(Math.random() * (CHAR.length - 1));
    key = key + CHAR[index];
  }
  return key;
}

//validating the input
function validation(length) {
  const pattern = /^[0-9]{1,}$/;
  const valid = length.match(pattern);
  if (valid !== null && length && +length > 0) {
    return true;
  } else {
    return false;
  }
}
