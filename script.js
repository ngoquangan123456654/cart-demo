
products = [
  {
    id:1,
    img:"https://down-vn.img.susercontent.com/file/eef4736af4732e00934920fba9e6c136",
    title: "Sản phẩm số 1",
    price: 150000,
    quantity:3,

  },
  {
    id:2,
    img:"https://down-vn.img.susercontent.com/file/eef4736af4732e00934920fba9e6c136",
    title: "Sản phẩm số 2",
    price: 100000,
    quantity: 1,

  },
  {
    id:3,
    img:"https://down-vn.img.susercontent.com/file/eef4736af4732e00934920fba9e6c136",
    title: "Sản phẩm số 3",
    price: 120000,
    quantity: 2,

  }
]


//Khai báo
const productListElement = $('.product-list')
const productTotalElement = $('.product-total-item')
const totalPriceElement = $('.product-total-price')

// Render và hiển thị dữ liệu
function renderUI(arr) {
  productListElement.empty()
  if (arr.length == 0) {
    console.log('0');
    productListElement.html(`<h4 class="product-item-none">Không có sản phẩm nào</h4>`)
    $('.product-footer').css('display','none')
  }

  arr.forEach(e => {
    productListElement.append(`
      <div class="product-item navbar">
        <div class="product-info navbar">
          <img class="product-img" src="${e.img}" alt="item" >
          <p class="product-title">${e.title}</p>
        </div>
        <div class="navbar">
          <div class="product-price">${e.price}</div>
          <div class="product-quantity">
            <button class="product-quantity-btn" onclick="decreseOne(${e.id})">
              <i class="fa-solid fa-minus"></i>
            </button>
            <input type="text" class="product-num" value="${e.quantity}" onchange="changeTotal(${e.id},event)">
            <button class="product-quantity-btn" onclick="increseOne(${e.id})">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>

          <div class="product-total">${e.price * e.quantity}</div>

          <button class="product-delete" onclick="removeItem(${e.id})">
            Xóa 
          </button>
        </div>

      </div>
    `)
  }); 
  
  productTotalElement.html(`
    <p class="product-total-item">Có ${updateTotalItem(products)} sản phẩm trong giỏ</p>
  `)

  updateTotalPrice(arr)
   
}



// Cập nhật toongr số lượng sản phẩm
function updateTotalItem(arr) {
  let total = 0;
  arr.forEach(e => {
    total += e.quantity
  })
  return total;
}


// Remove item trong cart
function removeItem(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      products.splice(i, 1);
    }
  }
  renderUI(products);
}

// Thay đổi số lượng sản phẩm
function changeTotal(id, e) {
  for (let i = 0; i < products.length; i++) {
      if (products[i].id == id) {
          products[i].quantity = Number(e.target.value);
      }
  }
  renderUI(products);
}

function increseOne(id) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id) {
      products[i].quantity += 1;
    }
  }
  renderUI(products);
}

function decreseOne(id) {
  
  for (let i = 0; i < products.length; i++) {
    if (products[i].id == id && products[i].quantity <= 1) {
      removeItem(id)
    }
    if (products[i].id == id) {
      products[i].quantity -= 1;
    }
  }
  renderUI(products);
}


// Cập nhật tổng tiền
function updateTotalPrice(arr) {
  // Tính tổng tiền cart
  let totalPrice = 0;

  arr.forEach(e => {
    totalPrice += e.quantity * e.price
  })

  totalPriceElement.text(convertMoney(totalPrice));
}



// Convert number to money VND
function convertMoney(num) {
  return num.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}


//Run hàm
renderUI(products)
