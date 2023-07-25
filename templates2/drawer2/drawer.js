const topPicsItems = [
  {
    imageName: "pic1-removebg-preview.png",
    itemName: "Cotton Crew Neck",
    price: "$19.95",
  },
  {
    imageName: "pic2-removebg-preview.png",
    itemName: "Hooded Pullover",
    price: "$49.95",
  },
  {
    imageName: "pic4-removebg-preview.png",
    itemName: "Chambray Shirt",
    price: "$34.95",
  },
  {
    imageName: "pic8-removebg-preview.png",
    itemName: "Terry Shorts",
    price: "$59.95",
  },
];
const tShirtsItems = [
  {
    imageName: "pic3-removebg-preview.png",
    itemName: "Pocket Polo",
    price: "$19.95",
  },
  {
    imageName: "pic9-removebg-preview.png",
    itemName: "Twill Shirt",
    price: "$35.95",
  },
  {
    imageName: "pic5-removebg-preview.png",
    itemName: "Supima Tee",
    price: "$22.95",
  },
  {
    imageName: "pic6-removebg-preview.png",
    itemName: "Super Henry",
    price: "$24.95",
  },
  {
    imageName: "pic14-removebg-preview.png",
    itemName: "PixelPop Shirts",
    price: "$50.95",
  },
];
const shortsItems = [
  {
    imageName: "pic18-removebg-preview.png",
    itemName: "Swift Shorts",
    price: "$89.95",
  },
  {
    imageName: "pic8-removebg-preview.png",
    itemName: "Terry Shorts",
    price: "$59.95",
  },
  {
    imageName: "pic19-removebg-preview.png",
    itemName: "Flow Shorts",
    price: "$69.95",
  },

  {
    imageName: "pic20-removebg-preview.png",
    itemName: "Move Shorts",
    price: "$37.95",
  },
  {
    imageName: "pic21-removebg-preview.png",
    itemName: "Step Shorts",
    price: "$55.75",
  },
];

const topDrawer = document.getElementById("top-drawer");
const tShirtDrawer = document.getElementById("tShirt-drawer");
const shortDrawer = document.getElementById("short-drawer");

createItems(topPicsItems, topDrawer, true);
createItems(tShirtsItems, tShirtDrawer, false);
createItems(shortsItems, shortDrawer, false);

function createItems(data, drawerElement, largeSize) {
  let newHTMLContent = "";
  data.forEach((item) => {
    newHTMLContent += `
              <div class="item-card">
                  <div  class="item-pic ${largeSize ? "" : "small-item-pic"}">
                      <img src= "./assets/${item.imageName}" alt="story" />
                  </div>
                  <p  class="item-name">${item.itemName}</p>
                  <span class="price">${item.price}</span>
                </div>`;
  });
  // Set the innerHTML property to update the content
  drawerElement.innerHTML = newHTMLContent;
}

function openDrawer() {
  let drawer = document.getElementById("drawer-section").classList;
  let arrow = document.getElementById("arrow").classList;
  if (drawer.contains("expand")) {
    drawer.remove("expand");
  } else {
    drawer.add("expand");
  }
  if (arrow.contains("arrow-up")) {
    arrow.remove("arrow-up");
  } else {
    arrow.add("arrow-up");
  }
}
