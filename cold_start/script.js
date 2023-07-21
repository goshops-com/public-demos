const noRank = getParam('noRank');

async function reload(){
    let where = {};
    let filter = false;
    if (window.categories.length > 0){
      where['category'] =  { $in: window.categories }
      filter = true;
    }
    if (window.colors.length > 0){
      where['color_id'] =  { $in: window.colors } ;
      filter = true;
    }

    let items;

    if (!noRank){
        if (!filter){
            console.log('No filter, ranking');
            items = await window.gsSDK.getRanking('affinity', {maxItems: 20});
        }else{
            items = await window.gsSDK.getItems({limit: 20, offset: 0, where: where});
            items.resultData = await window.gsSDK.reRank('affinity', {affinityField: 'color_id,gender_id', items: items.resultData});
        }
    }else{
        items = await window.gsSDK.getItems({limit: 20, offset: 0, where: where});
    }
    
    loadProducts(items)
  }

async function loadCategories(categories){
    const categoriesTemplate = Handlebars.compile(categoryTemplate);
    const categoriesHtml = categoriesTemplate({ categories: categories });
    document.getElementById('categories-container').innerHTML = categoriesHtml;

    // Add click event listener to the checkboxes
    const checkboxesCategory = document.querySelectorAll('.category-checkbox');
    checkboxesCategory.forEach(function(checkbox) {
        checkbox.addEventListener('click', async function() {
        if (this.checked) {
            window.categories.push(this.value);
        } else {
            const index = window.categories.indexOf(this.value);
            if (index !== -1) {
            window.categories.splice(index, 1);
            }
        }
            await reload()
        });
    });
}

async function loadColors(colors){
    const processedColors = colors.map(color => ({
        ...color,
        lowercaseValue: color.fieldValue.toLowerCase()
    }));


    const colorsTemplate = Handlebars.compile(colorTemplate);
    const colorsHtml = colorsTemplate({ colors: processedColors });
    document.getElementById('colors-container').innerHTML = colorsHtml;

    // Add click event listener to the checkboxes
    const checkboxesColor = document.querySelectorAll('.color-checkbox');
    checkboxesColor.forEach(function(checkbox) {
    checkbox.addEventListener('click', async function() {
        if (this.checked) {
        window.colors.push(this.value);
        } else {
        const index = window.colors.indexOf(this.value);
        if (index !== -1) {
            window.colors.splice(index, 1);
        }
        }
        console.log(window.colors)
        await reload()
    });
    });
}

async function loadProducts(items){
    const products = items.resultData.map(item => ({
        id: item.id,
        image: item.image_url || "",
        title: item.name || "",
        description: "",
        price: "$ " + item.price || "",
        originalPrice: "",
        discount: ""
    }));

    const productsData = {
        products: products
    };
    var template = Handlebars.compile(templateProductList);
    var renderedHtml = template(productsData);
    var productContainer = document.getElementById("product-container");
    productContainer.innerHTML = renderedHtml;
}

function getParam(param){
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param)
}