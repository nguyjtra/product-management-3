
const product = require("../../model/product.model")
//import model (product.model.js) database
const paginationHelper=require('../../helpers/pagination.helper');
const Account = require("../../model/account.model");
const ProductCategory=require('../../model/category.model')
var moment = require('moment'); 

module.exports.index=async(req,res)=>{
    const find={
        deleted:false,
    };
    let sort={
    }


    if(req.query.sortValue && req.query.sortKey){
        sort[req.query.sortKey]= req.query.sortValue
    }
    else{
        sort.position="asc"
    }

    const filterStatus=[
        {
            label:'ALL',
            value: ''
        },
        {
            label:'ACTIVE',
            value: 'active'
        },
        {
            label:'INACTIVE',
            value: 'inactive'
        },
    ];
        

//    find.status = "active";

    if(req.query.status){
        find.status=req.query.status
    }

    let keyword="";
    if(req.query.keyword){

        //using regex for finding
        const regex=new RegExp(req.query.keyword,'i');

        find.title=regex;
        keyword=req.query.keyword;
    }

// pagination
//  const pagination={
//     currentPage:1,
//     limitItems:4
//  };

//     if(req.query.page){
//         pagination.currentPage=parseInt(req.query.page)
//     }
//     pagination.skip=(pagination.currentPage-1)* pagination.limitItems;


//     const countProduct=await product.countDocuments(find);


//     pagination.totalPage =Math.ceil(countProduct/pagination.limitItems);
const pagination= await paginationHelper(req,find);


const products=await product
.find(find)
.limit(pagination.limitItems)
.skip(pagination.skip)
.sort(sort);


for(const item of products){
    if(item.createdBy){
    const account=await Account.findOne({
        _id:item.createdBy
    })
    
    item.createdByFullName=account.fullName
}
    else {
        item.createdByFullName="";
    }
    item.createdAtNewTime=moment(item.createdAt).format("MMM Do YY");
    
    if(item.UpdatedBy){
        const account= await Account.findOne({
            _id:item.UpdatedBy
        })
        item.updatedByFullName=account.fullName
    }
    else {
        item.updatedByFullName='';
    }
    item.updatedAtNewTime=moment(item.updatedAt).format("MMM Do YY");

}

    res.render('admin/pages/product/index',{
        product:products,
        keyword:keyword,
        filterStatus:filterStatus,
        pagination:pagination
    })
    
}



module.exports.changeStatus= async(req,res)=>{
    console.log(1);
    // console.log(req.params)
    const{status,id}=req.params
    // console.log(status);
    // console.log(id);

    await product.updateOne({
        _id:id
    },{
        status:status
    });

    req.flash('status', 'success');
    
    res.json({ 
        code: 200
    });
}


module.exports.multichange=async(req,res)=>{
    console.log(2);
    console.log(req.body);
    if(req.body.status=='delete'){


        await product.updateMany({
            _id:req.body.id
        },{
            deleted: true
        })
    }


    else{
        await product.updateMany({
            _id:req.body.id
        },{
            status:req.body.status
        });
    }

        res.json({ // convert js into json
            code: 200
        });
    

}

module.exports.deleteItem=async(req,res)=>{
    console.log(3);
     await product.updateOne({
        _id: req.body.id
     },{
        deleted: true
     })
    res.json({
        code:200
     });

}



module.exports.position=async(req,res)=>{
    try{
    console.log(4);
    console.log(req.params)
    let {value,id}=req.params;
    value=parseInt(value)
    await product.updateOne({
        _id: id
     },{
        position:value
     })
    res.json({
        code:200
     });}
    catch(error){
        res.redirect('/admin/products/')
    }

}

//display
module.exports.addNew=async(req,res)=>{
    console.log(5);
    const newCategories = await ProductCategory.find({
        deleted: false
      });


    res.render('admin/pages/creat/index',{
        categories: newCategories
    })
}



//process add new and using file upload
module.exports.creat=async(req,res)=>{
    console.log(6);

    // if(!req.body.title){
    //     req.flash('error','error')
    //     res.redirect('back');
    //     return;
    // }


req.body.price=parseInt(req.body.price)

req.body.discountPercentage=parseInt(req.body.discountPercentage)

req.body.stock=parseInt(req.body.stock);

if(req.body.position){
    req.body.position=parseInt(req.body.position);
}
else  {req.body.position=  (await product.countDocuments({}))+1;}

req.body.createdBy= res.locals.user.id

let newPorduct= new product(req.body);

await newPorduct.save()
console.log(req.body)
res.redirect('/admin/products/')


}

module.exports.edit= async (req,res)=>{
    
    try{
    console.log(7);
    const id=req.params.id
    const a= await product.findOne({
        _id:id,
        deleted:false
    });
    const newCategories = await ProductCategory.find({
        deleted: false
      });

    res.render('admin/pages/edit/index',{
        product:a,
        categories: newCategories
    })}
    catch(error){
        console.log(error);
    }
}


module.exports.editPatch=async (req,res)=>{
    console.log(8);
    const id=req.params.id;
    // if(req.file){
    //     req.body.thumbnail=`/uploads/${req.file.filename}`
    // }

    req.body.price=parseInt(req.body.price)

    req.body.discountPercentage=parseInt(req.body.discountPercentage)

    req.body.stock=parseInt(req.body.stock);

    if(req.body.position){
        req.body.position=parseInt(req.body.position);
    }
    else  {req.body.position=  (await product.countDocuments({}))+1;}

    req.body.UpdatedBy = res.locals.user.id
    await product.updateOne({
        _id:id
    },
       req.body 
    )
    res.redirect('/admin/products/')

}


module.exports.detail=async(req,res)=>{
    let id=req.params.id;
    let products=await product.findOne({
            _id:id,
            deleted:false
    })
    res.render('admin/pages/detail/index',{
        product:products
    })
}
