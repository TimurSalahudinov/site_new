var modal = document.getElementById('productModal');
modal.style.display = 'none';

function toggleModal(brandId) {
  var modalContent = document.getElementById('modalContent');
  var products = document.getElementById('products-' + brandId).innerHTML;

  modalContent.innerHTML = products;
  modal.style.display = 'flex';
}

function closeModal() {
  modal.style.display = 'none';
}

function toggleDescription(brandId) {
  var descriptions = document.querySelectorAll('.description-' + brandId);

  for (var i = 0; i < descriptions.length; i++) {
    if (
      descriptions[i].style.display === 'none' ||
      descriptions[i].style.display === ''
    ) {
      descriptions[i].style.display = 'block';
    } else {
      descriptions[i].style.display = 'none';
    }
  }
}

// Ваш текущий JavaScript (скрипт.js) ...

function addToCart(productName, price) {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cartItems.push({ name: productName, price: price });
  localStorage.setItem('cart', JSON.stringify(cartItems));
  alert('Товар ' + productName + ' в корзину!');
  updateCartItemCount();
  // Обновляем отображение корзины
  displayCart();
}
function updateCartItemCount() {
  var cartItemCount = JSON.parse(localStorage.getItem('cart'))?.length || 0;
  var cartItemCountSpan = document.getElementById('cart-item-count');
  cartItemCountSpan.textContent = cartItemCount.toString();
}
// Функция для открытия модального окна корзины
function openCartModal() {
  displayCartModal();
  var cartModal = document.getElementById('cartModal');
  cartModal.style.display = 'flex';
}

// Функция для закрытия модального окна корзины
function closeCartModal() {
  var cartModal = document.getElementById('cartModal');
  cartModal.style.display = 'none';
}

// Функция для отображения корзины в модальном окне
function displayCartModal() {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  var cartListModal = document.getElementById('cart-items-modal');
  var cartTotalModal = document.getElementById('cart-total-modal');

  // Очищаем текущий список корзины в модальном окне
  cartListModal.innerHTML = '';

  var total = 0;

  // Создаем новый список корзины в модальном окне
  cartItems.forEach(function (item, index) {
    var listItem = document.createElement('li');
    listItem.textContent = item.name + ' - $' + item.price;

    var removeButton = document.createElement('button');
    removeButton.textContent = 'Удалить';
    removeButton.addEventListener('click', function () {
      removeFromCart(index);
    });

    listItem.appendChild(removeButton);
    cartListModal.appendChild(listItem);

    // Обновляем общую стоимость в модальном окне
    total += parseFloat(item.price);
  });

  // Обновляем отображение общей стоимости в модальном окне
  cartTotalModal.textContent = total.toFixed(2);
}

// Функция для удаления товара из корзины
function removeFromCart(index) {
  var cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Удаляем товар по индексу
  cartItems.splice(index, 1);

  localStorage.setItem('cart', JSON.stringify(cartItems));

  // Обновляем отображение корзины в модальном окне
  displayCartModal();

  // Обновляем отображение количества товаров
  updateCartItemCount();
}
updateCartItemCount();
