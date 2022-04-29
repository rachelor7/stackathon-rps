// import handpose
import * as handpose from '@tensorflow-models/handpose'

// import WebGL backend for TensorFLow
// note: this backend is included by default in '@tensorflow/tfjs'
// this import is just added in case you want to replace it with the WASM backend
import '@tensorflow/tfjs-backend-webgl'

// import the FingerPose gesture estimator + our predefined gestures
import { GestureEstimator } from 'fingerpose'
import {
  RockGesture,
  PaperGesture,
  ScissorsGesture,
  RadGesture,
  PointerGesture,
  ThumbsUpGesture,
} from './Gestures'

// import a sample (dummy) image used to warm up the model
import { SampleImage } from './SampleImage'

// store references
let handposeModel
let gestureEstimator

export const Prediction = {
  async init() {
    // initialize finger gesture recognizer with known gestures
    const knownGestures = [
      RockGesture,
      PaperGesture,
      ScissorsGesture,
      RadGesture,
      PointerGesture,
      ThumbsUpGesture,
    ]
    gestureEstimator = new GestureEstimator(knownGestures)
    console.log('Initialized FingerPose with ' + knownGestures.length + ' gestures')

    // load handpose model
    console.log('Loading handpose model...')
    handposeModel = await handpose.load()
    console.log('Model loaded')

    // make one prediction on a sample image
    // this is to "warm up" the model so there won't be a delay
    // before the actual predictions later
    console.log('Warm up model')
    const sample = await SampleImage.create()
    await handposeModel.estimateHands(sample, false)
    console.log('Model is hot!')
  },

  async predictGesture(sourceElement, minimumScore) {
    const predictions = await handposeModel.estimateHands(sourceElement, false)

    if (predictions.length > 0) {
      // detect gestures
      const gestureEstimations = gestureEstimator.estimate(predictions[0].landmarks, minimumScore)

      // get gesture with highest match score
      if (gestureEstimations.gestures.length > 0) {
        // this will reduce an array of results to a single value
        // containing only the gesture with the highest score
        const gestureResult = gestureEstimations.gestures.reduce((p, c) =>
          p.confidence > c.confidence ? p : c
        )

        return gestureResult.name
      }
    }

    return ''
  },
}
