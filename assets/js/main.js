var name = "ANDREW JARVIS";
var nameArray = name.split("");
var startNameIndex = 0;
var bgColorIndex = 0;
var bgIncrementer = Math.random() < 0.5 ? -1 : 1;
var colorSchemeIndex = 0;
var colorSchemes = {
    default: [
        '#26A69A',
        '#FBC02D',
        '#42A5F5',
        '#7CB342',
        '#E57373',
        '#03A9F4',
        '#C0CA33',
        '#00ACC1',
        '#FF6F00',
        '#4CAF50'
    ],
    vaporwave: [
        '#FF6AD5',
        '#AD8CFF',
        '#94D0FF',
        '#C774E8',
        '#8795E8'
    ]
};
var colorSchemeNames = {
    default: 'vanilla',
    vaporwave: 'a e s t h e t i c'
};

var colorSchemesArray = Object.values(colorSchemes);
var colorSchemeNamesKeys = Object.keys(colorSchemeNames);
var colorSchemeNamesValues = Object.values(colorSchemeNames);

var currentColorScheme;

function getNextColorSchemeIndex() {
    return stepArrayIndex(colorSchemeNamesKeys, colorSchemeIndex+1);
}

$(function() {
    var initialColorSchemeName = $("#bgColorToggle").data('color-scheme');
    currentColorScheme = colorSchemes[initialColorSchemeName];

    for (var i = 0; i < colorSchemesArray.length; i++) {
        if (colorSchemesArray[i] === currentColorScheme) {
            colorSchemeIndex = i;
            break;
        }
    }

    // Set color scheme text
    $("#bgColorToggle").text(colorSchemeNamesValues[getNextColorSchemeIndex()]);

    // Set random background initially
    setRandomBackground();
    startNameInterval(15, 7, function() {
        startBgInterval(2000);
    });

    $("#bgColorToggle").click(function() {
        // Get the current color scheme and change it
        colorSchemeIndex = stepArrayIndex(colorSchemesArray, colorSchemeIndex+1);

        // Set current color scheme values
        currentColorScheme = colorSchemesArray[colorSchemeIndex];
        // Reset color index
        bgColorIndex = getRandomIndex(currentColorScheme);

        // Set color scheme name and text
        $(this).data('color-scheme', colorSchemeNamesKeys[getNextColorSchemeIndex()]);
        $(this).text(colorSchemeNamesValues[getNextColorSchemeIndex()]);
    });
});



function generateName(tick, delay, separation) {
    // Start filling letters after 10 ticks
    var generateStep = Math.floor((tick - delay) / separation);
    var generatedName = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // If the step is a whole number and positive, fill in that letter
    if (generateStep >= 0) {
        // Fail-safe for name generation
        if (!nameArray[generateStep]) return name;

        for (var i = 0; i <= generateStep; i++) {
            generatedName += nameArray[i];
        }

        startNameIndex = generateStep+1;
    }

    // Generate the remaining letters
    for (var j = startNameIndex; j < name.length; j++) {
        // Only generate new characters for characters, not spaces
        generatedName += (name.charAt(j) == " ") ? " " : possible.charAt(getRandomIndex(possible));
    }

    return generatedName;
}

function setBackground(index) {
    $("body").css('background-color', currentColorScheme[index]);
}

function setRandomBackground() {
    bgColorIndex = getRandomIndex(currentColorScheme);
    // Set background initially
    setBackground(bgColorIndex);
}

function getRandomIndex(theArray) {
    return Math.floor(Math.random() * theArray.length);
}

function startBgInterval(interval) {
    // Animate after name is filled in
    $("body").addClass("animate-bg");
    setRandomBackground();

    window.bgInterval = setInterval(function() {
        // Change bg color index, keep within range of array indicies
        bgColorIndex = stepArrayIndex(currentColorScheme, bgColorIndex+bgIncrementer);
        setBackground(bgColorIndex);
    }, interval);
}

function stepArrayIndex(theArray, theIndex) {
    if (theIndex < 0) theIndex = theArray.length-1;
    else if (theIndex >= theArray.length) theIndex = 0;
    return theIndex;
}

function startNameInterval(delay, separation, cb) {
    var tick = 0;
    window.nameInterval = setInterval(function() {
        // Set name
        var generatedName = generateName(tick, delay, separation);
        $("#name").text(generatedName);

        // Stop interval when name is filled in
        if (generatedName == name) {
            clearInterval(window.nameInterval);
            cb();
        }
        tick++;
    }, 40);
}
