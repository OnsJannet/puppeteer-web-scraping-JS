
const puppeteer = require('puppeteer');
const fs = require('fs');


async function getPageData(url, page) {
    await page.goto(url);

    await page.waitForSelector('.caption');     
    const productLinks = await page.$$eval(' .description  a', allAs => allAs.map(a => a.href));
    await browser.close();
    return productLinks
};

async function getLinks() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");
    await page.goto('https://www.costco.ca/grocery-household.html');

    await page.waitForSelector('.pop-cat-container');    
    const links = await page.$$eval('.grocery-tile-container a', allAs => allAs.map(a => a.href));
    await browser.close();
    return links

    
}


async function getProductData(url, page) {
    await page.goto(url);

    await page.waitForSelector('.top-content');

    const divEval = await page.$('.product-h1-container-v2'); 
    const name = await page.evaluate( productName => productName.innerText, divEval);

    const divImg = await page.$('.img-responsive'); 
    const image = await page.evaluate( imageSrc => imageSrc.getAttribute('src'), divImg);

    const divPrice = await page.$('.canada-currency-size'); 
    const price = await page.evaluate( ProductPrice => ProductPrice.innerText, divPrice);

    const productDetails = await page.$('.product-info-description > ul');
    const description = await page.evaluate( ProductDetails => ProductDetails.innerText, productDetails);

    let productInfo = {
        name: name ? name : null,
        image: image ? image : null,
        price: price ? price : null,
        description: description ? description : null,
    };

    //console.log(productInfo);
};


async function main() {
    const allLinks = await getLinks();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");
    const scrapedData = [];

    for(let link of allLinks){
        const data = await getPageData(link, page);
        scrapedData.push(data);     
    }
    await browser.close();


    const allLinksProducts = await getPageData();
    const browser2 = await puppeteer.launch({ headless: true });
    const page2 = await browser2.newPage();
    await page2.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");
    const scrapedDataProduct = [];

    for(let linkProduct of allLinksProducts){
        const dataProduct = await getProductData(linkProduct, page);
        scrapedDataProduct.push(dataProduct);     
    }
    await browser.close();
}

main();