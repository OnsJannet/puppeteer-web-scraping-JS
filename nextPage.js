const puppeteer = require('puppeteer');

(async ()=> {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto('https://www.costco.ca/coffee-tea.html?currentPage=1&pageSize=24');
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
    await page.click(' .text-center .forward a');


})();