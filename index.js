const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require(fs);
const json2csv = require("json2csv").Parser;

const phone =
  "https://www.amazon.in/Apple-iPhone-Pro-Max-64GB/dp/B07XVLMZHH/ref=sr_1_2?crid=2XB8OHRIFGY1J&dchild=1&keywords=iphone+11+pro+max+512gb&qid=1593516900&sprefix=iphone+%2Caps%2C364&sr=8-2";

(async () => {
  let phoneData = [];
  const response = await request({
    uri: phone,
    headers: {
      accept: "text/html; charset=utf-8",
      "accept-encoding": "gzip, deflate, br",
      "accept-language": "en-US,en;q=0.9,ta;q=0.8",
    },
    gzip: true,
  });
})();
