var name = "ANDREW JARVIS";
var nameArray = name.split("");
var bgTransitionTime = 2000;
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
        '#6feae6',
        '#f6a3ef',
        '#50d8ec',
        '#dd6dfb',
        '#eecd69'
    ]
};
var colorSchemeNames = {
    default: 'vanilla',
    vaporwave: 'a e s t h e t i c'
};

var colorSchemesArray = [];
for (var o in colorSchemes) {
    colorSchemesArray.push(colorSchemes[o]);
}

var colorSchemeNamesKeys = Object.keys(colorSchemeNames);
var colorSchemeNamesValues = [];
for (var o in colorSchemeNames) {
    colorSchemeNamesValues.push(colorSchemeNames[o]);
}

var currentColorScheme;

function getNextColorSchemeIndex() {
    return stepArrayIndex(colorSchemeNamesKeys, colorSchemeIndex+1);
}

function switchColorScheme() {
    // Get the current color scheme and change it
    colorSchemeIndex = stepArrayIndex(colorSchemesArray, colorSchemeIndex+1);
    // Set current color scheme values
    currentColorScheme = colorSchemesArray[colorSchemeIndex];
    // Reset color index
    bgColorIndex = getRandomIndex(currentColorScheme);

    switch (colorSchemeNamesKeys[colorSchemeIndex]) {
        case 'vaporwave':
            // Stop rotating
            clearInterval(window.bgInterval);
            // Set the URL relative to the html file

            $('body').css('background-color', '').addClass('vaporwave');
            break;

        default:
            // Set background color, remove image, start rotating
            setBackground(bgColorIndex);
            $('body').removeClass('vaporwave');
            startBgInterval(bgTransitionTime);
    }
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
    startNameInterval(15, 7);

    // Start background rotation
    if (colorSchemeNamesKeys[colorSchemeIndex] == 'default') {
        startBgInterval(bgTransitionTime);
    }

    $("#bgColorToggle").click(function() {
        switchColorScheme();

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

function startNameInterval(delay, separation) {
    var tick = 0;
    window.nameInterval = setInterval(function() {
        // Set name
        var generatedName = generateName(tick, delay, separation);
        $("#name").data('name', generatedName);
        $("#name").text(generatedName);

        // Stop interval when name is filled in
        if (generatedName == name) {
            clearInterval(window.nameInterval);
        }
        tick++;
    }, 40);
}
