

let alert=document.querySelector('[alert]')
console.log(alert);
if(alert){
let timer=alert.getAttribute('alert') ||500

timer=parseInt(timer);
console.log(timer)
if(alert){
    setTimeout(() => {
        alert.classList.add('hidden');
    },timer);
}
}


let changee=document.querySelectorAll("[name='quantity']")

if(changee.length>=0){
    changee.forEach(item=>{


        item.addEventListener('change',()=>{

            const productid=item.getAttribute('product-id');

            const quantity=parseInt(item.value)

            console.log(quantity)

            if(productid && quantity>0){

                window.location.href=`/cart/update/${productid}/${quantity}`
            }
        })
    })
}