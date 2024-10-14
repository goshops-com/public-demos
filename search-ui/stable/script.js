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
  }

  // Function to perform a search, with an optional limit on the number of results
async function performSearch(term, limit = null) {
    // Check if the Fuse.js instance is already loaded in window.gsAutocomplete
    if (!window.gsAutocomplete) {
      // If not, load Fuse.js and the index
      await loadFuseAutocomplete();
    }
  
    // Perform the search using the loaded Fuse.js instance
    let result = window.gsAutocomplete.search(term);
  
    // Apply the result limit if provided
    if (limit !== null) {
      result = result.slice(0, limit);
    }
  
    console.log(result); // You can modify this to return the result or display it in the UI
    return result;
  }

  window.gsPerformSearch = performSearch;