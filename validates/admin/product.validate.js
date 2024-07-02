module.exports.creat=async(req,res,next)=>{

    if(!req.body.title){
        req.flash('error','error')
        res.redirect('back');
        return;
    }
    next();
}