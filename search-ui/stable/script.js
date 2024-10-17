async function loadFuseAutocomplete() {

  const fuseJsUrl = 'https://sdk.gopersonal.ai/external-libs/fuse.js';
  await import(fuseJsUrl);
  
  const serializedIndex = await window.gsSDK.downloadSearchAutocompleteIndex();

  const data = serializedIndex.records.map((record) => ({
    name: record.$['0'].v // Extract the actual 'name' value from the serialized index
  }));

  // Deserializing the index and initializing Fuse
  const options = { keys: ['name', 'category'], includeMatches: true };
  const fuse = new Fuse(data, options, Fuse.parseIndex(serializedIndex));

  // Store the Fuse instance globally in window.gsAutocomplete
  window.gsAutocomplete = fuse;
  
  let facelets;
  try {
      facelets = await window.gsSDK.searchFilterFacelets();
      window.gsFacelets = facelets;
      console.log('facelets', facelets);
  } catch (error) {
      console.error('Error fetching facelets:', error);
      facelets = [];
  }
  window.gsAllProductNames = data.map(item => item.name);
  console.log('window.gsAllProductNames', window.gsAllProductNames);
}

// Function to perform a search, with an optional limit on the number of results
async function performSearch(term, limit = null) {
  if (!window.gsAutocomplete) {
    await loadFuseAutocomplete();
  }

  let result = window.gsAutocomplete.search(term);

  if (limit !== null) {
    result = result.slice(0, limit);
  }

  return result;
}

window.gsPerformSearch = performSearch;

import ('https://sdk.gopersonal.ai/libs/audio-search.js?v=1.0.0')
import ('https://sdk.gopersonal.ai/libs/image-search.js?v=1.0.0')