/* 
 * Password strength plugin
 */
// Create closure.
(function(global) {
    global.PasswordStrength = function(elements) {
        if (!elements) {
            return;
        }
        if (Object.prototype.toString.call(elements) !== '[object NodeList]') {
            checkStrength.bind(elements)();
        } else {
            for (var i = 0, total = elements.length; i < total; i++) {
                checkStrength.bind(elements[i])();
            }
        }
    }

    function checkStrength() {
            if (this.id == undefined) {
                this.id = randomID();
            }
            var psWidget = document.getElementById(this.id + '_PSDIV');

            if (!psWidget) {
                psWidget = document.createElement('div');
                psWidget.id = this.id + '_PSDIV';
                psWidget.className = 'PasswordStrengthWidget';
                psWidget.innerHTML = 'Password strength: Unknown';
                this.parentNode.insertBefore(psWidget, this.nextSibling);
            }

            this.addEventListener('keyup', function() {
                var stringBuffer = this.value;
                var digits = /([0-9]{1,})/.test(stringBuffer);
                var caseSensitiveLower = /([a-z]{1,})/.test(stringBuffer);
                var caseSensitiveUpper = /([A-Z]{1,})/.test(stringBuffer);
                var symbols = /[\/`~\?\.\[\]\{\}\\ \!\@\£\$\%\^\&\*\(\)\;\'\:\"\-\=\_\+\|]/.test(stringBuffer);
                var CurrentDate = new Date();
                //  in 2013 a computer should be able to process 20 million hashes a second
                var TotalOptions = 0;
                if (digits) {
                    TotalOptions += 10; // 0-9
                }
                if (caseSensitiveLower) {
                    TotalOptions += 26; // a-z & A-Z
                }
                if (caseSensitiveUpper) {
                    TotalOptions += 26; // a-z
                }
                if (symbols) {
                    TotalOptions += 36; // guess what ??
                }
                var TotalCombinations = TotalOptions;
                for (var index = 1; index < stringBuffer.length; index++) {
                    TotalCombinations *= TotalOptions;
                }
                //work out how powerfull a computer will be this year.
                var MooresLaw = Math.round((CurrentDate.getFullYear() - 1970) / 1.5);
                var Coeffiecent = 0.04;
                for (var index = 0; index < MooresLaw; index++) {
                    Coeffiecent *= 2;
                }
                Coeffiecent = Math.round(Coeffiecent);

                TotalCombinations /= Coeffiecent; /// this number gets bigger based on Moores Law
                var seconds = Math.round(TotalCombinations);

                var minutes = Math.round(TotalCombinations / 60);
                var hours = Math.round(TotalCombinations / 3600);
                var days = Math.round(TotalCombinations / 86400);
                var months = Math.round(days / 30);
                var years = Math.round(months / 12);
                var centuries = Math.round(years / 100);
                var millionsOfYears = Math.round(years / 1000000);

                var buffer = "Password strength : It will take a modern PC ";
                var StrengthClass = "level1";
                if (seconds < 60) {
                    buffer += seconds + " seconds";
                }
                if (seconds>=60 && minutes < 60) {
                    buffer += minutes + " minutes";
                }
                if (minutes>=60 && hours < 24) {
                    buffer += hours + " hours";
                }
                if (hours>=24 && days < 31) {
                    buffer += days + " days";
                }
                if (days>=31 && months<12) {
                    buffer += months + " months";
                    StrengthClass = 'level2';
                }
                if (months>=12  && years < 100) {
                    buffer += years + " years";
                    StrengthClass = 'level3';
                }
                if (years >= 100 && centuries < 1000000) {
                    buffer += centuries + " centuries";
                    StrengthClass = 'level4';
                }
                if (centuries >= 1000000) {
                    buffer += millionsOfYears + " million years";
                    StrengthClass = 'level5';
                }
                buffer += " to crack.";

                psWidget.innerHTML = buffer;
                this.className = StrengthClass;

            }, false);

        }

    function randomID() {
        return "PS_" + Math.round(Math.random() * 10000)
    }

// End of closure.

})(window);