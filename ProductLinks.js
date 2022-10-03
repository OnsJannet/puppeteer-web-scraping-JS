const puppeteer = require('puppeteer');
import getLinks from './CategoryScraper';

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    for(const links of allLinks){
        const data = await getLinks('link', page);   
        links.click();    

    }
    await page.goto(link);

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
    const links = await page.$$eval('.grocery-tile-container a', allAs => allAs.map(a => a.href));
    console.log(links);
})();