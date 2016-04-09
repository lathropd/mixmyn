




var source = {};
var scriptNode = {};
var audioStreamIn = {};
var audioStreamOut = {};
// var call = {};
var microphone;
var playButton = document.getElementById("playButton");
var recordButton = document.getElementById("recordButton");
var callButton = document.getElementById("callButton");
var callInput = document.getElementById("callInput");
var stopButton = document.getElementById("stopButton");
var incomingAudio = document.getElementById("incomingAudio");
var log = document.getElementById("log");


function __log ( p ) {
		// allows me to changing logging behavior
		//console.log( p );
		log.innerHTML += "\n" + p;
}


var peer = new Peer( 'daniel',  {host: 'peers-mixm.herokuapp.com', port: 443, secure: true});// 'tpd3t4sdjkf39pb9'});
// var peer = new Peer('daniel', {host: 'peers-mixm.herokuapp.com', port: 443, secure: true});// 'tpd3t4sdjkf39pb9'});
		// force it to use SSL. this needs some kind of shim within peerjs


peer.on('open', function(id) {
	__log('My peer ID is: ' + id);
});



if (window.AudioContext) {
	// "gum" = getUserMedia
  function gumSuccess (e) {};
  function gumError (e) {};
  var audioCtx = new AudioContext();;
  // wire up play button

	navigator.mediaDevices.getUserMedia({ audio: true, video:false })
		 .then( function(stream) {
			 microphone = audioCtx.createMediaStreamSource(stream);
			 window.localStream = stream;
			 __log(microphone);
		 })
		 .catch( function (error) {
			 __log("The following error occurred: " + error.name);
			 __log(error);
		}); // end getUserMedia callback

  playButton.onclick = function(e) {
		__log(e);
  }

	callButton.onclick = function (e) {
		__log(e);
		var remoteId = callInput.value;
		var call =  peer.call(remoteId, window.localStream);
		__log(call);
		__log("calling out!!!!!");
		// __log(URL.createObjectURL(window.localStream))
		call.on('stream', function(stream) {
			// `stream` is the MediaStream of the remote peer.
			// Here you'd add it to an HTML video/canvas element.
			// stream.connect(audioCtx.destination);
			__log("outgoing call answered!!!!!!");
			var incomingStream = audioCtx.createMediaStreamSource(stream);
			incomingStream.connect(audioCtx.destination);
			// incomingAudio.src = URL.createObjectURL(stream);

			__log("outgoing call connected");

			console.log(stream);
			// stream.connect(audioCtx.destination);
			// stream.connect(audioCtx.destination);
		});

		call.on("close", function () {
			__log("outgoing call disconnected");
		});
	};

	peer.on('call', function(call) {
	  // Answer the call, providing our mediaStream
		__log("incoming call!!!!!")
	  call.answer(window.localStream);
		// call.answer();
		call.on("stream", function (stream){
			var incomingStream = audioCtx.createMediaStreamSource(stream);
			incomingStream.connect(audioCtx.destination);
			// incomingAudio.src = URL.createObjectURL(stream);
			__log("incoming call connected!");
		});
		call.on("close", function () {
			__log("incoming call disconnected");
		});
	});




	recordButton.onclick = function(e) {
		__log(e);
		navigator.mediaDevices.getUserMedia({ audio: true, video:false })
			 .then( function(stream) {
				 __log(audioCtx);
				 var microphone = audioCtx.createMediaStreamSource(stream);
				 var analyzer = audioCtx.createAnalyser();
				 microphone.connect(analyzer);
				 analyzer.connect(audioCtx.destination);
				 __log(microphone);
			 })
			 .catch( function (error) {
				 __log("The following error occurred: " + error.name);
				 __log(error);
			}); // end getUserMedia callback
	}


	stopButton.onclick = function(e) {
		__log(e);
		audioCtx.destination


	}


  // When the buffer source stops playing, disconnect everything
  source.onended = function() {
    source.disconnect(scriptNode);
    scriptNode.disconnect(audio.destination);
  }

} else {
	__log("no AudioContext available");
}


		//
		// conn.on('open', function() {
	  // // Receive messages
	  // conn.on('data', function(data) {
	  //   	console.log('Received', data);
	  // 		// Send messages
	  // 		conn.send('Hello!');
		// }


	// peer.on('connection', function(conn) {
	// 	conn.on('data', function (data) {
	// 		__log("--INCOMING--:", data);
	// 	})
	// });
