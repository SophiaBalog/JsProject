async function loadProducts(){
    const res = await fetch('/api/products')
  
    if (!res.ok){
        throw new Error(`HTTP ${res.status}`);
    }
    return await res.json();

}

const list = document.querySelector('#list');
function render(products){
    list.innerHTML = '';

    for (let product of products){
        const li = document.createElement('li');

        li.textContent = `${product.title} -- ${product.price} uah`;
        list.append(li);
    }
}

const errorBox = document.querySelector("#error");

async function refresh(){
    try {
        errorBox.textContent = '';
        const products = await loadProducts();
        render(products)
    } catch (error) {
        errorBox.textContent = `Error : ${error.message}`
    }
}

refresh()