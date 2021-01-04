// Modals
const modalAdd = document.getElementById('modal-add')
const btnAdd = document.getElementById('add-new-item')
const btnCloseModalAdd = document.getElementsByClassName('close-btn')[0]

const modalEdit = document.getElementById('modal-edit')
const btnCloseModalEdit = document.getElementsByClassName('close-btn')[1]

btnAdd.onclick = () => {
  modalAdd.style.display = 'block'
}

btnCloseModalAdd.onclick = () => {
  modalAdd.style.display = 'none'
}

btnCloseModalEdit.onclick = () => {
  modalEdit.style.display = 'none'
}

window.onclick = (e) => {
  if (e.target === modalAdd || e.target === modalEdit) {
    modalAdd.style.display = 'none'
    modalEdit.style.display = 'none'
  }
}

// DOM
const items = document.getElementById('items')
const addToList = document.querySelector('.add-to-list')

// Event listeners
addToList.addEventListener('click', addItem)
items.addEventListener('click', deleteItem)
items.addEventListener('click', editItem)

// Functions
function addItem() {
  const addItem = document.querySelector('.add-item')
  const addPrice = document.querySelector('.add-price')
  const addQtde = document.querySelector('.add-qtde')

  const newItem = document.createElement('div')
  newItem.classList.add('item')

  // New item contents
  const newItemDesc = document.createElement('span')
  newItemDesc.classList.add('item-description')
  newItemDesc.innerHTML = `<i class='fas fa-trash-alt'></i> ${addItem.value}`
  
  const newItemQtde = document.createElement('span')
  const isQtdeNumber = !isNaN(parseInt(addQtde.value))
  let qtde = parseInt(addQtde.value)
  newItemQtde.classList.add('item-qtde')
  newItemQtde.innerText = isQtdeNumber && qtde > 0 ? '\xa0' + qtde + 'x' : ''

  const newItemPrice = document.createElement('span')
  newItemPrice.classList.add('item-price')

  let price = addPrice.value
  if (price.includes(',')) {
    price = price.replace(',', '.')
  }
  price = parseFloat(price)
  if (isQtdeNumber) {
    price = parseFloat(price * qtde).toFixed(2).replace('.', ',')
  } else {
    price = price.toFixed(2).replace('.', ',')
  }
  const isPriceNumber = !isNaN(parseFloat(price))
  newItemPrice.innerText = `R$ ${isPriceNumber ? price : '0,00'}`

  newItem.appendChild(newItemDesc)
  newItem.appendChild(newItemPrice)
  newItem.appendChild(newItemQtde)

  const itemHasDesc = newItemDesc.innerText.trim() !== ''
  if (itemHasDesc) {
    items.append(newItem)
  }

  addPrice.value = ''
  addItem.value = ''
  addQtde.value = ''

  priceUpdate()
  modalAdd.style.display = 'none'
}

function deleteItem(e) {
  modalEdit.style.display = 'none'
  const item = e.target
  if (item.classList[1] === "fa-trash-alt") {
    e.target.parentElement.parentElement.remove()
  }
  priceUpdate()
}

function editItem(e) {
  const item = e.target
  
  if (item.classList[0] === 'item') {
    const itemDesc = item.children[0]
    const itemPrice = item.children[1]
    const itemQtde = item.children[2]

    modalEdit.style.display = 'block'

    const editDesc = document.querySelector('.edit-item')
    editDesc.value = itemDesc.innerText

    const editPrice = document.querySelector('.edit-price')
    let price = parseFloat(itemPrice.innerText.replace('R$', '').replace(',', '.'))

    const editQtde = document.querySelector('.edit-qtde')
    let qtde = itemQtde.innerText.replace('x', '').replace('\xa0', '')
    editQtde.value = qtde
    if (qtde) {
      price = parseFloat(price / parseInt(qtde)).toFixed(2).replace('.', ',')
    } else {
      price = itemPrice.innerText.replace('R$', '')
    }
    editPrice.value = price
    
    const saveBtn = document.querySelector('.save-list')
    saveBtn.onclick = () => {
      qtde = parseInt(editQtde.value)
      price = parseFloat(editPrice.value.replace(',', '.'))
      price = parseFloat(price * qtde).toFixed(2).replace('.', ',')

      const isPriceNumber = !isNaN(parseFloat(price))
      const isQtdeNumber = !isNaN(parseInt(qtde))
      const itemHasDesc = editDesc.value.trim() !== ''

      if (itemHasDesc) {
        itemDesc.innerHTML = `<i class='fas fa-trash-alt'></i> ${editDesc.value}`
      }
      itemPrice.innerText = `R$ ${isPriceNumber ? price : '0,00'}`
      itemQtde.innerText = isQtdeNumber && qtde > 0 ? '\xa0' + qtde + 'x' : ''

      priceUpdate()
      modalEdit.style.display = 'none'
    }
  }
}

function priceUpdate() {
  const itemPrice = document.getElementsByClassName('item-price')
  let totalPrice = 0

  for (let i = 0; i < itemPrice.length; i++) {
    let price = itemPrice[i].innerText
    price = price.replace('R$', '').replace(',', '.')
    price = parseFloat(price)
    totalPrice += price
  }

  const total = document.querySelector('.total-price')
  totalPrice = totalPrice.toFixed(2)
  total.innerText = `Total: R$ ${totalPrice.replace('.', ',')}`
}