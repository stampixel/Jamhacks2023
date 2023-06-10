import { useState, useEffect } from "react";

const usePitchAnalyser = () => {
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var audioContext = null;
  var analyser = null;
  var mediaStreamSource = null;

  const [linePitch, setLinePitch] = useState([]);

  var a;
  var b;
  const [starts, setStarts] = useState(false);



  function startPitchDetect() {
    // grab an audio context
    audioContext = new AudioContext();

    // Attempt to get audio input
    navigator.mediaDevices
      .getUserMedia({
        audio: {
          mandatory: {
            googEchoCancellation: "false",
            googAutoGainControl: "false",
            googNoiseSuppression: "false",
            googHighpassFilter: "false",
          },
          optional: [],
        },
      })
      .then((stream) => {
        // Create an AudioNode from the stream.
        mediaStreamSource = audioContext.createMediaStreamSource(stream);

        // Connect it to the destination.
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        mediaStreamSource.connect(analyser);
        updatePitch();
      })
      .catch((err) => {
        // always check for errors at the end.
        console.error(`${err.name}: ${err.message}`);
        alert("Stream generation failed.");
      });
  }
  function calculateAverage(array) {
    var total = 0;
    var count = 0;

    array.forEach(function (item, index) {
      total += item;
      count++;
    });

    return total / count;
  }

  function filterOutliers(someArray) {
    // Copy the values, rather than operating on references to existing values
    var values = someArray.concat();

    // Then sort
    values.sort(function (a, b) {
      return a - b;
    });
    /* Then find a generous IQR. This is generous because if (values.length / 4)
     * is not an int, then really you should average the two elements on either
     * side to find q1.
     */
    var q1 = values[Math.floor(values.length / 4)];
    // Likewise for q3.
    var q3 = values[Math.ceil(values.length * (3 / 4))];
    var iqr = q3 - q1;

    // Then find min and max values
    var maxValue = q3 + iqr * 1.5;
    var minValue = q1 - iqr * 1.5;

    // Then filter anything beyond or beneath these values.
    var filteredValues = values.filter(function (x) {
      return x <= maxValue && x >= minValue;
    });

    // Then return
    return filteredValues;
  }

  function stopPitchDetect() {

    var tempPitch = calculateAverage(pitches);

    setLinePitch((oldArray) => [...oldArray, tempPitch]);

    if (audioContext) {
      // Stop the microphone
      mediaStreamSource.disconnect();

      // Cancel the animation frame
      if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(rafID);
      } else if (window.webkitCancelAnimationFrame) {
        window.webkitCancelAnimationFrame(rafID);
      }

      // Close the audio context
      audioContext.close();
    }
  }

  var rafID = null;
  var tracks = null;
  var buflen = 2048;
  var buf = new Float32Array(buflen);
  var noteStrings = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  function noteFromPitch(frequency) {
    var noteNum = 12 * (Math.log(frequency / 440) / Math.log(2));
    return Math.round(noteNum) + 69;
  }

  function frequencyFromNoteNumber(note) {
    return 440 * Math.pow(2, (note - 69) / 12);
  }

  function centsOffFromPitch(frequency, note) {
    return Math.floor(
      (1200 * Math.log(frequency / frequencyFromNoteNumber(note))) / Math.log(2)
    );
  }

  function autoCorrelate(buf, sampleRate) {
    // Implements the ACF2+ algorithm
    var SIZE = buf.length;
    var rms = 0;

    for (var i = 0; i < SIZE; i++) {
      var val = buf[i];
      rms += val * val;
    }
    rms = Math.sqrt(rms / SIZE);
    if (rms < 0.01)
      // not enough signal
      return -1;

    var r1 = 0,
      r2 = SIZE - 1,
      thres = 0.2;
    for (var i = 0; i < SIZE / 2; i++)
      if (Math.abs(buf[i]) < thres) {
        r1 = i;
        break;
      }
    for (var i = 1; i < SIZE / 2; i++)
      if (Math.abs(buf[SIZE - i]) < thres) {
        r2 = SIZE - i;
        break;
      }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    var c = new Array(SIZE).fill(0);
    for (var i = 0; i < SIZE; i++)
      for (var j = 0; j < SIZE - i; j++) c[i] = c[i] + buf[j] * buf[j + i];

    var d = 0;
    while (c[d] > c[d + 1]) d++;
    var maxval = -1,
      maxpos = -1;
    for (var i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }
    var T0 = maxpos;

    var x1 = c[T0 - 1],
      x2 = c[T0],
      x3 = c[T0 + 1];
    a = (x1 + x3 - 2 * x2) / 2;
    b = (x3 - x1) / 2;
    if (a) T0 = T0 - b / (2 * a);

    return sampleRate / T0;
  }

  var pitches = [];

  function updatePitch(time) {
    var cycles = new Array();
    analyser.getFloatTimeDomainData(buf);
    var ac = autoCorrelate(buf, audioContext.sampleRate);
    // TODO: Paint confidence meter on canvasElem here.

    if (ac == -1) {
     console.log("Vague");
    } else {
      var pitch = ac;
     console.log("Pitch is: ", Math.round(pitch));
      pitches.push(Math.round(pitch));
      var note = noteFromPitch(pitch);
    //  console.log("Note of pitch is: ", noteStrings[note % 12]);
      var detune = centsOffFromPitch(pitch, note);
    }

    if (!window.requestAnimationFrame)
      window.requestAnimationFrame = window.webkitRequestAnimationFrame;
    rafID = window.requestAnimationFrame(updatePitch);
  }

  return {
    startPitchDetect,
    stopPitchDetect,
    linePitch,
  };
};

export default usePitchAnalyser;
