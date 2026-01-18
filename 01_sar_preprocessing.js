/**
 * PROJECT: Sentinel-1 Water Body Classification
 * DESCRIPTION: Speckle filtering and generation of Min/Max composites 
 * from Sentinel-1 SAR time series (2019-2022).
 * AUTHOR: Gabriel Silva
 */

// 1. CONFIGURATIONS
var region = RMRJ; // ROI (Region of Interest)
var dateStart = '2019-01-01';
var dateEnd = '2022-12-31';

var params = {
  polarization: 'VH',
  orbitPass: 'DESCENDING',
  instrumentMode: 'IW',
  scale: 10
};

var visParams = {
  min: -25, 
  max: -5, 
  bands: 'VH'
};

// 2. FUNCTIONS
/**
 * Applies a focal median filter to reduce speckle noise.
 */
function applySpeckleFilter(image) {
  var filtered = image.focal_median({
    radius: 3,
    units: 'pixels',
    kernelType: 'square',
    iterations: 3
  });
  return filtered.copyProperties(image, image.propertyNames());
}

// 3. DATA PROCESSING
var s1Collection = ee.ImageCollection("COPERNICUS/S1_GRD")
  .filterBounds(region)
  .filterDate(dateStart, dateEnd)
  .filter(ee.Filter.eq('instrumentMode', params.instrumentMode))
  .filter(ee.Filter.listContains('transmitterReceiverPolarisation', params.polarization))
  .filter(ee.Filter.eq('orbitProperties_pass', params.orbitPass))
  .map(applySpeckleFilter);

// Generate Composites
var minComposite = s1Collection.min().clip(region);
var maxComposite = s1Collection.max().clip(region);

// 4. VISUALIZATION
Map.centerObject(region, 10);
Map.addLayer(minComposite, visParams, 'SAR Min Composite (VH)');
Map.addLayer(maxComposite, visParams, 'SAR Max Composite (VH)');

// 5. EXPORT
Export.image.toDrive({
  image: minComposite,
  description: 'S1_Min_Composite_2019_2022',
  folder: 'GEE_S1_Water',
  fileNamePrefix: 's1_min_composite',
  region: region,
  scale: params.scale,
  maxPixels: 1e13
});
