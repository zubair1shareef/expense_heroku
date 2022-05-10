
    


    const expenseForm=document.getElementById('expense_from')

const expense_item_cont=document.getElementById('expense_item_cont')
const token= localStorage.getItem('token')
let count=1;
document.addEventListener('DOMContentLoaded',async()=>{
    let paramString = window.location.href;
    console.log(paramString.split('userid=')[1])
    const id=paramString.split('userid=')[1]

    const expense_item_cont=document.getElementById('expense_item_cont')
    var body = document.getElementsByTagName("BODY")[0]; 
    const expense=document.getElementById('expense')
    const expense_from=document.getElementById('expense_from')
    var tokenn= localStorage.getItem('token')
    let premimum=false;

   
   
   

    console.log('dom loadeed')
    const token= localStorage.getItem('token')
    await axios.get(`http://localhost:3000/getexpensebyid/${id}`,{
        headers:{"Authorization":token}
    })
    .then(data=>{

        const usernameCont=document.getElementById('username_show')
        usernameCont.innerHTML=`<b class=>${data.data.name}</b>`

        console.log(data)
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
       

    })
})

