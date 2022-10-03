const puppeteer = require('puppeteer');


async function getPageData(url, page) {
    await page.goto(url);

        //client-side (debugging purposes)
        /*handleCookies
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
        ])*/

        
        //await page.waitForNavigation();
    const productLinks = await page.$$eval('.caption .description  a', allAs => allAs.map(a => a.href));
    console.log(productLinks)
    return productLinks
};

module.exports = {
    product: getPageData
 };


async function getLinks() {
    //client-side (debugging purposes) set headless to false
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");
    await page.goto('https://www.costco.ca/grocery-household.html');


    //client-side (debugging purposes)
    /*handleCookies
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
    ])*/

    //await page.waitForNavigation();
    await page.waitForSelector('.pop-cat-container');    
    const links = await page.$$eval('.grocery-tile-container a', allAs => allAs.map(a => a.href));
    await browser.close();
    return links

    
}






async function main() {
    const allLinks = await getLinks();
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");
    const scrapedData = [];

    for(let link of allLinks){
        const data = await getPageData(link, page);
        /* just to not be blocked by server
        const secondToWait =(Math.floor(Math.random() * 4) + 1) * 1000
        await page.waitFor(secondToWait);*/
        scrapedData.push(data);     
    }

    console.log(scrapedData);
    await browser.close();
}

main();


