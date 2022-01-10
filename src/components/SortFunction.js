function sort(products, sortOrder){
    if(sortOrder == null){
        return products;
    }else if(sortOrder === "true"){
        return products.sort((a, b) => a.price - b.price);
    }else if(sortOrder === "false"){
        return products.sort((a, b) => b.price - a.price);
    }
    return products;
}

export default sort;