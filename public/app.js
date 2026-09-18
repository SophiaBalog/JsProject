async function loadProducts() {
    const res = await fetch('/api/products');

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
}

let products = [];

const addBtn = document.querySelector('#add-btn');
const titleValue = document.querySelector('#title');
const priceValue = document.querySelector('#price');
const list = document.querySelector('#list');
const errorBox = document.querySelector('#error');

addBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const title = titleValue.value;
    const price =Number( priceValue.value);

    const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title,
            price
        })
    });
    
    if (!res.ok) {
        const error = await res.json();
        errorBox.textContent = error.error;
        return;
    }

    const product = await res.json();

    products.push(product);

    render(products);

    titleValue.value = '';
    priceValue.value = '';
});

function render(products) {
    list.innerHTML = '';

    for (let product of products) {
        const li = document.createElement('li');

        li.textContent = `${product.title} -- ${product.price} uah`;

        list.append(li);
    }
}

async function refresh() {
    try {
        errorBox.textContent = '';

        products = await loadProducts();

        render(products);

    } catch (error) {
        errorBox.textContent = `Error: ${error.message}`;
    }
}

refresh();