

const weatherForm = document.querySelector('form');
const search=document.querySelector('input[type=text]')
const error=document.querySelector('#error');
const result=document.querySelector('#result');
weatherForm.addEventListener('submit', (e) => {

    const location=search.value;
    error.textContent="Loading..";
    result.innerHTML="";
    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                error.textContent=data.error;    
            }
            else{
                error.textContent="";
                result.innerHTML=`Location : ${data.location}<br><br> Status :<br> ${data.forecast}`
            }
            

        })
    })
    e.preventDefault();
    
})