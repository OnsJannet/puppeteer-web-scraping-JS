const puppeteer = require('puppeteer');


(async () => {
    //async function to able to use await, it tels puppeteer to wait and move on to next action
    try {
        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();
        await page.goto('https://www.costco.ca/grocery-household.html');


        //handleCookies
        await page.waitForSelector('.ot-sdk-eight');
        const handleCookies = await page.waitForSelector('#onetrust-accept-btn-handler');
        await Promise.all([
            page.waitForNavigation(),
            handleCookies.click(),
        ])      
        
        //handleZip
        const Zip = await page.$$('.MuiPaper-root');
        const handleZip = await page.waitForSelector(
            '.MuiSvgIcon-root'
        )
        await Promise.all([
            page.waitForNavigation(),
            handleZip.click(),
        ])
        await page.waitForNavigation();


        await page.waitForSelector('.pop-cat-container');
        const containers = await page.$$('.grocery-tile-container');

        //Loop over every category on the main page
        for (let i = 0; i < containers.length; i++) {
            const container = containers[i];
            const catButton = await container.$('a');
            const catButtonName = await page.evaluate( catButton => catButton.innerText, catButton);
            catButton.click();

            await page.waitForSelector('.product-list');
            const products = await page.$$('.product-tile-set');

            //Loop over every product on the category page
            for (let i = 0; i < products.length; i++) {
                const product = products[i];

                const categoryName = await page.$('.toolbar > h1');
                const category = await page.evaluate( categoryName => categoryName.innerText, categoryName);

                const handleProduct = await product.$('a.product-image-url');
                const handleProductName = await page.evaluate( handleProduct => handleProduct.innerText, handleProduct);                
                await Promise.all([
                    page.waitForNavigation(),
                    handleProduct.click(),
                ])

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
                    category: category? category : null,
                };

                console.log(productInfo);
            }
        };
        
        //await browser.close()
    } catch (e) {
        console.error('our error', e);
    }
})();