const Koa = require("koa");
const BodyParser = require("koa-bodyparser");

// router
const router = require("./router");

const app = new Koa();
const bodyparser = new BodyParser();

const static = require("koa-static");

app.use(
  static(__dirname + "/public")
);

// middleware
app.use(bodyparser);
app.use(router.routes());

app.listen(3000, () => {
  console.log(`Server listening port ${3000}.`);
});
