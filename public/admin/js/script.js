

//button status
const listButtonStatus=document.querySelectorAll('[button-status]')

// console.log(listButtonStatus);



if(listButtonStatus.length>0){

    let url=new URL(window.location.href)

    //running loop
    listButtonStatus.forEach(button=>{
        // catch event

        button.addEventListener('click',()=>{
            // take attribute

            const status=button.getAttribute('button-status')
            if(status){

            // set new value after ? status=value(status)

            url.searchParams.set('status',status)}
            else {
                url.searchParams.delete('status')
            }
            // reload pag
            window.location.href=url.href
            
        }) 
    });
    const statusCurrent=url.searchParams.get('status') ||  "";
    const buttonCurrent=document.querySelector(`[button-status='${statusCurrent}']`)
    console.log(statusCurrent)
    buttonCurrent.classList.add('active')
}

const formSearch=document.querySelector('[form-search]')
console.log(formSearch)


// prevent dafault  form
if(formSearch){
    //form event
    let url=new URL(window.location.href)

    formSearch.addEventListener('submit',(event)=>{
            event.preventDefault();
            let keyword=event.target.elements.keyword.value
            console.log(keyword)

            if(keyword){
                console.log(1)
                // set new value after ? status=value(status)
                url.searchParams.set('keyword',keyword)
            }
            else {
                    url.searchParams.delete('keyword')
                }       // reload page

            window.location.href=url.href;
                
    })
}

const pagination=document.querySelectorAll('[button-pagination]')

let url=new URL(window.location.href)
if(pagination.length>0){
    pagination.forEach((button)=>{
        button.addEventListener('click',()=>{
            const page=button.getAttribute('button-pagination')
            if(page){
                // console.log(1)
                // set new value after ? status=value(status)
                url.searchParams.set('page',page)
            }
            else {
                    url.searchParams.delete('page')
                }       // reload page
            console.log(url);
            window.location.href=url.href;
        })
    })
}


const changeStatus =document.querySelectorAll('[button-change-status]')
if(changeStatus.length>0){
    changeStatus.forEach((button)=>{
        button.addEventListener('click',()=>{

            // console.log(button.getAttribute('link'));

            fetch(button.getAttribute('link'),
            {  // api==route
                method:'PATCH',

                headers:{
                    "content-Type":"application/json",
                }
            })    //call api   //FE call api BE recieved api form FE
                .then(res=> res.json())
                
                .then(data=>{
                    // FE will recieve code form BE (res.json) via data 
                    console.log(data);
                    if(data.code==200){
                        window.location.reload();
                    }
                })
            
        })
    })
}



let all= document.querySelector("[name='checkAll']")

let checkItem=document.querySelectorAll("[name='checkItem']")

if(all && checkItem){
all.addEventListener('click',()=>{

        checkItem.forEach((value)=>{
            value.checked=all.checked;
        })
    
})

checkItem.forEach((button)=>{
    button.addEventListener('click',()=>{
        let checked=document.querySelectorAll("[name='checkItem']:checked")
        if(checked.length==checkItem.length){
            all.checked=true;
        }
        else if(checked.length<checkItem.length) {

            all.checked=false;
        }

    })
})
}




let boxAction=document.querySelector('[box-action]')
if(boxAction){
    let button=boxAction.querySelector("[type='button']")
    button.addEventListener('click',()=>{
        let select=boxAction.querySelector("[class='custom-select']")
        let checked=document.querySelectorAll("[name='checkItem']:checked")
        let a=[];
        checked.forEach((check)=>{
            a.push(check.value);
        })
        if(select.value!="" && a.length>0){
            const data={
                id:a,
                status:select.value
            }
            console.log(data);

            fetch("/admin/products/multichange",{
                method:'PATCH',
                headers:{
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(data),// convert into json and sent data to BE

            })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data) 
                    if(data.code==200){
                        window.location.reload();}
                    // recieve message form BE
                })

            
        }
        else{
            alert('error')
        }
    })
}



let buttonDelete  = document.querySelectorAll("[button-delete]")
if(buttonDelete.length>0){
    buttonDelete.forEach((button)=>{
        button.addEventListener('click',()=>{
            let id=button.getAttribute('button-delete');
            const data={id};
            console.log(data);
            fetch(`/admin/products/delete`,{
                method:'PATCH',
                headers:{
                    "Content-Type" :"application/json"
                },
                body:JSON.stringify(data),// convert into json and sent data to BE

            })
                .then(res=>res.json())
                .then(data=>{
                if(data.code==200){
                    window.location.reload();}
                // recieve message form BE
                })

        })
    })
}




//position

