// Var used by both generators
let pass = ``;

// Vars for password generator
let lowercase = true;
let uppercase = false;
let numbers = false;
let symbols = false;
let numChar = 12;
let requirements = [];
let mixedRequire = [];

// Vars for passphrase generator
let passphrase = false;
let spaces = true;
let numWords = 4;

// Hides passphrase generator at start
document.getElementById("passphrase").style.display = "none";

// Checks which generator button was pressed, makes it active, hides the other generator
function buttonTest(element){
    if(element.id === 'passwordBtn'){

        // wipe password if switching generators
        if(document.getElementById("password").style.display == "none"){
            pass = ``;
            document.getElementById("pw").innerHTML = pass;
            document.getElementById("pw").oninput();

        }

        // display and hide proper elements based on button
        document.getElementById("password").style.display = "block";
        document.getElementById("passphrase").style.display = "none";
        document.getElementById("passwordBtn").className = "active";
        document.getElementById("passphraseBtn").className = "inactive";
    }
    if(element.id === 'passphraseBtn'){

        // wipe password if switching generators
        if(document.getElementById("passphrase").style.display == "none"){
            pass = ``;
            document.getElementById("pw").innerHTML = pass;
            document.getElementById("pw").oninput();
        }

        // display and hide proper elements based on button
        document.getElementById("password").style.display = "none";
        document.getElementById("passphrase").style.display = "block";
        document.getElementById("passwordBtn").className = "inactive";
        document.getElementById("passphraseBtn").className = "active";
    }
};

// sets up variables based on user selection
function userSubmitted(){

    // prevents button from reloading page
    event.preventDefault();

    // resets variables
    pass=``;
    requirements = [];
    mixedRequire = [];

    // sets variables to user selections
    numChar = document.getElementById("numChar").value;
    lowercase = document.getElementById("lower").checked;
    uppercase = document.getElementById("upper").checked;
    numbers = document.getElementById("num").checked;
    symbols = document.getElementById("sym").checked;

    makePassword();
};

// order of functions to generate the password and display it to user
function makePassword(){
    checkRequirements();
    setUpRequirements();
    mixRequirements();
    createPassString();
    document.getElementById("pw").innerHTML = pass;
    document.getElementById("pw").oninput();
};

// updates the requirements array with user-selected rules
function checkRequirements(){
    if(lowercase){
        requirements.push("lower");
    }
    if(uppercase){
        requirements.push("upper");
    }
    if(numbers){
        requirements.push("num");
    }
    if(symbols){
        requirements.push("sym");
    }
};

// assigns one by one the requirements to each digit of the password
function setUpRequirements(){
    let tempNum = 0;

    while(mixedRequire.length < numChar){

        // starts back at beginning of requirements array if it reaches end
        if(tempNum === requirements.length){
            tempNum = 0;
        }

        mixedRequire.push(requirements[tempNum]);
        tempNum++;
    }
};

// mixes up the order of digits
function mixRequirements(){
    for (let i = mixedRequire.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [ mixedRequire[i], mixedRequire[j] ] = [ mixedRequire[j], mixedRequire[i] ];
    }
};

// assigns a letter, number, or symbol to each digit depending on its given requirement
function createPassString(){
    for(let i=0; i<numChar; i++){
        pass += possibleChars[mixedRequire[i]][Math.floor(Math.random() * possibleChars[mixedRequire[i]].length)];
    }   
};

// 
function phraseSub(){
    event.preventDefault();
    pass=``;
    numWords = document.getElementById("numWords").value;
    spaces = document.getElementById("spaces").checked;

    // grabs a random word from the array until the length is reached. 
    for(let i=0; i<numWords; i++){
        let tempPass = passphrases[Math.floor(Math.random() * passphrases.length)];
        if(spaces){
            tempPass += " ";
        }
        pass += tempPass;
    }

    // removes final space
    pass = pass.trim();
    
    document.getElementById("pw").innerHTML = pass;
    document.getElementById("pw").oninput();
};

// copies the text from the textarea when the button is pressed
function copyText() {
    let c = document.getElementById("pw");
    c.select();
    c.setSelectionRange(0, 99999)
    document.execCommand("copy");
};
