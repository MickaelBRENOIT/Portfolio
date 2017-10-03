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