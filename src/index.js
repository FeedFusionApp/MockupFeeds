var builder = require('xmlbuilder');
const fs = require('fs')

const DIR = "https://raw.githubusercontent.com/FeedFusionApp/MockupFeeds/main/publish"
const articleContent = `<html><h1>Hello There</h1></html>>`

function generateRSS() {
    // Directories
    if (fs.existsSync("./publish/RSS")) {
        fs.rmSync("./publish/RSS", { recursive: true })
    }
    fs.mkdirSync("./publish/RSS/items", { recursive: true })

    const root = builder.create("rss")
    root.att("version", "2.0")
    var channel = root.ele("channel")
    channel.element("title", null, "RSS Feed Example")
    channel.element("link", null, "${DIR}/site.html")
    channel.element("description", null, "This Example adheres to RSS 2.0 Specification")

    var articles = [];
    for (var itemID = 1; itemID < 10; itemID++) {
        var pubDate = new Date();
        pubDate.setDate(pubDate.getDate() - (itemID - 1));

        var item = channel.element("item")
        item.element("title", null, "RSS Feed Example")
        item.element("link", null, `${DIR}/RSS/items/item-${itemID}.html`)
        item.element("description", null, "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")
        item.element("pubDate", null, `${pubDate}`)
        item.element("guid", null, `example-${itemID}`)

        var itemContent = articleContent.replace("#ID", itemID)
        fs.writeFileSync(`./publish/RSS/items/item-${itemID}.html`, itemContent)
    }
    const xml = root.end({ pretty: true });

    fs.writeFileSync('./publish/RSS/feed.xml', xml)
}

generateRSS()