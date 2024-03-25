let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let total = document.getElementById('total')
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let category = document.getElementById('category');
let create = document.getElementById('create');

//to make update
let mood = 'create';
let temp; // to access the i in update



//function to get total
function getTotal()
{
    if(price.value != '')
    {
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value;
        total.innerHTML = result;
    }
    else
    total.innerHTML = '';
}

//function to create a product (you need to save data in array because it's allow you to read,update and delete)
let arrProduct;
if(localStorage.products != null)
{
    arrProduct = JSON.parse(localStorage.products)//ارجعها لاصلها ك array
}else{
    arrProduct = [];
}


create.onclick = function(){
    let dataObj = {
        title : title.value.toLowerCase(), //lowercase , when writting uppercase convert it to lowercase
        price : price.value,
        taxes : taxes.value,
        ads : ads.value,
        discount : discount.value,
        total : total.innerHTML,
        count : count.value,
        category : category.value.toLowerCase(),
    }
    //clean data : don't add data not available
    if(title.value != '')
    {
    //to make update using mood variable, when button create that create product, but the button update that update the product
if(mood == 'create')
{
    //count and create one product
    if(dataObj.count > 1)
    {
        for(let i = 0 ; i<dataObj.count ; i++)
        {
            arrProduct.push(dataObj);

        }
    }else{
        arrProduct.push(dataObj);

    }
}else{
    arrProduct[temp] = dataObj;
    //after update data, return the create and count
    mood = 'create';
    create.style.display = 'block';
    create.innerHTML = 'Create';

}
clearData();

    //save data in local storage
    localStorage.setItem('products' , JSON.stringify(arrProduct));
    showData();
}
}
//function to clear data
function clearData(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
 

}
//read data, put in table
function showData()
{
    let table = '';
    for(let i = 0 ; i < arrProduct.length ; i++)
    {
    
        table += `
        <tr>
            <td>${i+1}</td> // the id for product that begin one
            <td>${arrProduct[i].title}</td>
            <td>${arrProduct[i].price}</td>
            <td>${arrProduct[i].taxes}</td>
            <td>${arrProduct[i].ads}</td>
            <td>${arrProduct[i].discount}</td>
            <td>${arrProduct[i].total}</td>
            <td>${arrProduct[i].category}</td>
            <td><button onclick = "updateData(${i})">Update</button></td>
            <td><button onclick = "deleteProduct(${i})">Delete</button></td>
        </tr>
        
        `

    }
    document.getElementById('tbody').innerHTML = table;
    //delete all
    let btnDeleteAll = document.getElementById('deleteAll');
    if(arrProduct.length > 0)
    {
        btnDeleteAll.innerHTML = `
        <button onclick = "deleteAll()">Delete All(${arrProduct.length})</button>
        `
    }else{
        btnDeleteAll.innerHTML = '';

    }
}

showData();

//delete product
function deleteProduct(i)//put index to know what the product to delete
{
    arrProduct.splice(i,1) // delete i to one element
    //delete form array and localstorage
    localStorage.products = JSON.stringify(arrProduct)
    //to show the delete , must be call showData 
    showData();


}

//function to delete all
function deleteAll()
{
    localStorage.clear();

    arrProduct.splice(0)
    showData();

}


//update

function updateData(i){
    title.value = arrProduct[i].title;
    price.value = arrProduct[i].price;
    taxes.value = arrProduct[i].taxes;
    ads.value = arrProduct[i].ads;
    discount.value = arrProduct[i].discount;
    getTotal();
    count.style.display = 'none';
    category.value = arrProduct[i].category;
    create.innerHTML = 'Update';
    mood = 'Update';
    temp = i ;
    scroll({
        top:0,
        behavior:'smooth',
    })

    
}
//search
let searchMood = 'title';

function getSearch(id) // the id it's searchByTitle or searchByCategory , from html
{
    let search = document.getElementById('search');
    if(id == 'searchByTitle')
    {
        searchMood = 'title';
        search.placeholder = 'Search By Title';
    }
    else{
        searchMood = 'category';
        search.placeholder = 'Search By Category';

    }
    search.focus();
    search.value = '';
    showData();

}

function searchData(value)
{
    let table = '';
    if(searchMood == 'title')
    {
        for(let i = 0 ; i < arrProduct.length ; i++)
        {
            if(arrProduct[i].title.includes(value.toLowerCase())) //when searching in uppercase that convert to lowercase
            {
                table += `
        <tr>
            <td>${i}</td>
            <td>${arrProduct[i].title}</td>
            <td>${arrProduct[i].price}</td>
            <td>${arrProduct[i].taxes}</td>
            <td>${arrProduct[i].ads}</td>
            <td>${arrProduct[i].discount}</td>
            <td>${arrProduct[i].total}</td>
            <td>${arrProduct[i].category}</td>
            <td><button onclick = "updateData(${i})">Update</button></td>
            <td><button onclick = "deleteProduct(${i})">Delete</button></td>
        </tr>
        
        `
            }
        }

    }
    
    else{
        for(let i = 0 ; i < arrProduct.length ; i++)
        {
            if(arrProduct[i].category.includes(value.toLowerCase())) 
            {
                table += `
        <tr>
            <td>${i}</td>
            <td>${arrProduct[i].title}</td>
            <td>${arrProduct[i].price}</td>
            <td>${arrProduct[i].taxes}</td>
            <td>${arrProduct[i].ads}</td>
            <td>${arrProduct[i].discount}</td>
            <td>${arrProduct[i].total}</td>
            <td>${arrProduct[i].category}</td>
            <td><button onclick = "updateData(${i})">Update</button></td>
            <td><button onclick = "deleteProduct(${i})">Delete</button></td>
        </tr>
        
        `
            }
        }

    }
    document.getElementById('tbody').innerHTML = table;

}
//clean data : don't add data not available