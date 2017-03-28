/*

Parameters

imageData: a flat (one-dimensional) array of the image data. The data is organized 
by row and then by column, and then one byte for each color channel red, green, and blue. 
These values will always be integers in the range 0-255.
For example, given the image:
A B C
D E F
G H I
The input array would be:

[
  A_Red, A_Green, A_Blue, B_Red, B_Green, B_Blue, C_Red, C_Green, C_Blue, 
  D_Red, D_Green, D_Blue, E_Red, E_Green, E_Blue, F_Red, F_Green, F_Blue,
  G_Red, G_Green, G_Blue, H_Red, H_Green, H_Blue, I_Red, I_Green, I_Blue
]

height: the number of rows of the image.
width: the number of columns of the image.
weights: an n x n array giving the weights for each of the neighboring pixels. 
The size of this array, n, will always be odd, with the center being the weight 
of the pixel itself. The array is by row and then column. I.e. weights[y][x]

Return

An array of the image data adjusted by the weighted average per pixel's neighborhood. 
Where the weights matrix specifies pixels outside the actual image, use the values of 
the closest pixel. (E.g. extend the edges as far as necessary to provide values 
for the matrix.) Each value should be in the range 0-255.

*/
// http://setosa.io/ev/image-kernels/
function processImage(imageData, height, width, weights){

  // map the one-dimensional array to a new 2-d (x, y) array
  // For example, height = 3, width = 3
  // [0,0] = 0, [0,1] = 3,.... , [1,0] = 9 (1 * 3 * width + 0 * 3), [1,1] = 12, [1,2] = 15 (1 * 3 * width) + 2 * 3
  // determine the center of the weights
  // for each point in the 2-d array, find the corresponding image data. 
  // if image data does not exist, extends the weight in each direction
  // map the 2-d array to the 1-d array
  // calculate the weighted red, green and blue values respectively, 
  // if pixel cannot 
  // append to the result array
  // return the result array

  const NUM_COMPONENTS = 3;
  const getImageRGB = (y, x) => {
    const idx = NUM_COMPONENTS * (y * width + x);
    if (idx >= 0 && idx < imageData.length - 1) {
      return { r: imageData[idx], g: imageData[idx+1], b: imageData[idx+2] };
    } 
    return null;
  };

  const [centerX, centerY] = [ (weights.length - 1) / 2, (weights.length - 1) / 2 ];    
  const calculateWeightedRGB = (imageY, imageX) => {      
      return weights.reduce((sumWeight, row, rowIdx) => {
          let rowWeightedRGB = row.reduce((rowWeight, weight, colIdx) => {
                const distX = colIdx - centerX;
                const distY = rowIdx - centerY;
                let [y, x] = [ imageY - distY, imageX - distX ];
                
                // image data is not found. need to extend the edge so that matrix
                // covers neighbors of pixel
                if (y < 0) { y = 0; } 
                else if (y >= height) { y = height - 1; } 
                if (x < 0) { x = 0; } 
                else if (x >= width) { x = width - 1; }
                
                let imageRGB = getImageRGB(y, x);
                if (imageRGB != null) {
                  rowWeight.r += weight * imageRGB.r;
                  rowWeight.g += weight * imageRGB.g; rowWeightedRGB
                  rowWeight.b += weight * imageRGB.b;
                } 
                return rowWeight;  
            }, { r: 0, g: 0, b: 0 });
            sumWeight.r += rowWeightedRGB.r;
            sumWeight.g += rowWeightedRGB.g;
            sumWeight.b += rowWeightedRGB.b;
            return { Math.round(sumWeight.r), Math.round(sumWeight.g), Math.round(sumWeight.b) };            
      }, { r: 0, g: 0, b: 0 });
  }

 let results = []; 
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
        let weightedRGB = calculateWeightedRGB(y, x);
        results.push(weightedRGB.r);
        results.push(weightedRGB.g);
        results.push(weightedRGB.b);
    }
  }
  return results;
}

