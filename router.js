const Router = require("koa-router");

// autojs
const engines = require("engines");
const axios = require("axios");
const fs = require("fs");

const router = new Router();

// 横幅
router.get("/Banners", async (ctx) => {
  ctx.body = [
    "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
    "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
  ];
});

// 功能
router.get("/Functions", async (ctx) => {
  ctx.body = [
    {
      image: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
      text: "功能1",
      url: "http://localhost:3000/scripts/func1.js",
    },
    {
      image: "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      text: "功能2",
      url: "http://localhost:3000/scripts/func2.js",
    },
  ];
});

// 执行网络脚本
const dir = "/sdcard/脚本/tmp/";
fs.mkdir(dir, console.log);

router.post("/Exec", async (ctx) => {
  const { url } = ctx.request.body;
  console.log("执行网络脚本", url);
  try {
    const { data, status } = await axios.get(url);
    if (status === 200) {
      setTimeout(() => {
        const file = `${dir}${Date.now()}.js`;
        fs.writeFileSync(file, data);
        engines.execScriptFile(file);
      }, 0);
      ctx.body = { success: true };
      return;
    } else {
      ctx.body = { success: false, message: "加载脚本错误 " + status };
      return;
    }
  } catch (e) {
    console.error(e);
    ctx.body = { success: false, message: e.message };
  }
});

router.post("/Submit", async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = {
    success: true,
    message: "感谢你的建议",
  };
});

router.post("/Exit", async (ctx) => {
  engines.stopAll()
});

module.exports = router;
