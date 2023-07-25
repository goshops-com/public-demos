const storiesType = [
  {
    imageName: "pic1-removebg-preview.png",
    type: "Most Popular",
  },
  {
    imageName: "pic2-removebg-preview.png",
    type: "Personalized",
  },
  {
    imageName: "pic3-removebg-preview.png",
    type: "Recent",
  },
  {
    imageName: "pic9-removebg-preview.png",
    type: "Featured",
  },
  {
    imageName: "pic10-removebg-preview.png",
    type: "Trending",
  },
];

const storiesData = {
  Most_Popular: [
    {
      ItemName: "Varisty Crew",
      price: "$39.99",
      imageName: "pic1-removebg-preview.png",
    },
    {
      ItemName: "Boyfriend Flannel",
      price: "$59.99",
      imageName: "pic2-removebg-preview.png",
    },
    {
      ItemName: "Baloon Sleeve Sweater",
      price: "$72.99",
      imageName: "pic3-removebg-preview.png",
    },
  ],
  Personalized: [
    {
      ItemName: "Floral Mini",
      price: "$49.99",
      imageName: "pic2-removebg-preview.png",
    },
    {
      ItemName: "Maxi dress",
      price: "$149",
      imageName: "pic5-removebg-preview.png",
    },
    {
      ItemName: "Bodycon dress",
      price: "$170",
      imageName: "pic6-removebg-preview.png",
    },
    {
      ItemName: "Peplum dress",
      price: "$175",
      imageName: "pic7-removebg-preview.png",
    },
    {
      ItemName: "Strapless dress",
      price: "$200",
      imageName: "pic8-removebg-preview.png",
    },
  ],
  Recent: [
    {
      ItemName: "Skater dress",
      price: "$245.99",
      imageName: "pic3-removebg-preview.png",
    },
  ],
  Featured: [
    {
      ItemName: "Shirt dress",
      price: "$215",
      imageName: "pic9-removebg-preview.png",
    },
    {
      ItemName: "Baloon Sleeve Sweater",
      price: "$72.99",
      imageName: "pic3-removebg-preview.png",
    },
  ],
  Trending: [
    {
      ItemName: "One-shoulder dress",
      price: "$285",
      imageName: "pic10-removebg-preview.png",
    },
    {
      ItemName: "Shirt dress",
      price: "$215",
      imageName: "pic9-removebg-preview.png",
    },
    {
      ItemName: "Baloon Sleeve Sweater",
      price: "$72.99",
      imageName: "pic3-removebg-preview.png",
    },
  ],
};
//
const myElement = document.getElementById("story-wrapper");
let newHTMLContent = "";
storiesType.forEach((item) => {
  newHTMLContent += `<div class="status-card">
    <div onclick="openStory('${item.type}')" class="profile-pic">
      <div class="image-div">
        <img src= "./assets/${item.imageName}" alt="story" />
      </div>
    </div>
    <p class="username">${item.type}</p>
  </div>`;
});
// Set the innerHTML property to update the content
myElement.innerHTML = newHTMLContent;
//

let storyPopup = document.getElementById("open-story");
var upcommingStories=[];
function openStory(typeName) {
  let replacedName = typeName.replace(/\s/g, "_");
  let data = storiesData[replacedName];
  upcommingStories = [];
  var interval = 2000;
  if (data) {
    storyPopup.style.display = "block";
    let htmlForIndicators = "";
    let indicator = document.getElementById("indicator-div");
   
    for (let index = 0; index <= data.length; index++) {
      if (data[index]) {
        htmlForIndicators += `<span id="indicatior${index}" class="indicator"></span>`;
      }
      var timeOutid = setTimeout(() => {
        const item = data[index];
        if (item) {
          document.getElementById("openStory-type").innerText = typeName;
          document.getElementById("open-story-price").innerText = item.price;
          document.getElementById("open-name-strip").innerText = item.ItemName;
          const openStoryImgElement = document.getElementById("openStory-img");
          const srcValue = `./assets/${item.imageName}`;
          openStoryImgElement.setAttribute("src", srcValue);
          document.getElementById(`indicatior${index}`).classList.add("active");
        } else {
          closeStory();
        }
      }, interval * index);
      upcommingStories.push(timeOutid);
    }
    indicator.innerHTML = htmlForIndicators;
  }
}
function closeStory() {
  if (upcommingStories && upcommingStories.length > 0) {
    upcommingStories.forEach((timeOutid) => {
      clearTimeout(timeOutid);
    });
  }
  upcommingStories=[];
  storyPopup.style.display = "none";
}
