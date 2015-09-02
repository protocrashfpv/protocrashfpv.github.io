var rangePoints;
var xAxisLabels;
var chartTitle;
var xAxisTitle;

function chart() { 
    $('#container').highcharts({
        chart: {
            type: 'line'
        },
        title: {
            text: chartTitle
        },
        xAxis: {
			title: {
                text: xAxisTitle
            },
            categories: xAxisLabels
        },
        yAxis: {
            title: {
                text: 'Range (km)'
            }
        },
        series: [{
            name: 'Chosen setup',
            data: rangePoints
        }]
    });
};

function variableSelect() {
	var choice = document.getElementById("variableChoice").options[document.getElementById("variableChoice").selectedIndex].value;
	var advFreq = parseFloat(advForm.advFreq.value);
	var advTxDb = parseFloat(advForm.advTxDb.value);
	var advRxDb = parseFloat(advForm.advRxDb.value);
	var gainAdj = parseFloat(advForm.gainAdj.value);
	var advSensitivity = parseFloat(advForm.advSensitivity.value);
	var advPower = parseFloat(advForm.advPower.value);
	
	if (choice == 'Power') {

	//Creating array of data points
		rangePoints=[];
		xAxisLabels=[];

		rangePoints = [0]; 
		xAxisLabels= [0];
		chartTitle = 'Power/Range';
		xAxisTitle = 'Power (mW)';
		
		for (i=100; i<2000; i=i+100) {
			advPower = i;

			var txpowerdb = 10*log10(advPower);
			var fsl = -advSensitivity+advTxDb+txpowerdb+advRxDb+gainAdj;	
			var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
			rangePoints[rangePoints.length] = kmrange;
			xAxisLabels[xAxisLabels.length] = i;
		}
		chart(); 
	}
	else if (choice == 'Rx Gain') {

	//Creating array of data points
		rangePoints=[];
		xAxisLabels=[];

		chartTitle = 'Gain/Range';
		xAxisTitle = 'Receiver Gain (dBi)';
		
		for (i=1; i<15; i=i+1) {
			advRxDb=i;
			var txpowerdb = 10*log10(advPower);
			var fsl = -advSensitivity+advTxDb+txpowerdb+advRxDb+gainAdj;	
			var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
			rangePoints[rangePoints.length] = kmrange;
			xAxisLabels[xAxisLabels.length] = i;
		}
		chart(); 
	}
	else if (choice == 'Rx Sensitivity') {
	//Creating array of data points
		rangePoints=[];
		xAxisLabels=[];

		chartTitle = 'Rx Sensitivity/Range';
		xAxisTitle = 'Sensitivity (dB)'
		
		for (i=100; i>69; i=i-5) {
			advSensitivity=-i;
			var txpowerdb = 10*log10(advPower);
			var fsl = -advSensitivity+advTxDb+txpowerdb+advRxDb+gainAdj;	
			var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
			rangePoints[rangePoints.length] = kmrange;
			xAxisLabels[xAxisLabels.length] = i;
		}
		chart(); 
	}	
	else if (choice == 'Frequency') {
		
		chartTitle = 'Frequency/Range';
		xAxisTitle = 'Frequency (mHz)';
		var txpowerdb = 10*log10(advPower);
		var fsl = -advSensitivity+advTxDb+txpowerdb+advRxDb+gainAdj;
		
		
		rangePoints=[];
		xAxisLabels=[];
		
		advFreq = 433;
		var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
		rangePoints[0] = kmrange;
		xAxisLabels[0] = 433;

		advFreq = 900;
		var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
		rangePoints[rangePoints.length] = kmrange;
		xAxisLabels[xAxisLabels.length] = 900;

		advFreq = 1300;
		var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
		rangePoints[rangePoints.length] = kmrange;
		xAxisLabels[xAxisLabels.length] = 1300;

		advFreq = 2400;
		var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
		rangePoints[rangePoints.length] = kmrange;
		xAxisLabels[xAxisLabels.length] = 2400;

		advFreq = 5800;
		var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
		rangePoints[rangePoints.length] = kmrange;
		xAxisLabels[xAxisLabels.length] = 5800;
		
		chart();
	}
}


