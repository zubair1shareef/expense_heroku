document.addEventListener("DOMContentLoaded",async()=>{
    let count=1;

    const token= localStorage.getItem('token')
    await axios.get(`http://localhost:3000/getexpense`,{
        headers:{"Authorization":token}
    })
    .then(data=>{

        // const usernameCont=document.getElementById('username_show')
        // usernameCont.innerHTML=`<b class=>${data.data.name}</b>`
        const expense_header=document.getElementById('expense_item_cont')

        console.log(data)
        data=data.data.expense
        for(let i=0;i<data.length;i++){
            expense_header.innerHTML=  expense_header.innerHTML+` <div class="expense_header">
            <p>${count}</p>
            <p>${data[i].expenseamount}</p>
            <p>${data[i].description}</p>
            <p>${data[i].category}</p>
            <p>${data[i].createdAt}</p>
    
        </div>`
            count++;
        }
       

    })
    .catch(err=>{
        console.error(err);
    })


    axios.get('http://localhost:3000/downloadlist',{
        headers:{"Authorization":token}
    }).then(downloaddata=>{

        console.log(downloaddata.data)
        const data=downloaddata.data
        const downloadlist_form=document.getElementById('downloadlist_form')
        for(let i=0;i<data.length;i++){
            downloadlist_form.innerHTML=downloadlist_form.innerHTML+` <div class="expense_header" >
            <p>${data[i].createdAt}</p>
            <p><a href=${data[i].url}>click here to download</a></p>
            
         </div>`

        }
    })
})

document.getElementById('download_btn').addEventListener('click',(e)=>{
    e.preventDefault();
    console.log('fdsf')
    const token= localStorage.getItem('token')
    axios.get('http://localhost:3000/downloadexpense',{
        headers:{"Authorization":token}
    }).then(response=>{
        console.log(response)
        if(response.status===200){
            var a=document.createElement('a')
            a.href=response.data.fileURL;
            a.download='myexpense.csv'
            a.click();
        }
        else{
            throw new Error(response)
        }


    })
    .catch(err=>{
        console.log(err);
    })
})
