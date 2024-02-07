import puppeteer from "puppeteer";


const getQuotes = async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const link = "https://quotes.toscrape.com/";
  await page.goto(link, {
    waitUntil: "domcontentloaded",
  });

  let hasNextPage = true;
  let quotes = [];
  

  while (hasNextPage) {
    let id = quotes.length;
    const pageQuotes = await page.evaluate((id) => {
      const quoteList = document.querySelectorAll(".quote");

      return Array.from(quoteList).map((quote) => {
        const text = quote.querySelector(".text").innerText;
        const author = quote.querySelector(".author").innerText;
        id += 1; // Generate a unique ID

        return { id, text, author };
      });
    }, id); // Pass id as a parameter to page.evaluate()

    quotes = quotes.concat(pageQuotes);

    // Check if there is a next page
    const nextPageBtn = await page.$(".pager > .next > a");
    if (nextPageBtn) {
      await nextPageBtn.click();
      await page.waitForNavigation({ waitUntil: "domcontentloaded" });
    } else {
      hasNextPage = false;
    }
  }

  // Close the browser after scraping the data
  await browser.close();

  return quotes;
};

getQuotes().then((quotes) => {
  console.log(quotes)
});
