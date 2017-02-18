var name = "ANDREW JARVIS";
var nameArray = name.split("");
var startIndex = 0;

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
        generatedName += (name.charAt(j) == " ") ? " " : possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return generatedName;
}

$(function() {
    var tick = 0;
    var interval = setInterval(function() {
        // Set name
        var generatedName = generateName(tick, 15, 4);
        $("#name").text(generatedName);
        // Stop interval when name is filled in
        if (generatedName == name) clearInterval(interval);
        tick++;
    }, 40);

});
