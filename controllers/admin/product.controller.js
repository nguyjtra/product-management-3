
const product = require("../../model/product.model")
//import model (product.model.js) database
const paginationHelper=require('../../helpers/pagination.helper');




module.exports.index=async(req,res)=>{
    const find={
        deleted:false,
    };

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
.sort({
  
    position:"asc"
   

});

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
     });

}

//display
module.exports.addNew=async(req,res)=>{
    console.log(5);
    res.render('admin/pages/creat/index')
}

//process add new and using file upload
module.exports.creat=async(req,res)=>{
    console.log(6);

    // if(!req.body.title){
    //     req.flash('error','error')
    //     res.redirect('back');
    //     return;
    // }


    console.log(req.file);

    if(req.file){
        req.body.thumbnail=`/uploads/${req.file.filename}`
    }

req.body.price=parseInt(req.body.price)

req.body.discountPercentage=parseInt(req.body.discountPercentage)

req.body.stock=parseInt(req.body.stock);

if(req.body.position){
    req.body.position=parseInt(req.body.position);
}
else  {req.body.position=  (await product.countDocuments({}))+1;}


let newPorduct= new product(req.body);

await newPorduct.save()

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
    res.render('admin/pages/edit/index',{
        product:a
    })}
    catch(error){
        console.log(error);
    }
}


module.exports.editPatch=async (req,res)=>{
    console.log(8);
    const id=req.params.id;
    if(req.file){
        req.body.thumbnail=`/uploads/${req.file.filename}`
    }

    req.body.price=parseInt(req.body.price)

    req.body.discountPercentage=parseInt(req.body.discountPercentage)

    req.body.stock=parseInt(req.body.stock);

    if(req.body.position){
        req.body.position=parseInt(req.body.position);
    }
    else  req.body.position=  (await product.countDocuments({}))+1;


    await product.updateOne({
        _id:id
    },
       req.body 
    )
    res.redirect('/admin/products/')

}
