

async function homeController(){

    console.log('Home Controller');
    
    // await window.gsSDK.getContent('home-banner');
    // await window.gsSDK.getContent('home-reco');

    await window.gsSDK.getContentByContext('home');
}