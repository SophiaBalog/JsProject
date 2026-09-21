async function loadProducts() {
    const res = await fetch('/api/products');

    if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
}

let products = [];

const form = document.querySelector('#form');
const list = document.querySelector('#list');
const errorBox = document.querySelector('#error');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const title = formData.get('title');
    const price = Number(formData.get('price'));

    try{
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

        form.reset();
        await refresh();
    } catch (error) {
        errorBox.textContent = `ERROR: ${error.message}`;
    }

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