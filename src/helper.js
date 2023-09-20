import logo from './pictures/logo.png';

let modifyErrors=(val)=>{
    let errors=document.getElementById("errors");
    errors.innerHTML=val;
}

export let handleSolDiv=()=>{
    let solutions=document.getElementById("solution");
    let solHead=document.getElementById("solHead");
    let solPic=document.getElementById("solPic");
    solHead.innerHTML="";
    solPic.innerHTML="";
    if(solutions.innerHTML===""){
        let x=document.createElement('img');
        x.src=logo;
        solPic.appendChild(x);

        solHead.innerHTML="";
    } else {
        solPic.innerHTML="";
        solHead.innerHTML="Solution : ";
    }
}

export let clearInput=()=>{
    modifyErrors("");
    let inputs=document.querySelectorAll(".input");
    for(let i=0;i<inputs.length;i++){
        inputs[i].value='';
    }
}

export let resetAll=()=>{
    clearInput();
    let transactionsMade=document.getElementById("transactionsMade");
    let solutions=document.getElementById("solution");
    transactionsMade.innerHTML="";
    solutions.innerHTML="";
    handleSolDiv();
}

export let addTransaction=()=>{
    modifyErrors("");
    let inputs=document.querySelectorAll(".input");
    let flag =false;
    for(let i=0;i<inputs.length;i++){
        if(inputs[i].value==='' || (inputs[i].type==="number" && parseInt(inputs[i].value)<1)) flag=true;
    }
    if(flag===true){
        modifyErrors("Error: Amount can't be non-positive and Inputs can't be empty");
        return;
    }

    inputs[0].value=inputs[0].value.toUpperCase();
    inputs[1].value=inputs[1].value.toUpperCase();

    if(inputs[0].value===inputs[1].value){
        modifyErrors("Error: Persons between whom transaction has been made can't be same");
        return;
    }

    if(inputs[0].value.includes(',') || inputs[1].value.includes(',')){
        modifyErrors("Error: Names cannot contain ','");
        return;
    }

    let a=(inputs[0].value.length>15)?inputs[0].value.slice(0,13)+"..":inputs[0].value;
    let b=(inputs[1].value.length>15)?inputs[1].value.slice(0,13)+"..":inputs[1].value;

    let x=document.createElement("div");
    let temp1=document.createElement("p");
    temp1.innerHTML=`${a} => ${b}`;
    let temp2=document.createElement('i');
    temp2.classList.add("fa-solid");
    temp2.classList.add("fa-coins");
    let temp3=document.createElement('p');
    temp3.innerHTML=`${inputs[2].value}`;

    x.appendChild(temp1);
    x.appendChild(temp2);
    x.appendChild(temp3);


    x.value=`${inputs[0].value},${inputs[1].value},${inputs[2].value}`;

    x.classList.add("transaction");

    let transactionsMade=document.getElementById("transactionsMade");
    transactionsMade.appendChild(x);

    clearInput();
}


let N=0;
let nameToId={};
let idToName={};

function getMin(arr)
    {
        let minInd = 0;
        for (let i = 1; i < N; i++)
            if (arr[i] < arr[minInd])
                minInd = i;
        return minInd;
    }
    function getMax(arr)
    {
        let maxInd = 0;
        for (let i = 1; i < N; i++)
            if (arr[i] > arr[maxInd])
                maxInd = i;
        return maxInd;
    }
    function minOf2(x , y)
    {
        return (x < y) ? x: y;
    }
    function minCashFlowRec(amount)
    {
        let mxCredit = getMax(amount), mxDebit = getMin(amount);
     
        if (amount[mxCredit] === 0 && amount[mxDebit] === 0)
            return;
     
        let min = minOf2(-amount[mxDebit], amount[mxCredit]);
        amount[mxCredit] -= min;
        amount[mxDebit] += min;
     
        let x=document.createElement("div");
        let temp1=document.createElement("p");
        temp1.innerHTML=`${idToName[mxDebit].length>15?idToName[mxDebit].slice(0,13)+"..":idToName[mxDebit]} => ${idToName[mxCredit].length>15?idToName[mxCredit].slice(0,13)+"..":idToName[mxCredit]}   `;
        let temp2=document.createElement('i');
        temp2.classList.add("fa-solid");
        temp2.classList.add("fa-coins");
        let temp3=document.createElement('p');
        temp3.innerHTML=`${min}`;

        x.appendChild(temp1);
        x.appendChild(temp2);
        x.appendChild(temp3);

        let solution=document.getElementById("solution");
        solution.appendChild(x);

        minCashFlowRec(amount);
    }
    function minCashFlow(graph)
    {
        let amount=Array.from({length: N}, (_, i) => 0);
     
        for (let p = 0; p < N; p++)
        for (let i = 0; i < N; i++)
            amount[p] += (graph[i][p] - graph[p][i]);
     
        minCashFlowRec(amount);
    }



export let submit=()=>{
    let solution=document.getElementById("solution");
    solution.innerHTML="";
    let tempNames=[];
    let j=0;
    let transactions=document.querySelectorAll(".transaction");
    let transactionList= new Array(transactions.length);
    for(let i=0;i<transactions.length;i++){
        transactionList[i]=transactions[i].value.split(',');
    }
    // console.log(transactionList);
    for(let i=0;i<transactionList.length;i++){
        if(!tempNames.includes(transactionList[i][0])){
            tempNames.push(transactionList[i][0]);
            idToName[j]=transactionList[i][0];
            nameToId[transactionList[i][0]]=j;
            j++;
        }
        if(!tempNames.includes(transactionList[i][1])){
            tempNames.push(transactionList[i][1]);
            idToName[j]=transactionList[i][1];
            nameToId[transactionList[i][1]]=j;
            j++;
        }
    }
    // console.log(tempNames);
    // console.log(idToName);

    N=tempNames.length;
    let matrix=Array(N).fill().map(() => Array(N).fill(0));

    for(let i=0;i<transactionList.length;i++){
        matrix[nameToId[transactionList[i][1]]][nameToId[transactionList[i][0]]]=parseInt(transactionList[i][2]);
    }

    minCashFlow(matrix);
    handleSolDiv();
}