# Colorful-Logger
Small, Fast &amp; Pretty logger for Node.js | Deno
![](https://repository-images.githubusercontent.com/277852661/c8341680-c08d-11ea-8784-ef599616c116)

```ts
const logger = new Logger('HTTP-SERVER')

logger.log("start listening on port 3000")
logger.error("A bad thing", error)
logger.warn("Depricated Url", req.url)
logger.debug("fuckingVariable is ", fuckingVariable)
```
