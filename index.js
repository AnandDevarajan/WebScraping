const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const json2csv = require("json2csv").Parser;

const phones = [
  "https://www.amazon.in/Apple-iPhone-Pro-Max-64GB/dp/B07XVLMZHH/ref=sr_1_2?crid=2XB8OHRIFGY1J&dchild=1&keywords=iphone+11+pro+max+512gb&qid=1593516900&sprefix=iphone+%2Caps%2C364&sr=8-2",
  "https://www.amazon.in/Samsung-Galaxy-Storage-Additional-Exchange/dp/B08444S68F/ref=sr_1_1_sspa?dchild=1&keywords=samsung&qid=1593523869&sr=8-1-spons&psc=1&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUFVMlM3WUFYUjI4SUkmZW5jcnlwdGVkSWQ9QTAwOTI4OTUzMllNNFVEWUQwNVdQJmVuY3J5cHRlZEFkSWQ9QTA5NzYxNzEyRFVGMkVPTzZEQVdEJndpZGdldE5hbWU9c3BfYXRmJmFjdGlvbj1jbGlja1JlZGlyZWN0JmRvTm90TG9nQ2xpY2s9dHJ1ZQ==",
];

(async () => {
  let phoneData = [];
  for (let phone of phones) {
    const response = await request({
      uri: phone,
      headers: {
        accept: "text/html; charset=utf-8",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,ta;q=0.8",
      },
      gzip: true,
    });
    let $ = cheerio.load(response);
    const title = $('div[class="a-section a-spacing-none"]>h1>span').text();
    const rating = $('div[class="a-row"]>span').text();
    const review = $(
      'div[class="a-expander-content reviewText review-text-content a-expander-partial-collapse-content"]>span'
    ).text();
    const size = $('div[class="a-row a-spacing-micro singleton"]>span').text();
    const price = $(
      'div[class="a-section a-spacing-small"]>table[class="a-lineitem"]>tbody>tr>td[class="a-span12"]>span'
    ).text();
    phoneData.push({
      title,
      rating,
      review,
      size,
      price,
    });
  }

  const j2cp = new json2csv();
  const csv = j2cp.parse(phoneData);
  fs.writeFileSync("./phone.csv", csv, "utf-8");
})();
