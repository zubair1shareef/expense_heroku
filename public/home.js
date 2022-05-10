const expenseForm=document.getElementById('expense_from')

const expense_item_cont=document.getElementById('expense_item_cont')
var token= localStorage.getItem('token')
let count=1;
document.addEventListener('DOMContentLoaded',async()=>{
   
    document.getElementById('row-per-page').value=localStorage.getItem('noofrows')
    
    var tokenn= localStorage.getItem('token')
    if(!tokenn){
        window.location.replace('./login.html');
    }

    const expense_item_cont=document.getElementById('expense_item_cont')
    var body = document.getElementsByTagName("BODY")[0]; 
    const expense=document.getElementById('expense')
    const expense_from=document.getElementById('expense_from')
    var tokenn= localStorage.getItem('token')
    let premimum=false;

   await axios.get('http://localhost:3000/getLatestPaymentUpdate',{ headers: {"Authorization" : tokenn} }).then(premimumdata=>{
       console.log(premimumdata)
       if(premimumdata.data.length>0 ){
        if(premimumdata.data[0].status=='SUCCESSFUL'){
            const prebtn=document.getElementById('premium_btn')
            premimum=true
            premimumFun(premimum)
            prebtn.innerHTML='<h2 class="Premi_umuser"p>Premium USER</h2> <button class="leader_board" id="leader_board">leaderboard</button>'
            redirectToLeaderBoard()

        }
        else{
            premimumFun(false)
        }

       }
        
    })

   
   
   

    console.log('dom loadeed')
    const token= localStorage.getItem('token')
    
    var page = location.href.split("page=").slice(-1)[0] || 1;
    console.log(page)
    if(page.length>3){
        page=1
    }
    var rows=localStorage.getItem('noofrows')
    rows=rows || 10
    await axios.get(`http://localhost:3000/getexpense?page=${page}&rowno=${rows}`,{
        headers:{"Authorization":token}
    })
    .then(data=>{
        console.log(data.data)
        var totalpages=data.data.totalpages
        data=data.data.expense
        for(let i=0;i<data.length;i++){
            expense_item_cont.innerHTML=  expense_item_cont.innerHTML+` <div class="expense_item">
            <p>${count}</p>
            <p>${data[i].expenseamount}</p>
            <p>${data[i].description}</p>
            <p>${data[i].category}</p>
            <p>${data[i].createdAt}</p>
    
        </div>`
            count++;
        }
        console.log(totalpages)

        CreatePagination(totalpages)
       

    })
})

expenseForm.addEventListener('submit',async(e)=>{
    e.preventDefault();
    
    

    expenseamount=e.target.money_spend.value
    description= e.target.description.value
    category= e.target.category.value
    const token= localStorage.getItem('token')
    console.log(token)

   
    axios.post('http://localhost:3000/addexpense',{
        expenseamount ,
        description,
        category
    },{
        headers:{"Authorization":token}
    })
    .then((data)=>{
        console.log(data)
        e.target.money_spend.value=''
        e.target.description.value=''
        e.target.category.value=''
        console.log(data.data.expense)
        data=data.data.expense
console.log(data.description)
        expense_item_cont.innerHTML=  expense_item_cont.innerHTML+` <div class="expense_item">
            <p>${count}</p>
            <p>${data.expenseamount}</p>
            <p>${data.description}</p>
            <p>${data.category}</p>
            <p>${data.createdAt}</p>`
            count=count+1;
    })
    .catch((err)=>{
        console.log(err)
    })


})


let premimum=false;
 function premimumFun(premimum){
    const expense_item_cont=document.getElementById('expense_item_cont')
    var body = document.getElementsByTagName("BODY")[0]; 
    const expense=document.getElementById('expense')
    const expense_from=document.getElementById('expense_from')
 
   
    if(premimum){
        
        expense_from.style.backgroundColor = "#1f1e1f"
        expense_from.style.color = "white"
        expense.style.backgroundColor = "#1f1e1f"
        body.style.backgroundImage  = "url('https://d2gg9evh47fn9z.cloudfront.net/1600px_COLOURBOX24284715.jpg')"
        expense.style.color = "white"
        


    }
    else{
         
        expense_from.style.backgroundColor = "white"
        expense_from.style.color = "black"
        expense.style.backgroundColor = "white"
        body.style.backgroundImage  = "url('https://plexcollectionposters.com/images/2021/05/16/background-images-for-login-page3bc68c53b0db224b.jpg')"
        expense.style.color = "black"

    }
        
}


function buypremimum(){
    const premimumBtn=document.getElementById('premium_button')
    premimumBtn.addEventListener('click', async (e)=>{
        e.preventDefault();
        const response  = await axios.get('http://localhost:3000/premiummembership', { headers: {"Authorization" : token} });
        console.log(response);
        var options =
        {
         "key": response.data.key_id, // Enter the Key ID generated from the Dashboard
         "name": "Test Company",
         "order_id": response.data.order.id, // For one time payment
         "prefill": {
           "name": "Test User",
           "email": "test.user@example.com",
           "contact": "7003442036"
         },
         "theme": {
          "color": "#3399cc"
         },
         // This handler function will handle the success payment
         "handler": function (response) {
             console.log(response);
             axios.post('http://localhost:3000/updatetransactionstatus',{
                 order_id: options.order_id,
                 payment_id: response.razorpay_payment_id,
             }, { headers: {"Authorization" : token} }).then(() => {
                
                 alert('You are a Premium User Now')
                 premimumFun(true)
             }).catch(() => {
                 alert('Something went wrong. Try Again!!!')
             })
         },
      };


      const rzp1 = new Razorpay(options);
      rzp1.open();
      e.preventDefault();

      rzp1.on('payment.failed', function (response){
        alert("payment failed");
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
    });

    })
}
buypremimum()

function redirectToLeaderBoard(){
    document.getElementById('leader_board').addEventListener('click',()=>{
        console.log('fsf')
        window.location.replace('./leaderBoard.html');
    
    })
}

function logout(){
    document.getElementById('logout_button').addEventListener('click',()=>{
        console.log('fsf')
        localStorage.clear();
        window.location.replace('./login.html');
    
    })
   
}
logout()

function CreatePagination(totalPages){

    const paginationContainer=document.getElementById('pagination')

    for(let i=1;i<=totalPages;i++){
        const a=`<a href="./home.html?page=${i}" >${i}</a>`
        paginationContainer.innerHTML= paginationContainer.innerHTML+a
    }



}

document.getElementById('row-per-page').onchange=function(e){
    // console.log(typeof e.target.value)
    localStorage.setItem('noofrows' ,e.target.value)
}
