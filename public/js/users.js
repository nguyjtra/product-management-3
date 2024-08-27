const ListBtnAdd=document.querySelectorAll('[btn-add-friend]')
if(ListBtnAdd.length>0){
    ListBtnAdd.forEach((button)=>{
        button.addEventListener('click',()=>{
            button.closest('.box-user').classList.add('add');

            const userB=button.getAttribute('btn-add-friend')

            socket.emit('CLIENT_ADD_FRIEND',userB)
        })
    })
}

const ListBtnCancel=document.querySelectorAll('[btn-cancel-friend]')
if(ListBtnCancel.length>0){
    ListBtnCancel.forEach((button)=>{
        button.addEventListener('click',()=>{
            button.closest('.box-user').classList.remove('add');

            const userB=button.getAttribute('btn-cancel-friend')

            socket.emit('CLIENT_CANCEL_FRIEND',userB)
        })
    })
}


const ListBtnRefuse=document.querySelectorAll('[btn-refuse-friend]')
if(ListBtnRefuse.length>0){
  ListBtnRefuse.forEach((button)=>{
        button.addEventListener('click',()=>{
            button.closest('.box-user').classList.add('refuse');

            const userB=button.getAttribute('btn-refuse-friend')

            socket.emit('CLIENT_REFUSE_FRIEND',userB)
        })
    })
}

const ListBtnAccept=document.querySelectorAll('[btn-accept-friend]')
if(ListBtnAccept.length>0){
    ListBtnAccept.forEach((button)=>{
        button.addEventListener('click',()=>{
            button.closest('.box-user').classList.add('accepted');

            const userB=button.getAttribute('btn-accept-friend')

            socket.emit('CLIENT_ACCEPT_FRIEND',userB)
        })
    })
}


socket.on('SEVER_RETURN_LENGTH_ACCEPT_LENGTH',(data)=>{

    const badge=document.querySelector(`[badge-users-accept="${data.userId}"]`)
    if(badge){
        badge.innerHTML=data.length
    }
})

socket.on('SEVER_RETURN_LENGTH_INFO_ACCEPT_LENGTH',(data)=>{
    const div=document.createElement('div');
    div.classList.add('col-6')
    div.setAttribute("user-id", data.infoA._id);
    div.innerHTML=` <div class="box-user">
    <div class="inner-avatar">
      <img src="https://robohash.org/hicveldicta.png" alt="${data.infoA.fullName}">
    </div>
    <div class="inner-info">
      <div class="inner-name">${data.infoA.fullName}</div>
      <div class="inner-buttons">
        <button 
          class="btn btn-sm btn-primary mr-1" 
          btn-accept-friend="${data.infoA._id}"
        >
          Accept
        </button>
        <button 
          class="btn btn-sm btn-secondary mr-1" 
          btn-refuse-friend="${data.infoA._id}"
        >
          Delete
        </button>
        <button 
          class="btn btn-sm btn-secondary mr-1" 
          btn-deleted-friend="" disabled=""
        >
          Deleted
        </button>
        <button 
          class="btn btn-sm btn-primary mr-1" 
          btn-accepted-friend="" disabled=""
        >
          Accepted
        </button>
      </div>
    </div>
  </div>
`;

let dataB=document.querySelector(`[data-users-accept="${data.userIdB}"]`)

if(dataB){


    dataB.appendChild(div)
    let refuse=div.querySelector('[btn-refuse-friend]')
    refuse.addEventListener('click',()=>{
    refuse.closest('.box-user').classList.add('refuse')
    const userIdA=refuse.getAttribute('btn-refuse-friend')
    socket.emit('CLIENT_REFUSE_FRIEND',userIdB)
    })


    let button=div.querySelector('[btn-accept-friend]')
    button.addEventListener('click',()=>{
      button.closest('.box-user').classList.add('accepted');
      const userA=button.getAttribute('btn-accept-friend')
      socket.emit('CLIENT_ACCEPT_FRIEND',userA)
  })


}


})

socket.on('SEVER_RETURN_ID_CANCEL_FRIEND',(data)=>{
  let dataB=document.querySelector(`[data-users-accept="${data.userIdB}"]`)
  if(dataB){
    const userA=dataB.querySelector(`[user-id="${data.userIdA}"]`)
    if(userA){
      dataB.removeChild(userA)
    }
  }
})

socket.on('SEVER_RETURN_ID_INFO_ACCEPT_FRIEND',(data)=>{
  let dataB=document.querySelector(`[data-users-not-friend="${data.userIdB}"]`)
  if(dataB){
    const userA=dataB.querySelector(`[user-id="${data.userIdA}"]`)
    if(userA){
      dataB.removeChild(userA)
    }
  }
})


