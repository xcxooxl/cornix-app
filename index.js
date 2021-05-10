const { get } = require("alias-hq");
require("dotenv").config();
get("module-alias");
const { hookRouter } = require("@utils/hookRouter");
hookRouter();
require("./server");
