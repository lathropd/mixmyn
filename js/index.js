var log = document.getElementById("log");


function __log ( p ) {
		// allows me to changing logging behavior
		//console.log( p );
		log.innerHTML += "\n" + p;
}

var peer = new Peer({key: 'tpd3t4sdjkf39pb9'});


		peer.on('open', function(id) {
  		__log('My peer ID is: ' + id);
		});





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
				__log("calling!!!!!");
				__log(URL.createObjectURL(window.localStream))
				call.on('stream', function(stream) {
					// `stream` is the MediaStream of the remote peer.
					// Here you'd add it to an HTML video/canvas element.
					// stream.connect(audioCtx.destination);
					__log("call answered!!!!!!");
					var incomingStream = audioCtx.createMediaStreamSource(stream);
					incomingStream.connect(audioCtx.destination);

					// stream.connect(audioCtx.destination);
					// stream.connect(audioCtx.destination);
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
					__log("call connected!");
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
