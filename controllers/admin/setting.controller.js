

let general=require('../../model/setting.model')

module.exports.setting=async(req,res)=>{

    const display=await general.findOne({});
    res.render('admin/pages/setting/general/index',{
        setting:display
    })
}

module.exports.Setting=async(req,res)=>{
    let a= new general(req.body)
    const display=await general.findOne({});
    if(!display){
    await a.save();
    }
    else{
        let check=await general.updateOne({_id:display.id},
            req.body
        )
    }
    req.flash('status','success')
    res.redirect('back')
}