var name = "ANDREW JARVIS";
var nameArray = name.split("");
var startIndex = 0;

var bgClasses = [
    'red-bg',
    'indigo-bg',
    'blue-bg',
    'green-bg',
    'yellow-bg',
    'orange-bg',
    'brown-bg',
];
var currentBgClass = $("body").attr("class");

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

        startIndex = generateStep+1;
    }

    // Generate the remaining letters
    for (var j = startIndex; j < name.length; j++) {
        // Only generate new characters for characters, not spaces
        generatedName += (name.charAt(j) == " ") ? " " : possible.charAt(getRandomIndex(possible));
    }

    return generatedName;
}

function setBackground() {
    $("body").removeClass(currentBgClass);
    var idx = getRandomIndex(bgClasses);

    while (currentBgClass == bgClasses[idx]) {
        idx = getRandomIndex(bgClasses);
    }

    currentBgClass = bgClasses[idx];
    $("body").addClass(currentBgClass);
}

function getRandomIndex(theArray) {
    return Math.floor(Math.random() * theArray.length);
}

$(function() {
    var tick = 0;
    var generateInterval = setInterval(function() {
        var date = new Date();
        // Set name
        var generatedName = generateName(tick, 15, 8);
        $("#name").text(generatedName);
        // Stop interval when name is filled in
        if (generatedName == name) clearInterval(generateInterval);
        tick++;
    }, 40);

    setTimeout(function() {
        setBackground();
        var bgInterval = setInterval(function() {
            setBackground();
        }, 8000);
    }, 4575);


});
