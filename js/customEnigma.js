/*=================================================================
                        ENIGMA - Rotor Select Letter
==================================================================*/

$(function () {
    var select = document.getElementsByClassName("select-letter");
    var options = ["A", "B", "C", "D", "E", "F", "G", "H",
                   "I", "J", "K", "L", "M", "N", "O", "P",
                   "Q", "R", "S", "T", "U", "V", "W", "X",
                   "Y", "Z"];

    for (var j = 0; j < select.length; j++) {
        for (var i = 0; i < options.length; i++) {
            var opt = options[i];
            var el = document.createElement("option");
            el.textContent = opt;
            el.value = opt;
            select[j].appendChild(el);
        }
    }

});

/*=================================================================
                        ENIGMA - Implementation
==================================================================*/

var rotor_start = [];

$(function () {
    $(".btn-circle-enigma").click(function (event) {
        // get Text Button (title)
        var letter = $(this).text();

        // get Text Plugboard
        var _plugboard = $("#fieldPlugboard").val().toUpperCase().replace(/[^A-Z]/g, "");

        // get Positions Order Rotors
        var rotor_order = [];
        rotor_order[0] = $("#select-rotor-order-1").val().valueOf() - 1;
        rotor_order[1] = $("#select-rotor-order-2").val().valueOf() - 1;
        rotor_order[2] = $("#select-rotor-order-3").val().valueOf() - 1;

        // get Start Position Order Rotors
        if (!isProcessing()) {
            rotor_start[0] = code($("#select-rotor-start-1").val());
            rotor_start[1] = code($("#select-rotor-start-2").val());
            rotor_start[2] = code($("#select-rotor-start-3").val());
        }

        // get Rings Rotors
        var rotor_ring = [];
        rotor_ring[0] = code($("#select-ring-1").val());
        rotor_ring[1] = code($("#select-ring-2").val());
        rotor_ring[2] = code($("#select-ring-3").val());

        // parse plugboard settings, store as a simple substitution key
        var plugboard = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        var parr = plugboard.split("");
        for (i = 0, j = 1; i < _plugboard.length; i += 2, j += 2) {
            ichar = plugboard.indexOf(_plugboard.charAt(i));
            jchar = plugboard.indexOf(_plugboard.charAt(j));
            temp = parr[jchar];
            parr[jchar] = parr[ichar];
            parr[ichar] = temp;
        }
        plugboard = parr.join("");

        // do the actual enigma enciphering
        var ciphertext = "";

        /*if (typeof rotor_start === 'undefined') {
            console.log("Rotor[] is NOT defined");
        } else {
            console.log("Rotor[] is defined");
        }*/

        rotor_start = increment_settings(rotor_start, rotor_order);
        ciphertext = ciphertext + enigma(letter, rotor_start, rotor_order, rotor_ring, plugboard);
        // reset color buttons to default behavior (#f9f9f9)
        reset_color_buttons();
        $("button").filter(document.getElementById(ciphertext)).css("background-color", "yellow");
        $('#result').append(ciphertext);

    });
});

// return the number 0-25 given a letter [A-Za-z]
function code(ch) {
    return ch.toUpperCase().charCodeAt(0) - 65;
}

function increment_settings(key, r) {
    //notch = [['Q','Q'],['E','E'],['V','V'],['J','J'],['Z','Z'],['Z','M'],['Z','M'],['Z','M']];
    // The notch array stores the positions at which each rotor kicks over the rotor to its left
    var notch = [[16, 16], [4, 4], [21, 21], [9, 9], [25, 25], [25, 12], [25, 12], [25, 12]];
    if (key[1] == notch[r[1]][0] || key[1] == notch[r[1]][1]) {
        key[0] = (key[0] + 1) % 26;
        key[1] = (key[1] + 1) % 26;
    }
    if (key[2] == notch[r[2]][0] || key[2] == notch[r[2]][1]) {
        key[1] = (key[1] + 1) % 26;
    }
    key[2] = (key[2] + 1) % 26;
    return key;
}

function rotor(ch, r, offset) {
    // The first eight strings represent the rotor substitutions I through VIII. The second 8 are the 
    //  inverse transformations
    var key = ["EKMFLGDQVZNTOWYHXUSPAIBRCJ", "AJDKSIRUXBLHWTMCQGZNPYFVOE", "BDFHJLCPRTXVZNYEIWGAKMUSQO",
               "ESOVPZJAYQUIRHXLNFTGKDCMWB", "VZBRGITYUPSDNHLXAWMJQOFECK", "JPGVOUMFYQBENHZRDKASXLICTW",
               "NZJHGRCXMYSWBOUFAIVLPEKQDT", "FKQHTLXOCBJSPDZRAMEWNIUYGV",
               // inverses
               "UWYGADFPVZBECKMTHXSLRINQOJ", "AJPCZWRLFBDKOTYUQGENHXMIVS", "TAGBPCSDQEUFVNZHYIXJWLRKOM",
               "HZWVARTNLGUPXQCEJMBSKDYOIF", "QCYLXWENFTZOSMVJUDKGIARPHB", "SKXQLHCNWARVGMEBJPTYFDZUIO",
               "QMGYVPEDRCWTIANUXFKZOSLHJB", "QJINSAYDVKBFRUHMCPLEWZTGXO"];
    // the following code looks a bit horrible, but it is essentially just doing a simple substitution
    //  taking into account 16 possible keys (8 rotors and their inverses) and the offset (which is calculated
    //  from the indicator and ring settings). The offset essentially shifts the rotor key to the left or right
    var chcode = (code(ch) + 26 + offset) % 26;
    var mapch = (code(key[r].charAt(chcode)) + 26 - offset) % 26 + 65;
    return String.fromCharCode(mapch);
}

// perform a simple substitution cipher
function simplesub(ch, key) {
    return key.charAt(code(ch));
}

function enigma(ch, key, rotors, ring, plugboard) {
    // apply plugboard transformation
    ch = simplesub(ch, plugboard);
    // apply rotor transformations from right to left
    ch = rotor(ch, rotors[2], key[2] - ring[2]);
    ch = rotor(ch, rotors[1], key[1] - ring[1]);
    ch = rotor(ch, rotors[0], key[0] - ring[0]);
    // use reflector B
    ch = simplesub(ch, "YRUHQSLDPXNGOKMIEBFZCWVJAT");
    // apply inverse rotor transformations from left to right
    ch = rotor(ch, rotors[0] + 8, key[0] - ring[0]);
    ch = rotor(ch, rotors[1] + 8, key[1] - ring[1]);
    ch = rotor(ch, rotors[2] + 8, key[2] - ring[2]);
    // apply plugboard transformation again
    ch = simplesub(ch, plugboard);
    return ch;
}

function reset_color_buttons() {
    var buttons = document.getElementsByClassName("btn-circle-enigma");
    for (var i = 0; i < buttons.length; i++) {
        var current_button = buttons[i];
        current_button.style.backgroundColor = '#FFFFFF';
    }
}

function isProcessing() {
    var buttons = document.getElementsByClassName("btn-circle-enigma");
    for (var i = 0; i < buttons.length; i++) {
        var current_button = buttons[i].textContent;
        if (document.getElementById(current_button).style.backgroundColor == "yellow") {
            return true;
        }
    }
    return false;
}