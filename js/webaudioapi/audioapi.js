//// Mainly inspired from : http://www.html5rocks.com/en/tutorials/webaudio/intro/  By Boris Smus 


var context;
var audioapisupported = false;
var soundBankLoaded= false;

var dogBarkingBuffer = null;

var bufferLoader;
var bufferLoaded;
var bufferListSaved;

var bufferBackgroundSound;
var backgroundSound;


//window.addEventListener('load', init, false);
function initAudioApiSupport(backgroundSound, soundBank) {
  try {
    // Fix up for prefixing
    window.AudioContext = window.AudioContext||window.webkitAudioContext;
    context = new AudioContext();
    audioapisupported = true;
  }
	catch(e) {
		audioapisupported = false;
		alert('Web Audio API is not supported in this browser : have a better experience using firefox 28');
//		document.getElementById("audiosupport").innerHTML="Pas de support son dans ce navigateur! Utilisez firefox 28 pour une meilleure experience.";
//		document.getElementById("audiosupport").style.backgroundColor="red";
	}
  
	if(audioapisupported)
	{
		setTimeout(function(){loadSoundBank(soundBank)},0);
		setTimeout(function(){loadBackgroundSound(backgroundSound)},0);
  	} 
  
}

function loadBackgroundSound(url) {
	var request = new XMLHttpRequest();
	request.open('GET', url, true);
	request.responseType = 'arraybuffer';

	// Decode asynchronously
	request.onload = function()
	{
		context.decodeAudioData(request.response, function(buffer) {

			bufferBackgroundSound = buffer;
			setTimeout(function(){playBackgroundSound()},0);
			});
	}
	request.send();
}

function playBackgroundSound(){
	backgroundSound = context.createBufferSource();
	backgroundSound.buffer = bufferBackgroundSound;

	//direct connection to the context	
	//backgroundSound.connect(context.destination);	

	// Create a gain node.
	var gainNode = context.createGain();
	// Connect the source to the gain node.
	backgroundSound.connect(gainNode);
	// Connect the gain node to the destination.
	gainNode.connect(context.destination);	
	
	// Reduce the volume.
	gainNode.gain.value = 0.7;
	
	backgroundSound.loop = true;
	backgroundSound.start(0);
}

function playSound(soundIndex) {
	if (soundBankLoaded)  
	{
		bufferLoaded[soundIndex] = context.createBufferSource();
		bufferLoaded[soundIndex].buffer = bufferListSaved[soundIndex];
		bufferLoaded[soundIndex].connect(context.destination);
		
	// Create a gain node.
	var gainNode = context.createGain();
	// Connect the source to the gain node.
	bufferLoaded[soundIndex].connect(gainNode);
	// Connect the gain node to the destination.
	gainNode.connect(context.destination);	
	
	// Reduce the volume.
	gainNode.gain.value = 1.0;
		
		bufferLoaded[soundIndex].loop = true;
//		bufferLoaded[soundIndex][bufferLoaded[soundIndex].start ? 'start' : 'noteOn'](0);
		bufferLoaded[soundIndex].start(0);		// play the source now
	}                           					// note: on older systems, may have to use deprecated noteOn(time);
                                             
}

function stopSound(soundIndex) {
	if (soundBankLoaded)  
	{
		bufferLoaded[soundIndex].stop(0); // stop the source now
//		bufferLoaded[soundIndex].pause(0); // stop the source now
		//bufferLoaded[soundIndex].currentTime = 0;
	}                             // note: on older systems, may have to use deprecated noteOff(time);
}

function loadSoundBank(soundBank) {
    // Fix up for prefixing
 //   window.AudioContext = window.AudioContext||window.webkitAudioContext;
  //  context = new AudioContext();
    
	bufferLoader = new BufferLoader(
		context,
		soundBank,
		finishedLoading
	);

	bufferLoader.load();
}

function finishedLoading(bufferList) {
  // fill the array of sounds and connect them to the sound context
	bufferLoaded = new Array();
	bufferListSaved = new Array();
	
	for (var i = 0; i < bufferList.length; i++)
	{
//		bufferLoaded[i] = context.createBufferSource();
//		bufferLoaded[i].buffer = bufferList[i];
		bufferListSaved[i] = bufferList[i];
	
//		bufferLoaded[i].connect(context.destination);
	//	bufferLoaded[i].start(0);
	}
	
//			document.getElementById("audiosupport").innerHTML="Sons chargés!";
//			document.getElementById("audiosupport").style.backgroundColor="green";
	soundBankLoaded = true;
}