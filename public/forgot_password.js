
  const url='http://54.160.177.138'

document.addEventListener("DOMContentLoaded",()=>{
console.log('DOMContentLoaded')

})

const form=document.getElementById('user_email_Form')

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(e.target.email.value)
    var email=e.target.email.value

    axios.post(`${url}:3000/forgotpassword`,{email}).then((data)=>{
        console.log(data.data.message)
        alert(data.data.message)
    })
    .catch(err=>{
        
        alert(err.response.data)
    }
        )

})

