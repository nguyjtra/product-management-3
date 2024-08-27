
// emojiPicker
import * as Popper from 'https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js';


// CLIENT_SEND_MESSAGE
//typing
var timeOut;
const input=document.querySelector(".chat .inner-form input[name='content']")
if(input){
    input.addEventListener("keyup",()=>{
       socket.emit('typing','show')

        clearTimeout(timeOut)

       timeOut=setTimeout(()=>{
        socket.emit('typing','hidden')
       },3000)
    })
}

const elementListTyping = document.querySelector(".chat .inner-list-typing");
socket.on("returnTyping", (data) => {
  if(data.type == "show") {
    const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);

    if(!existTyping) {
      const boxTyping = document.createElement("div");
      boxTyping.classList.add("box-typing");
      boxTyping.setAttribute("user-id", data.userId);
      boxTyping.innerHTML = `
        <div class="inner-name">${data.fullName}</div>
        <div class="inner-dots"><span></span><span></span><span></span></div>
      `;
      elementListTyping.appendChild(boxTyping);
    }
  } 
  // data.Type==hidden
  else{
    const existTyping = elementListTyping.querySelector(`[user-id="${data.userId}"]`);
    if(existTyping) {
        elementListTyping.removeChild(existTyping);
      }
  }
})





const form=document.querySelector('.inner-form')

if(form){
    const upload = new FileUploadWithPreview.FileUploadWithPreview('my-unique-id',{
        multiple: true,
        maxFileCount: 6
      });
    form.addEventListener('submit',(event)=>{
        event.preventDefault();

       var img=upload.cachedFileArray
        const content=event.target.content.value || "";
        if(content || img.length>0 ){
        socket.emit("CLIENT_SEND_MESSAGE",{
            content:content,
            imgs:img

        })
        event.target.content.value='';
        upload.resetPreviewPanel(); // clear all selected images


    }
    })
}


//sever_return_message
socket.on("sever_return_message",(data)=>{
    const myId=document.querySelector('[my-id]')
    let id=myId.getAttribute('my-id')
    let html="";
    let htmlImg="";
    let htmlContent="";
    const div=document.createElement('div')
    if(id==data.userId){
      div.classList.add("inner-outgoing");
    }
    else {
        div.classList.add("inner-incoming");
        html=`<div class='inner-name'>${data.fullName}</div>`
    }
    if(data.content){
      htmlContent=`<div class='inner-content'>${data.content}</div>`}
    
    if(data.img.length>0){
      htmlImg+=`
      <div class="inner-images">
      `;
      for(const image of data.img){
        htmlImg+=`
        <img src="${image}">
        `
      }
      htmlImg+=`
      </div>
      `
    }
    div.innerHTML= `
        ${html}
        ${htmlContent}
        ${htmlImg}
    `;
    const body=document.querySelector('.chat .inner-body')

    // elementListTyping display after div
    body.insertBefore(div,elementListTyping)

    // keo xuong duoi
    //Scroll Chat To Bottom

    body.scrollTop=body.scrollHeight


    new Viewer(div);
    
})

// End Scroll Chat To Bottom

const bodyChat=document.querySelector('.chat .inner-body');
if(bodyChat){
    bodyChat.scrollTop=bodyChat.scrollHeight

}

//show chat icon

const emojiPicker = document.querySelector('emoji-picker');
if(emojiPicker) {
  const inputChat = document.querySelector(".chat .inner-form input[name='content']");

  emojiPicker.addEventListener('emoji-click', (event) => {
    const icon = event.detail.unicode;
    inputChat.value = inputChat.value + icon;
  });
}
// End Show Icon Chat

// Show Popup Icon
const buttonIcon = document.querySelector("[button-icon]");
if(buttonIcon) {
  const tooltip = document.querySelector('.tooltip');
  Popper.createPopper(buttonIcon, tooltip);

  buttonIcon.addEventListener("click", () => {
    tooltip.classList.toggle('shown');
  });
}
// End Show Popup Icon


if(bodyChat) {
  new Viewer(bodyChat);
}


