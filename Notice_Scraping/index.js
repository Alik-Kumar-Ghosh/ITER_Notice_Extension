const fs = require("fs");
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://www.soa.ac.in/iter-student-notice");
  const notice = await page.evaluate(() => {
    const elements = document.getElementsByClassName("BlogList-item-title");
    return Array.from(elements).map((element) => element.innerText);
  });

  var JsonNotice = JSON.stringify(notice);
  //console.log(JsonNotice);

  fs.writeFile("test.json", JsonNotice, function (err) {
    if (err) {
      console.log(err);
    }
    else{
        console.log("Sucessfully Exported")
    }
  });

  await browser.close();
})();
