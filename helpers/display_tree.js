const createTree=(array,parentID="")=>{

    const tree=[];

    for(const item of array){

        if(item.parent_id==parentID){

            children=createTree(array,item.id)

            if(children.length>0){

                item.children=children
            }
            tree.push(item)
        }
            
    }
    
    return tree;
}


module.exports=(array, parentID)=>{
    let ans=createTree(array,parentID)
    return ans
}