let posList=document.querySelectorAll("[name='position']")
console.log(posList)
if(posList.length>0){
    posList.forEach((pos)=>{
    console.log(pos)
    pos.addEventListener('change',()=>{

        let value=pos.getAttribute('value')

        let id=pos.getAttribute('id')
       console.log(value+" "+id);
        fetch(`/admin/products/position/${pos.value}/${pos.id}`,{
            method:'PATCH'
        })
            .then (res=>res.json())
            .then(data=>{
                if(data.code==200){
                    window.location.reload();
                }
            })

    })
})
}




let reverse=document.querySelectorAll('[reverse]')
if(reverse.length>0){
    reverse.forEach((button)=>{
        button.addEventListener('click',()=>{
            let id=button.getAttribute('reverse')
            fetch(`/admin/deleted/reverse/${id}`,{
                method:"PATCH"
            })
                .then(res=>res.json())
                .then(data=>{
                    if(data.code==200){
                        window.location.reload();
                    }
                })
                
                
        })
    })
}

let deleteForever =document.querySelectorAll('[deleteForever]')
if(deleteForever.length>0){
    deleteForever.forEach((button)=>{
        button.addEventListener('click',()=>{
            let id=button.getAttribute('deleteForever');
            fetch(`/admin/deleted/deleteForever/${id}`,{
                method:"PATCH"
            })
                .then(res=>res.json())
                .then(data=>{
                    if(data.code==200){
                        window.location.reload();
                    }
                })
        })
    })
}



let groupReverse=document.querySelector('[groupReverse]')
if(groupReverse){
groupReverse.addEventListener('click',()=>{
    let chooseReverse=document.querySelectorAll('[value_reverse]:checked')
    let a=[];
    chooseReverse.forEach((choose)=>{
        let id=choose.getAttribute('value_reverse')
        a.push(id);
    })
    let data={a};
    fetch('/admin/deleted/reverseMany',{
        method:'PATCH',
        headers:{
            "Content-Type" :"application/json"
        },
        body:JSON.stringify(data),// convert into json and sent data to BE

    })
        .then(res=>res.json())
        .then(data=>{
        if(data.code==200){
            window.location.reload();}
        // recieve message form BE
        })
})

}


const uploadImage= document.querySelector('[upload-image]')
if(uploadImage){
    const input=document.querySelector('[upload-image-input]')
    const preview=document.querySelector('[upload-image-preview]')
    input.addEventListener('change',()=>{
     
        const file=input.files[0];
      
        if(file){
            preview.src=URL.createObjectURL(file)
        }

        
    })
}






let DeleteCategory=document.querySelectorAll("[button-delete-Category]")
if(DeleteCategory.length>0){
    DeleteCategory.forEach(button=>{
        button.addEventListener('click',()=>{
            let id=button.getAttribute('button-delete-Category')
            fetch(`/admin/products-category/deleteForever/${id}`,{
                method:"PATCH"
            })
                .then(res=>res.json())
                .then(data=>{
                    if(data.code==200){
                        window.location.reload();
                    }
                })
        })
    })
}



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




const tablePermissions = document.querySelector("[table-permissions]");
if(tablePermissions) {
  const buttonSubmit = document.querySelector("[button-submit]");
  buttonSubmit.addEventListener("click", () => {
    const roles = [];

    const listElementRoleId = tablePermissions.querySelectorAll("[role-id]");
    for (const element of listElementRoleId) {
      const roleId = element.getAttribute("role-id");
      const role = {
        id: roleId,
        permissions: []
      };

      const listInputChecked = tablePermissions.querySelectorAll(`input[data-id="${roleId}"]:checked`);

      listInputChecked.forEach(input => {
        const dataName = input.getAttribute("data-name");
        role.permissions.push(dataName);
      });

      roles.push(role);
    }

    const path = buttonSubmit.getAttribute("button-submit");

    fetch(path, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(roles)
    })
      .then(res => res.json())
      .then(data => {
        if(data.code == 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: data.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
  });
}

let sortSelect=document.querySelector('[sort-select]')
if(sortSelect){
    let url = new URL(window.location.href);
    sortSelect.addEventListener('change',()=>{
        let[sortKey,sortValue]=sortSelect.value.split('-');
        if(sortKey && sortValue){
        url.searchParams.set("sortKey",sortKey)
        url.searchParams.set('sortValue',sortValue)
        window.location.href=url.href
        }
    })
}

if(sortSelect){
    let url= new URL(window.location.href);
    let a=url.searchParams.get('sortKey')
    let b=url.searchParams.get('sortValue')
    let ans=sortSelect.querySelector(`[value="${a}-${b}"]`)
    ans.setAttribute('selected',true)
}

let sortClear=document.querySelector('[sort-clear]')
if(sortClear){
    let url=new URL(window.location.href)
    sortClear.addEventListener('click',()=>{
        url.searchParams.delete("sortKey")
        url.searchParams.delete('sortValue');
        window.location.href=url
    })
}



