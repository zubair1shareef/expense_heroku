document.addEventListener('DOMContentLoaded',()=>{
    user_cont=  document.getElementById('use_cont')
    axios.get('http://localhost:3000/getallusers').then(alluser=>{

        let paramString = window.location.href;
        console.log(paramString.split('/'))
        console.log(alluser.data)
        var data=alluser.data
        data.sort((a, b) => parseFloat(b.totalexpense) - parseFloat(a.totalexpense));
        for(let i=0;i<data.length;i++){
            user_cont.innerHTML=user_cont.innerHTML+`<div class="users" id="users">
        <p>${i+1}</p>
        <p><a href='./user.html?userid=${data[i].id}'>${data[i].name}</a></p>
        <p>${data[i].totalexpense}</p>

    </div>`

        }
        
    })

})