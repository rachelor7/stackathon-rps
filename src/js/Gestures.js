import { GestureDescription, Finger, FingerCurl, FingerDirection } from 'fingerpose'

const RockGesture = new GestureDescription('rock') // ✊️
const PaperGesture = new GestureDescription('paper') // 🖐
const ScissorsGesture = new GestureDescription('scissors') // ✌️
const PointerGesture = new GestureDescription('pointer') // ☝
const RadGesture = new GestureDescription('rad') // 🤟
const ThumbsUpGesture = new GestureDescription('thumbsup') //  👍

// Rock
// -----------------------------------------------------------------------------

// thumb: half curled
// accept no curl with a bit lower confidence
RockGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0)
// RockGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5)

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  RockGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
  RockGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}

// Paper
// -----------------------------------------------------------------------------

// no finger should be curled
for (let finger of Finger.all) {
  PaperGesture.addCurl(finger, FingerCurl.NoCurl, 1.0)
}

// Scissors
//------------------------------------------------------------------------------

// index and middle finger: stretched out
ScissorsGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)
ScissorsGesture.addCurl(Finger.Middle, FingerCurl.NoCurl, 1.0)

// ring: curled
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
ScissorsGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9)

// pinky: curled
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0)
ScissorsGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9)

// Pointer
//------------------------------------------------------------------------------

// index finger: stretched out
PaperGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)

// middle: curled
PaperGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0)
PaperGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9)

// ring: curled
PaperGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
PaperGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9)

// pinky: curled
PaperGesture.addCurl(Finger.Pinky, FingerCurl.FullCurl, 1.0)
PaperGesture.addCurl(Finger.Pinky, FingerCurl.HalfCurl, 0.9)

// Rad Gesture
//------------------------------------------------------------------------------

// index finger: stretched out
RadGesture.addCurl(Finger.Index, FingerCurl.NoCurl, 1.0)

// pinky finger: stretched out
RadGesture.addCurl(Finger.Pinky, FingerCurl.NoCurl, 1.0)

// middle finger : curled
RadGesture.addCurl(Finger.Middle, FingerCurl.FullCurl, 1.0)
RadGesture.addCurl(Finger.Middle, FingerCurl.HalfCurl, 0.9)

// ring finger : curled
RadGesture.addCurl(Finger.Ring, FingerCurl.FullCurl, 1.0)
RadGesture.addCurl(Finger.Ring, FingerCurl.HalfCurl, 0.9)

// Thumbs up
//------------------------------------------------------------------------------

// thumb: no curl
// accept no curl with a bit lower confidence
ThumbsUpGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 1.0)
ThumbsUpGesture.addDirection(Finger.Thumb, FingerDirection.VerticalUp, 0.95)

// all other fingers: curled
for (let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
  ThumbsUpGesture.addCurl(finger, FingerCurl.FullCurl, 1.0)
  ThumbsUpGesture.addCurl(finger, FingerCurl.HalfCurl, 0.9)
}

export { RockGesture, PaperGesture, ScissorsGesture, PointerGesture, RadGesture, ThumbsUpGesture }
