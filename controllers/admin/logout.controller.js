module.exports.index=(req,res)=>{
    res.clearCookie('token')
    res.redirect('/admin/auth/login')
}