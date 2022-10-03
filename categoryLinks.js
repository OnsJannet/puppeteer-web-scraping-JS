const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36");
    await page.goto('https://www.costco.ca/grocery-household.html');

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
    ])
    await page.waitForNavigation();*/
    await page.waitForSelector('.pop-cat-container');    
    const links = await page.$$eval('.grocery-tile-container a', allAs => allAs.map(a => a.href));
    console.log(links);
})();