//[98,181,166,111,185,143,119,186,87,93,161,75,69,168,39,68,159,76,113,124,89,134,106,128,143,106,120,143,136,155,137,143,142,151,161,151,124,168,114,122,143,146,102,95,162,101,59,204,94,140,163,118,149,126,127,151,90,119,148,82,97,136,65,106,130,79,108,114,103,116,118,133,98,116,147,98,114,137,106,122,142,128,140,128,129,142,113,108,133,124,105,97,148,102,79,188,97,96,164,94,103,111,92,116,97,118,134,93,111,123,95,107,123,75,87,111,93,82,126,100,64,132,118,55,111,91,80,115,111,96,97,99,118,110,106,99,117,127,119,120,148,114,127,176,87,77,177,114,95,134,131,86,122,151,116,128,116,100,119,103,112,109,83,95,102,75,82,107,55,90,108,40,89,100,49,107,114,56,91,114,108,87,107,114,82,124,140,84,135,119,89,157,84,118,145,82,127,128,103,109,136,140,141,148,136,140,135,96,141,101,88,97,84,78,74,82,97,104,73,72,123,81,70,143,102,47,108,130,95,115,120,119,83,132,149,103,137,124,111,166,70,166,139,106,152,138,146,119,140,174,158,158,164,153,138,123,150,132,101,94,127,95,90,132,110,102,112,91,122,89,77,120,113,69,105,133,95,104,139,105,71,135,129,96,130,131,120,137,75,168,125,111,165,128,137,141,144,169,146,141,183,132,135,156,141,105,126,113,124,118,137,132,142,132,125,147,133,90,133,115,110,116,104,150,120,123,177,114,101,166,141,129,140,141,153,133,77,159,171,137,137,157,165,102,149,187,111,128,184,95,127,153,115,119,127,108,152,113,151,145,126,132,121,130,114,103,139,96,110,152,104,147,135,118,150,117,110,166,141,137,145,175,173,137,119,121,151,135,114,131,128,85,119,140,96,99,165,91,102,166,112,101,144,112,133,115,132,142,107,130,135,135,120,139,139,124,138,154,144,164,131,146,148,142,148,166,154,149,166,165,178,189,130,141,150,126,123,124,120,81,109,117,102,86,135,87,114,137,117,119,144,107,149,129,140,127,101,123,124,104,124,135,109,110,129,135,150,147,130,127,121,148,149,146,155,125,150,167,155,179,174,139,125,147,129,92,124,91,82,116,95,80,119,73,105,126,117,102,122,116,118,135,151,118,91,116,150,100,117,155,72,98,144,88,130,151,110,118,139,129,147,165,152,135,149,145,162,162,131,174,122,140,144,118,153,83,118,164,69,110,136,40,136,110,88,136,86,121,144,104,165,132,83,139,158,83,107,161,72,85,145,67,108,152,116,121,130,133,139,130,165,112,105,141,110,109,104,181,76,138,155,86,162,109,106,169,92,127,146,65,140,122,99,130,101,123,118,96,139,140,85,119,154,90,101,153,78,121,112,77,146,115,101,149,117,108,143,148,135,114,146,127,118,149,94,163,67,127,151,100,150,129,129,166,110,153,154,93,150,127,100,139,117,120,119,95,131,142,93,118,138,92,124,127,109,132,96,112,158,94,118,144,106,126,145,104,144,94,127,137,71,129,98,121,119,125,134,106,138,143,134,144,132,140,144,119,162,141,126,127,136,127,103,134,125,99,136,98,80,127,124,95,140,157,90,133,186,101,117,155,107,85,142,118,110,100,144,135,92,147,111,67,193,126,79,150,144,99,157,156,103,138,163,113,175,166,123,156,131,139,129,149,129,86,155,109,47,147,116,93,158,150,131,133,168,147,124,159,113,76,138,98,92,103,102,107,88,106] 
//[98,181,166,111,185,143,119,186,87,93,161,75,69,168,39,68,159,76,113,124,89,134,106,128,143,106,120,143,136,155,137,143,142,151,161,151,124,168,114,122,143,146,102,95,162,101,59,204,94,140,163,118,149,126,127,151,90,119,148,82,97,136,65,106,130,79,108,114,103,116,118,133,98,116,147,98,114,137,106,122,142,128,140,128,129,142,113,108,133,124,105,97,148,102,79,188,97,96,164,94,103,111,92,116,97,118,134,93,111,123,95,107,123,75,87,111,93,82,126,100,64,132,118,55,111,91,80,115,111,96,97,99,118,110,106,99,117,127,119,120,148,114,127,176,87,77,177,114,95,134,131,86,122,151,116,128,116,100,119,103,112,109,83,95,102,75,82,107,55,90,108,40,89,100,49,107,114,56,91,114,108,87,107,114,82,124,140,84,135,119,89,157,84,118,145,82,127,128,103,109,136,140,141,148,136,140,135,96,141,101,88,97,84,78,74,82,97,104,73,72,123,81,70,143,102,47,108,130,95,115,120,119,83,132,149,103,137,124,111,166,70,166,139,106,152,138,146,119,140,174,158,158,164,153,138,123,150,132,101,94,127,95,90,132,110,102,112,91,122,89,77,120,113,69,105,133,95,104,139,105,71,135,129,96,130,131,120,137,75,168,125,111,165,128,137,141,144,169,146,141,183,132,135,156,141,105,126,113,124,118,137,132,142,132,125,147,133,90,133,115,110,116,104,150,120,123,177,114,101,166,141,129,140,141,153,133,77,159,171,137,137,157,165,102,149,187,111,128,184,95,127,153,115,119,127,108,152,113,151,145,126,132,121,130,114,103,139,96,110,152,104,147,135,118,150,117,110,166,141,137,145,175,173,137,119,121,151,135,114,131,128,85,119,140,96,99,165,91,102,166,112,101,144,112,133,115,132,142,107,130,135,135,120,139,139,124,138,154,144,164,131,146,148,142,148,166,154,149,166,165,178,189,130,141,150,126,123,124,120,81,109,117,102,86,135,87,114,137,117,119,144,107,149,129,140,127,101,123,124,104,124,135,109,110,129,135,150,147,130,127,121,148,149,146,155,125,150,167,155,179,174,139,125,147,129,92,124,91,82,116,95,80,119,73,105,126,117,102,122,116,118,135,151,118,91,116,150,100,117,155,72,98,144,88,130,151,110,118,139,129,147,165,152,135,149,145,162,162,131,174,122,140,144,118,153,83,118,164,69,110,136,40,136,110,88,136,86,121,144,104,165,132,83,139,158,83,107,161,72,85,145,67,108,152,116,121,130,133,139,130,165,112,105,141,110,109,104,181,76,138,155,86,162,109,106,169,92,127,146,65,140,122,99,130,101,123,118,96,139,140,85,119,154,90,101,153,78,121,112,77,146,115,101,149,117,108,143,148,135,114,146,127,118,149,94,163,67,127,151,100,150,129,129,166,110,153,154,93,150,127,100,139,117,120,119,95,131,142,93,118,138,92,124,127,109,132,96,112,158,94,118,144,106,126,145,104,144,94,127,137,71,129,98,121,119,125,134,106,138,143,134,144,132,140,144,119,162,141,126,127,136,127,103,134,125,99,136,98,80,127,124,95,140,157,90,133,186,101,117,155,107,85,142,118,110,100,144,135,92,147,111,67,193,126,79,150,144,99,157,156,103,138,163,113,175,166,123,156,131,139,129,149,129,86,155,109,47,147,116,93,158,150,131,133,168,147,124,159,113,76,138,98,92,103,102,107,88,106]     
