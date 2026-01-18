/**
 * PROJECT: Water Classification via Random Forest
 * DESCRIPTION: Binary classification (Water/Non-Water) using 
 * pre-processed SAR composites.
 */

// 1. DATA LOADING
// Replace with your exported asset path
var inputImage = ee.Image("projects/your-project/assets/S1_Min_Composite_2019_2023");

// Define training samples (Ensure these variables are imported or defined)
// 1: Water, 2: Non-Water
var samples = waterSamples.merge(nonWaterSamples);

// 2. CLASSIFIER SETUP
var rfParams = {
  numberOfTrees: 500,
  seed: 42
};

var trainingData = inputImage.sampleRegions({
  collection: samples,
  properties: ['landcover'],
  scale: 10
});

// 3. TRAINING AND CLASSIFICATION
var classifier = ee.Classifier.smileRandomForest(rfParams.numberOfTrees)
  .train({
    features: trainingData,
    classProperty: 'landcover',
    inputProperties: ['VV', 'VH']
  });

var classified = inputImage.classify(classifier);

// 4. UI AND EXPORT
var classVis = {min: 1, max: 2, palette: ['0000FF', 'FFFFFF']};
Map.addLayer(classified, classVis, 'Water Classification');

Export.image.toDrive({
  image: classified,
  description: 'Water_Classification_SAR',
  folder: 'GEE_S1_Water',
  region: region, // Use your ROI
  scale: 10,
  maxPixels: 1e13
});
