const orderRoute = require("./order.routes");
const productRoute = require("./product.routes");
const userRoute = require("./user.routes");

const Routes = [userRoute, productRoute, orderRoute];
 
module.exports = Routes;
