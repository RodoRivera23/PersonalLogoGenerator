const inquirer = require("inquirer");
const { Triangle, Square, Circle } = require("./lib/shapes");
const fs = require("fs");

inquirer.prompt([
    {
        type: "input",
        message:
            "Enter 3 characters for your logo",
        name: "textLogo",
    },
    {
        type: "input",
        message:
            "Enter the text color (Color keyword OR hexadecimal number)",
        name: "textColor",
    },
    {
        type: "list",
        message: "Select the shape for your logo from these options:",
        choices: ["Triangle", "Square", "Circle"],
        name: "shape",
    },
    {
        type: "input",
        message:
            "Enter the text color for the shape (Color keyword OR hexadecimal number)",
        name: "shapeColor",
    },
]).then((answers) => {
    if (answers.textLogo.length > 3) {
        console.log("Must enter a value of no more than 3 characters");
        promptUser();
    } else {
        //function to create logo
        createLogo("logo.svg", answers);
    }
});

function createLogo(fileName, answers) {
    // File starts as an empty string
    let svgString = "";
    // Sets width and height of logo container
    svgString =
        '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">';
    // <g> tag wraps <text> tag so that user font input layers on top of polygon -> not behind
    svgString += "<g>";
    // Takes user input for shape choice and inserts it into SVG file
    svgString += `${answers.shape}`;

    // Conditional check takes users input from choices array and then adds polygon properties and shape color to SVG string
    let shapeChoice;
    if (answers.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${answers.shapeColor}"/>`;
    } else if (answers.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${answers.shapeColor}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${answers.shapeColor}"/>`;
    }

    // <text> tag gives rise to text alignment, text-content/text-color taken in from user prompt and gives default font size of "40"
    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${answers.textColor}">${answers.textLogo}</text>`;
    // Closing </g> tag
    svgString += "</g>";
    // Closing </svg> tag
    svgString += "</svg>";

    // Using file system module to generate svg file, takes in file name given in the promptUser function, the svg string, and a ternary operator which handles logging any errors, or a "Generated logo.svg" message to the console  
    fs.writeFile(fileName, svgString, (err) => {
        err ? console.log(err) : console.log("Generated logo.svg");
    });
}