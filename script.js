const products = {
  1: { name: "Акваріум", price: 15000, stock: 5 },
  2: { name: "Трансформер", price: 8000, stock: 3 },
};

const cart = {};

function addToCart(productId) {
  const product = products[productId];

  if (product.stock <= 0) {
    alert("Товар закінчився!");
    return;
  }

  // Зменшити залишок
  product.stock--;

  // Оновити візуально
  document.querySelector(`.product[data-id="${productId}"] .stock`).innerText =
    product.stock;

  // Додати в корзину
  if (!cart[productId]) {
    cart[productId] = { ...product, quantity: 1 };
  } else {
    cart[productId].quantity++;
  }

  updateCartDisplay();
}

function updateCartDisplay() {
  const cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";

  let total = 0;

  for (let id in cart) {
    const item = cart[id];
    const sum = item.quantity * item.price;
    total += sum;

    const itemEl = document.createElement("p");
    itemEl.textContent = `${item.name}: ${item.quantity} шт. × ${item.price} грн = ${sum} грн`;
    cartDiv.appendChild(itemEl);
  }

  if (total === 0) {
    cartDiv.innerHTML = "<p>Корзина порожня.</p>";
  } else {
    const totalEl = document.createElement("p");
    totalEl.innerHTML = `<strong>Загальна сума: ${total} грн</strong>`;
    cartDiv.appendChild(totalEl);
  }
}
