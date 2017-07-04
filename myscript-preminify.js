function parseparams()
{
	var theurl = window.location.href;
	
	var frequencyList = document.getElementById('freqChoice');
	var freqParam = getParameterByName('freq',theurl);
    if (freqParam!=null) {
		frequencyList.value = freqParam;
	}
		
	var txpowerList = document.getElementById('txPowerChoice');
	var pwParam=getParameterByName('pw',theurl);
	if (pwParam!=null) {
		txpowerList.value = pwParam;
	}
	
	var txantList = document.getElementById('txAntennaChoice');
	var txantListparam = getParameterByName('tx',theurl);
	if (txantListparam!=null) {	txantList.options[parseInt(txantListparam)].selected = true;}

	var rxantList = document.getElementById('rxAntennaChoice');
	var rxantListparam = getParameterByName('rx',theurl);
	if (rxantListparam!=null) {rxantList.options[parseInt(rxantListparam)].selected = true;	}
    
	if ((rxantListparam!=null)&&(txantListparam!=null)&&(pwParam!=null)&&(freqParam!=null)) {
		dropSelect();
		document.getElementById("theButton").click();
	}
}


function buildShareURL() {
	var frequency = parseFloat(document.getElementById("freqChoice").options[document.getElementById("freqChoice").selectedIndex].value);
	var txpower = parseFloat(document.getElementById("txPowerChoice").options[document.getElementById("txPowerChoice").selectedIndex].value);
	var txantennaindex = document.getElementById("txAntennaChoice").selectedIndex;
	var rxantennaindex = document.getElementById("rxAntennaChoice").selectedIndex;
	var range = document.getElementById("answerinkm").innerHTML;
	
	//var uri='https://twitter.com/share?hashtags=FPV&text=I\x27ve maxed my FPV range to ' + range + '. Check out my setup at &url=' + encodeURI('http://maxmyrange.com?freq=' + frequency + '*pw=' + txpower + '*tx=' + txantennaindex + '*rx=' + rxantennaindex) + '&original_referer=' + encodeURI('http://maxmyrange.com') ;
	var uri=encodeURI('http://maxmyrange.com?freq=' + frequency + '*pw=' + txpower + '*tx=' + txantennaindex + '*rx=' + rxantennaindex);

	return encodeURI(uri);
}

function buttonClick()
{
	if (document.getElementById('theButton').classList.contains('button')) {
		counter = counter+1;
		
		var frequency = parseFloat(document.getElementById("freqChoice").options[document.getElementById("freqChoice").selectedIndex].value);
		var txpower = parseFloat(document.getElementById("txPowerChoice").options[document.getElementById("txPowerChoice").selectedIndex].value);
		var txantenna = parseFloat(document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].value);
		var rxantenna = parseFloat(document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].value);

		var txpowerdb = 10*log10(txpower);
		var fsl = 85+txantenna+txpowerdb+rxantenna+polarityMismatchLoss();	
		var kmrange = superRound(Math.pow(10,((fsl-20*log10(frequency)-32.45)/20)),2);
		var milerange = superRound(kmrange*0.6213,2);

		document.getElementById('answerinkm').innerHTML = kmrange + "km / " + milerange + "miles";
		document.getElementById('answerinfunny').innerHTML = getFunnyAnswer(kmrange);
		
		document.getElementById('answerinkm').className = 'answerkm';
		document.getElementById('answerinfunny').className = 'answerfunny';
		document.getElementById('tweetbutton').className = 'donate, underline2';
		
		var whattoshownow = whatadstoshow();
		if (whattoshownow==0) {
			document.getElementById('sources').className = 'sources';
			document.getElementById('andnow').className = 'andnow';	
		}
		if (whattoshownow==1) {
			document.getElementById('donate').className = 'donate';
			document.getElementById('donatetext').className = 'andnow';	
		}
		if (whattoshownow==2) {
			document.getElementById('adverts').className = 'sources';
			document.getElementById('andnow').className = 'andnow';	
		}		
		if (whattoshownow==3) {
			document.getElementById('adverts2').className = 'sources';
			document.getElementById('andnow').className = 'andnow';	
		}	
		
		document.getElementById('buttonHolder').className = 'hidden';
		document.getElementById('sistersite').className = 'hidden';
		
		
		galabel = frequency + ';' + txpower + ';' + document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text + ';' + document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text+';'+counter;
		ga('send', 'event', 'letsfly', 'click', galabel);
		
		
		
	}
}

function whatadstoshow()
{
	//var today = new Date();
	
	//if (isOdd(today.getDate())) return 0; else return 1;
	var randomnum = Math.floor((Math.random() * 10) + 1);
	if (randomnum<4) return 3; else return 2;
	
	//0 is the guide and lab
	//1 is donate
	//2 is the guide and angel
	//3 is the guide and quiz
}

