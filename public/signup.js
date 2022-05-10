const formm=document.getElementById('formCont')

document.addEventListener('DOMContentLoaded',()=>{
    token=localStorage.getItem('token')

    if(token){
        window.location.replace('./home.html');
    }
})



formm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    namee=e.target.name.value
    email=e.target.email.value
    password=e.target.password.value
    repassword=e.target.repassword.value
   
    if(password.localeCompare(repassword)){
        alert("Password doesnt match")
    }
    else if(namee=='' || email=='' ){
        alert("fill all the feilds")
    }
    
    else{
        axios.post('http://localhost:3000/signup',{
            name:namee,
            email: email,
            password:password
    
        }).then((res)=>{
            console.log(res)
            alert(res.data.msg)
        })

    }

   
})

