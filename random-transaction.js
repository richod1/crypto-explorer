const { timeStamp } = require("node:console");
const crypto=require("node:crypto")

// generating hex
const generatehex=(length)=>crypto.randomBytes(length).toString("hex");
const generateAddress=()=>`addr_${generatehex(3)}`
const generateTxId=()=>`tx_${generatehex(4)}`;
const getRandomInt=(max,min)=>Math.floor(Math.random()*(max-min+1)) + min;
let currentTimestamp=new Date();

// function to generate timestamp
const generateTimestamp=()=>{
    const newTimeStamp=new Date(currentTimestamp.getTime()+getRandomInt(1000,60000));
    currentTimestamp=newTimeStamp;
    return newTimeStamp.toISOString();
}

let addressBalance={};
let spentOutput=new Map();


const createCoinbaseTransaction=()=>{
    const address=generateAddress();
    const txid=generateTxId();
    // calculating if the amount is 200
    const amount=200;
    addressBalance[address]=(addressBalance[address] || 0)+amount;
    return{
        txid:txid,
        timestamp:generateTimestamp(),
        input:[],
        outputs:[{
            address:address,
            amount:amount,
        }]
    }
}

const selectInput=(amountNeeded)=>{
    const inputs=[];
    let totalselected=0;
    const threasholdMultiplier=1+(Math.random() * 1);
    const targetAmount=amountNeeded*threasholdMultiplier;

    for(const [txid,{address,amount}] of spentOutput){
        if(totalselected>=targetAmount) break;
        inputs.push({txid,address});
        totalselected+=amount;
        spentOutput.delete(txid);

    }

    return {inputs,totalselected};
}



const generateTransaction=()=>{
    const txid=generateTxId();
    const amountNeeded=getRandomInt(1,100)
    const {inputs,totalselected}=selectInput(amountNeeded);
    if(inputs.length===0){
        return null;
    }
    const outputs=[];
    outputs.push({address:generateAddress(),amount:amountNeeded});
    let remainingAmount=totalselected-amountNeeded;
    const numberOfChangeAddress=getRandomInt(1,3)
    for(let i=0;i<numberOfChangeAddress;i++){
        const AmountForThisAddress=(i===numberOfChangeAddress-1)?remainingAmount:Math.floor(remainingAmount/(numberOfChangeAddress-1))
        if(AmountForThisAddress>0){
            outputs.push({address:generateAddress(),amount:AmountForThisAddress});
            remainingAmount-=AmountForThisAddress;
        }
        outputs.forEach(output=>{
            spentOutput.set(txid,{address:output.address,amount:output.amount})
        })

        return{
            txid,timeStamp:generateTimestamp(),inputs,outputs
        }
    }
}