function dropSelect()
{
	document.getElementById('answerinkm').className = 'hidden';
	document.getElementById('answerinfunny').className = 'hidden';
	document.getElementById('tweetbutton').className = 'hidden';
	document.getElementById('andnow').className = 'hidden';
	document.getElementById('donatetext').className = 'hidden';
	document.getElementById('sources').className = 'hidden';
	document.getElementById('donate').className = 'hidden';
	document.getElementById('adverts').className = 'hidden';
	document.getElementById('adverts2').className = 'hidden';
	document.getElementById('tweetbuttonstep2').className = 'hidden';
	document.getElementById('shareurl').className = 'hidden';

	
	
	var frequency = document.getElementById("freqChoice").options[document.getElementById("freqChoice").selectedIndex].value;
	var txpower = document.getElementById("txPowerChoice").options[document.getElementById("txPowerChoice").selectedIndex].value;
	var txantenna = document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].value;
	var rxantenna = document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].value;
	
	if ((frequency!="unselected")&&(txpower!="unselected")&&(txantenna!="unselected")&&(rxantenna!="unselected")) {
		document.getElementById('theButton').classList.add('button'); 
		document.getElementById('buttonHolder').classList.add('positionbutton');	
		document.getElementById('buttonHolder').classList.remove('hidden');	
		document.getElementById('sistersite').className = 'sistersite';
	}	
}

function infoClick()
{
  var win = window.open("info.html", '_blank');
  win.focus();	
}

function infoClickMob()
{
  window.location="info.html";
}

function polarityMismatchLoss()
{
	var txPolarity = "circular";
	var rxPolarity = "circular";
	
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Rubber ducky") > -1) txPolarity="linear";
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Moxon") > -1) txPolarity="linear";
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("1/2 wave dipole") > -1) txPolarity="linear";
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Inverted V") > -1) txPolarity="linear";
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("Diamond SRH771") > -1) txPolarity="linear";
	if (document.getElementById("txAntennaChoice").options[document.getElementById("txAntennaChoice").selectedIndex].text.indexOf("FPVPro Dipole") > -1) txPolarity="linear";
	
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Rubber ducky") > -1) rxPolarity="linear";
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (8dbi linear)") > -1) rxPolarity="linear";
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (11dbi linear)") > -1) rxPolarity="linear";
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Patch (14dbi linear)") > -1) rxPolarity="linear";
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Yagi") > -1) rxPolarity="linear";		
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("1/2wave dipole") > -1) rxPolarity="linear";		
	if (document.getElementById("rxAntennaChoice").options[document.getElementById("rxAntennaChoice").selectedIndex].text.indexOf("Turnstile)") > -1) rxPolarity="linear";		
	
	if (txPolarity==rxPolarity) return 0; else return -3;
}

function randomNum(x, y)
{
	return Math.floor(Math.random() * ((y-x)+1) + x);
}

function log10(x)
{
	return Math.log(x) / Math.LN10;
}

function getFunnyAnswer(kmrange)
{
	var answerType = randomNum(1,3);
	if (answerType==1) { //Answers relating to range
		var subAnswerType = randomNum(1,5);
		if (subAnswerType==1) return "Argh matey, that's " + convertRange(kmrange,89) + " the distance from skull cove to treasure island";
		if (subAnswerType==2) return "That's " + convertRange(kmrange,384400) + " the distance from earth to the moon";
		if (subAnswerType==3) return "That's " + convertRange(kmrange,1.6) + " the distance from the Champs Elysée to the Eiffel Tower";
		if (subAnswerType==4) return "That's " + convertRange(kmrange,2.9) + " the height of Mount Olympus";
		if (subAnswerType==5) return "That's " + convertRange(kmrange,0.82) + " the height of the Burj Khalifa in Dubai"; 
	}
	if (answerType==2) { //Answers relating in units
		var subAnswerType = randomNum(1,6);
		if (subAnswerType==1) return "That's as much as " + rangeInFunnyUnits(kmrange,0.0012192) + " two-by-fours placed next to each other";
		if (subAnswerType==2) return "That's as much as " + rangeInFunnyUnits(kmrange,0.07) + " pythons placed head to tail";
		if (subAnswerType==3) return "That's as much as " + rangeInFunnyUnits(kmrange,0.046) + " motorcycle jumps by Evel Knievel"; 
		if (subAnswerType==4) return "That's as much as " + rangeInFunnyUnits(kmrange,0.11) + " of the world longest baguettes";
		if (subAnswerType==5) return "That's as much as " + rangeInFunnyUnits(kmrange,0.02) + " tall men standing on each other's shoulders";
		if (subAnswerType==6) return "That's as much as " + rangeInFunnyUnits(kmrange,0.0091) + " kangaroo hops in a row";
	}
	if (answerType==3) { //Answers relating to speed/time
		var subAnswerType = randomNum(1,8);
		if (subAnswerType==1) return "That's how far a man being chased by a bear runs in " + rangeInTimeMins(kmrange,20) + " minutes";
		if (subAnswerType==2) return "That's how far a Porsche 944 drives in " + rangeInTimeMins(kmrange,200) + " minutes";
		if (subAnswerType==3) return "That's just " + rangeInTimeSecs(kmrange,1224) + " seconds at the speed of sound";
		if (subAnswerType==4) return "That's just " + rangeInTimeSecs(kmrange,2448) + " seconds at the speed of love";
		if (subAnswerType==5) return "That's how far an F16 flies in " + rangeInTimeSecs(kmrange,3060) + " seconds";
		if (subAnswerType==6) return "That's how far a cheetah runs in " + rangeInTimeMins(kmrange,120) + " minutes";
		if (subAnswerType==7) return "That's how far a pigeon flies in " + rangeInTimeMins(kmrange,80) + " minutes";
		if (subAnswerType==8) return "That's how far Usain Bolt sprints in " + rangeInTimeMins(kmrange,36) + " minutes";
	}
}

