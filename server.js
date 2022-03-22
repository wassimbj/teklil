const express = require("express");
const cors = require("cors");
const CategoryRouter = require("./routers/CategoryRouter");
const ClientRouter = require("./routers/ClientRouter");
const DeliveryRouter = require("./routers/DeliveryRouter");
const GalleryRouter = require("./routers/GalleryRouter");
const OrderRouter = require("./routers/OrderRouter");
const ProductRouter = require("./routers/ProductRouter");
const ProviderRouter = require("./routers/ProviderRouter");
const SubCategoryRouter = require("./routers/SubCategoryRouter");
const UserRouter = require("./routers/UserRouter");
const db = require("./config/database");
const app = express();
const check_auth=require("./middlewares/check_auth");
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
/* app.use(function(req, res, next) {
  let err = new Error('Not Found');
     err.status = 404;
     next(err);
 }); */
 // handle errors
 /* app.use(function(err, req, res, next) {
  console.log(err);
   if(err.status === 404)
    res.status(404).json({message: "Not found", data:null, status:404});
   else
     res.status(500).json({message: "Something looks wrong :( !!!", data:null, status:500});
 });  */
 
app.use(express.json());
app.use(cors("*"));
app.use("/category",check_auth, CategoryRouter);
app.use("/client", ClientRouter);
app.use("/delivery", DeliveryRouter);
app.use("/gallery",check_auth, GalleryRouter);
app.use("/order",OrderRouter);
app.use("/product",check_auth, ProductRouter);
app.use("/provider", ProviderRouter);
app.use("/subcategory",check_auth, SubCategoryRouter);
app.use("/user", UserRouter);

app.get("/getImage/:img",function(req,res){
  res.sendFile(__dirname+"/storages/"+req.params.img)
})
const port = 3001;






/* 
pp.get("/", (req, res) => {
  res.send("Hello World! get ");
});
app.post("/:name", (req, res) => {
  //1er methode
  //res.send('Hello World! post '+req.body.name)
  //2eme methode
  res.send("hello " + req.params.name);
  //3eme methode
  //res.send("hello "+req.query.name)
});

app.put("/", (req, res) => {
  res.send("Hello World! put");
});

app.delete("/:", (req, res) => {
  res.send("Hello World! delete");
});
 */
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

