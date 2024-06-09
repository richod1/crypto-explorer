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