//TODO Need to make all these answer at most two decimals
function convertRange(kmrange, maxrange) 
{
	if (kmrange<maxrange) return "1/" + superRound(maxrange/kmrange,2) + "th";
	if (kmrange==maxrange) return "exactly";
	if (kmrange>maxrange) return superRound(kmrange/maxrange,2) + " times";
}

function rangeInFunnyUnits(kmrange, unitInKm)
{
	return superRound(kmrange/unitInKm,2);
}

function rangeInTimeMins(kmrange, kmPerHour)
{
	return superRound(kmrange/(kmPerHour/60),2);
}
function rangeInTimeSecs(kmrange, kmPerHour)
{
	return superRound(kmrange/(kmPerHour/60/60),2);
}
function superRound(value, exp) {
  if (typeof exp === 'undefined' || +exp === 0)
    return Math.round(value);

  value = +value;
  exp  = +exp;

  if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0))
    return NaN;

  // Shift
  value = value.toString().split('e');
  value = Math.round(+(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp)));

  // Shift back
  value = value.toString().split('e');
  return +(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp));
}

function isOdd(num) {
	return num % 2;
}

function labClick()
{
ga('send', 'event', 'lablink', 'click');
}

function tweetClick()
{
	document.getElementById('tweetbutton').className = 'hidden';
	document.getElementById("shareurl").innerHTML = buildShareURL();
	document.getElementById('tweetbuttonstep2').className = 'shareurl, underline';
	document.getElementById('shareurl').className = 'shareurl';
}

function tweetClickstep2()
{
  
    var popup = document.getElementById("myPopup");
SelectText('shareurl');
document.execCommand('copy');
    popup.classList.toggle("show");
	ga('send', 'event', 'sharelink', 'click');
}

function SelectText(element) {
    var doc = document
        , text = doc.getElementById(element)
        , range, selection
    ;    
    if (doc.body.createTextRange) {
        range = document.body.createTextRange();
        range.moveToElementText(text);
        range.select();
    } else if (window.getSelection) {
        selection = window.getSelection();        
        range = document.createRange();
        range.selectNodeContents(text);
        selection.removeAllRanges();
        selection.addRange(range);
    }
}


function guideAlsoByClick()
{
ga('send', 'event', 'guidealsobylink', 'click');
}
function guideClick()
{
ga('send', 'event', 'guidelink', 'click');
}
function quizClick()
{
ga('send', 'event', 'quizlink', 'click');
}
function twitterClick()
{
ga('send', 'event', 'tweet', 'click');
}
function donateClick()
{
ga('send', 'event', 'donate', 'click');
}
function angelClick()
{
ga('send', 'event', 'angellink', 'click');
}

function getParameterByName(name, url) {
    var start = url.indexOf(name);
	if (start<0) return(null); 
	var tempstring1 = url.substring(start);
	var end = tempstring1.indexOf('*');
	var tempresult;
	if (end >0) tempresult	= tempstring1.substring(1,end); else tempresult	= tempstring1;
	var newstart = tempresult.indexOf('=');
	return tempresult.substring(newstart+1);
}

function getPosition(string, subString, index) {
   return string.split(subString, index).join(subString).length;
}