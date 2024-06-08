const Router=require("koa-router")
const fs=require("node:fs")
const path=require("node:path")


const router=new Router();

const transactions=JSON.parse(fs.readFileSync('transactions.json','utf-8'))
// get all transactions
router.get(["/transactions","/explorer/transactions"],ctx=>{
    ctx.body=transactions;
})

//get sinfle transactions

router.get("/transaction:id",ctx=>{
    const transaction=transactions.find((tx)=>{tx.itxid===ctx.params.id});
    if(transaction){
        ctx.body=transaction;
    }else{
        ctx.status="404";
        ctx.body="transactions not found";
    }
})

module.exports=router;