function advButtonClick()
{
	if (document.getElementById('theButton').classList.contains('button')) {
		
	var advFreq = parseFloat(advForm.advFreq.value);
	var advPower = parseFloat(advForm.advPower.value);
	var advTxDb = parseFloat(advForm.advTxDb.value);
	var advRxDb = parseFloat(advForm.advRxDb.value);
	var gainAdj = parseFloat(advForm.gainAdj.value);
	var advSensitivity = parseFloat(advForm.advSensitivity.value);
	
		var txpowerdb = 10*log10(advPower);
		var fsl = -advSensitivity+advTxDb+txpowerdb+advRxDb+gainAdj;	
		var kmrange = superRound(Math.pow(10,((fsl-20*log10(advFreq)-32.45)/20)),2);
		var milerange = superRound(kmrange*0.6213,2);

		if (isNumber(kmrange)) {
			document.getElementById('errorMsg').className = "hidden"
			advCounter = advCounter+1;
			
			document.getElementById('answerinkm').innerHTML = kmrange + "km / " + milerange + "miles";
			
			document.getElementById('answerinkm').className = 'answerkmadv';
			document.getElementById('answerinfunny').className = 'answerfunny';
			document.getElementById('variableChoiceDiv').className = 'centrevariableselect';
			document.getElementById('chart').className = 'chart';
			
			document.getElementById('buttonHolder').className = 'hidden';
			variableSelect();
			
			galabel = advFreq + ';' + advPower + ';' + advTxDb + ';' + advRxDb + ';' + gainAdj + ';' + advSensitivity+';'+advCounter;
			ga('send', 'event', 'letsflyadvanced', 'click', galabel);
			
			_kmq.push(['record', 'LetsFlyButtonAdvanced', {'Settings':galabel}]);

			} else {
			document.getElementById('errorMsg').className = 'errorMsgClass';
		}
	}
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

function infoClick()
{
  var win = window.open("info.html", '_blank');
  win.focus();	
}

function twitterMouseOn()
{
	document.getElementById('tweetlink').innerHTML = "Share &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp range";
}

function twitterMouseOut()
{
	document.getElementById('tweetlink').innerHTML = "Share your range";
}

function randomNum(x, y)
{
	return Math.floor(Math.random() * ((y-x)+1) + x);
}

function log10(x)
{
	return Math.log(x) / Math.LN10;
}

function inputSelect()
{
	document.getElementById('answerinkm').className = 'hidden';
	document.getElementById('answerinfunny').className = 'hidden';
	document.getElementById('chart').className = 'hidden';
	document.getElementById('variableChoiceDiv').className = 'hidden';
			
	if ((advForm.advFreq.value!="")&&(advForm.advPower.value!="")&&(advForm.advTxDb.value!="")&&(advForm.advRxDb.value!="")&&(advForm.gainAdj.value!="")&&(advForm.advSensitivity.value!="")) {
		document.getElementById('theButton').classList.add('button'); 
		document.getElementById('buttonHolder').classList.add('positionadvbutton');	
		document.getElementById('buttonHolder').classList.remove('hidden');	
	}	
}

function convertRange(kmrange, maxrange) 
{
	if (kmrange<maxrange) return "1/" + superRound(maxrange/kmrange,2) + "th";
	if (kmrange==maxrange) return "exactly";
	if (kmrange>maxrange) return superRound(kmrange/maxrange,2) + " times";
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

function labClick()
{
ga('send', 'event', 'lablinkadv', 'click');
_kmq.push(['record', 'Lablinkadv']);
}

function guideClick()
{
ga('send', 'event', 'guidelinkadv', 'click');
_kmq.push(['record', 'Guidelinkadv',]);
}
function twitterClick()
{
ga('send', 'event', 'tweetadv', 'click');
_kmq.push(['record', 'Twitterlinkadv']);
}
