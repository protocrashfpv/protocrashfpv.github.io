﻿function buttonClick(){if(document.getElementById("theButton").classList.contains("button")){counter+=1;var a=parseFloat(document.getElementById("freqChoice").options[document.getElementById("freqChoice").selectedIndex].value),b=parseFloat(document.getElementById("txPowerChoice").options[document.getElementById("txPowerChoice").selectedIndex].value),c=parseFloat(document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].value),d=parseFloat(document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].value),e=10*log10(b),f=85+c+e+d+polarityMismatchLoss(),g=superRound(Math.pow(10,(f-20*log10(a)-32.45)/20),2),h=superRound(.6213*g,2);document.getElementById("answerinkm").innerHTML=g+"km / "+h+"miles",document.getElementById("answerinfunny").innerHTML=getFunnyAnswer(g),document.getElementById("answerinkm").className="answerkm",document.getElementById("answerinfunny").className="answerfunny";var i=whatadstoshow();0==i&&(document.getElementById("sources").className="sources",document.getElementById("andnow").className="andnow"),1==i&&(document.getElementById("donate").className="donate",document.getElementById("donatetext").className="andnow"),2==i&&(document.getElementById("adverts").className="sources",document.getElementById("andnow").className="andnow"),3==i&&(document.getElementById("adverts2").className="sources",document.getElementById("andnow").className="andnow"),document.getElementById("buttonHolder").className="hidden",document.getElementById("sistersite").className="hidden",galabel=a+";"+b+";"+document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text+";"+document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text+";"+counter,ga("send","event","letsfly","click",galabel)}}function whatadstoshow(){var a=Math.floor(10*Math.random()+1);return a<4?3:2}function dropSelect(){document.getElementById("answerinkm").className="hidden",document.getElementById("answerinfunny").className="hidden",document.getElementById("andnow").className="hidden",document.getElementById("donatetext").className="hidden",document.getElementById("sources").className="hidden",document.getElementById("donate").className="hidden",document.getElementById("adverts").className="hidden",document.getElementById("adverts2").className="hidden";var a=document.getElementById("freqChoice").options[document.getElementById("freqChoice").selectedIndex].value,b=document.getElementById("txPowerChoice").options[document.getElementById("txPowerChoice").selectedIndex].value,c=document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].value,d=document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].value;"unselected"!=a&&"unselected"!=b&&"unselected"!=c&&"unselected"!=d&&(document.getElementById("theButton").classList.add("button"),document.getElementById("buttonHolder").classList.add("positionbutton"),document.getElementById("buttonHolder").classList.remove("hidden"),document.getElementById("sistersite").className="sistersite")}function infoClick(){var a=window.open("info.html","_blank");a.focus()}function infoClickMob(){window.location="info.html"}function polarityMismatchLoss(){var a="circular",b="circular";return document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Rubber ducky (1db)")>-1&&(a="linear"),document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Rubber ducky (2db)")>-1&&(a="linear"),document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Moxon")>-1&&(a="linear"),document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("1/2 wave dipole")>-1&&(a="linear"),document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Inverted V")>-1&&(a="linear"),document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Diamond SRH771")>-1&&(a="linear"),document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("FPVPro Dipole")>-1&&(a="linear"),document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Rubber ducky (1db)")>-1&&(b="linear"),document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Rubber ducky (2db)")>-1&&(b="linear"),document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (8dbi linear)")>-1&&(b="linear"),document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (11dbi linear)")>-1&&(b="linear"),document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (14dbi linear)")>-1&&(b="linear"),document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Yagi")>-1&&(b="linear"),document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("1/2wave dipole")>-1&&(b="linear"),document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Turnstile)")>-1&&(b="linear"),a==b?0:-3}function randomNum(a,b){return Math.floor(Math.random()*(b-a+1)+a)}function log10(a){return Math.log(a)/Math.LN10}function getFunnyAnswer(a){var b=randomNum(1,3);if(1==b){var c=randomNum(1,5);if(1==c)return"Argh matey, that's "+convertRange(a,89)+" the distance from skull cove to treasure island";if(2==c)return"That's "+convertRange(a,384400)+" the distance from earth to the moon";if(3==c)return"That's "+convertRange(a,1.6)+" the distance from the Champs Elysée to the Eiffel Tower";if(4==c)return"That's "+convertRange(a,2.9)+" the height of Mount Olympus";if(5==c)return"That's "+convertRange(a,.82)+" the height of the Burj Khalifa in Dubai"}if(2==b){var c=randomNum(1,6);if(1==c)return"That's as much as "+rangeInFunnyUnits(a,.0012192)+" two-by-fours placed next to each other";if(2==c)return"That's as much as "+rangeInFunnyUnits(a,.07)+" pythons placed head to tail";if(3==c)return"That's as much as "+rangeInFunnyUnits(a,.046)+" motorcycle jumps by Evel Knievel";if(4==c)return"That's as much as "+rangeInFunnyUnits(a,.11)+" of the world longest baguettes";if(5==c)return"That's as much as "+rangeInFunnyUnits(a,.02)+" tall men standing on each other's shoulders";if(6==c)return"That's as much as "+rangeInFunnyUnits(a,.0091)+" kangaroo hops in a row"}if(3==b){var c=randomNum(1,8);if(1==c)return"That's how far a man being chased by a bear runs in "+rangeInTimeMins(a,20)+" minutes";if(2==c)return"That's how far a Porsche 944 drives in "+rangeInTimeMins(a,200)+" minutes";if(3==c)return"That's just "+rangeInTimeSecs(a,1224)+" seconds at the speed of sound";if(4==c)return"That's just "+rangeInTimeSecs(a,2448)+" seconds at the speed of love";if(5==c)return"That's how far an F16 flies in "+rangeInTimeSecs(a,3060)+" seconds";if(6==c)return"That's how far a cheetah runs in "+rangeInTimeMins(a,120)+" minutes";if(7==c)return"That's how far a pigeon flies in "+rangeInTimeMins(a,80)+" minutes";if(8==c)return"That's how far Usain Bolt sprints in "+rangeInTimeMins(a,36)+" minutes"}}function convertRange(a,b){return a<b?"1/"+superRound(b/a,2)+"th":a==b?"exactly":a>b?superRound(a/b,2)+" times":void 0}function rangeInFunnyUnits(a,b){return superRound(a/b,2)}function rangeInTimeMins(a,b){return superRound(a/(b/60),2)}function rangeInTimeSecs(a,b){return superRound(a/(b/60/60),2)}function superRound(a,b){return"undefined"==typeof b||0===+b?Math.round(a):(a=+a,b=+b,isNaN(a)||"number"!=typeof b||b%1!==0?NaN:(a=a.toString().split("e"),a=Math.round(+(a[0]+"e"+(a[1]?+a[1]+b:b))),a=a.toString().split("e"),+(a[0]+"e"+(a[1]?+a[1]-b:-b))))}function isOdd(a){return a%2}function labClick(){ga("send","event","lablink","click")}function guideAlsoByClick(){ga("send","event","guidealsobylink","click")}function guideClick(){ga("send","event","guidelink","click")}function quizClick(){ga("send","event","quizlink","click")}function twitterClick(){ga("send","event","tweet","click")}function donateClick(){ga("send","event","donate","click")}function angelClick(){ga("send","event","angellink","click")}