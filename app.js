const Koa=require("koa")
const path=require("node:path")
const fs=require("node:fs")
const bodyParser=require("koa-bodyparser")
const serve=require("koa-static")
const router=require("./router/route")
const port=3000

// first time trying koajs seems similar to expressjs which makes if easy
const app=new Koa();

// loading ctypto transactions
// replaced by router
// const transactions=JSON.filparse(fs.readFileSync('transactions.json','utf-8'))
app.use(bodyParser())


// serving a static file in the template dir
app.use(serve(path.join(__dirname,'template'),{extensions:['html']}))


app.use(router.routes().use(router.allowedMethods()));

app.listen(port,()=>{
    console.log(`server is up on port: ${port}`)
})