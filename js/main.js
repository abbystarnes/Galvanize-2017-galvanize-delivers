const menuItems = {
  items: [{
    name: 'Royale with Cheese',
    price: 8.99,
  },
  {
    name: 'Arugula Pie',
    price: 11.99,
  },
  {
    name: 'Smoked Swine',
    price: 14.99,
  },
  {
    name: 'Ice Cream Biscuit',
    price: 7.99,
  },
  ],
};

// article id=item.name

document.addEventListener('DOMContentLoaded', () => {
   // move toggle order panel
  const headerButton = document.getElementById('headerButton');
  const aside = document.getElementById('aside');
  const main = document.getElementById('main');
  const footer1 = document.getElementById('footer1');
  const footer2 = document.getElementById('footer2');

  function toggleAside(event) {
    event.preventDefault();
    if (aside.className !== 'aside aside-active') {
      aside.className = 'aside aside-active';
      headerButton.className = 'header-button header-button-active';
      main.className = ' tint';
      footer1.className += ' tint';
      footer2.className += ' tint';
    } else {
      aside.className = 'aside';
      headerButton.className = 'header-button';
      main.className = '';
      footer1.className = 'footer';
      footer2.className = 'footer footer--darkbase';
    }
  }

   // remove panel toggle med/large screens
  function WidthChange(mq) {
    if (mq.matches) {
      headerButton.removeEventListener('click', toggleAside);
    } else {
      headerButton.addEventListener('click', toggleAside);
    }
  }

  if (matchMedia) {
    const mq = window.matchMedia('(min-width: 1116px)');
    mq.addListener(WidthChange);
    WidthChange(mq);
  }


   // generate table items
  const orderTable = document.getElementById('orderTable');
  const subtotalRow = document.getElementById('subtotalRow');
  const taxRow = document.getElementById('taxRow');
  const totalRow = document.getElementById('totalRow');

  const subtotalTD = document.createElement('td');
  subtotalTD.className = 'table-price';
  const taxTD = document.createElement('td');
  taxTD.className = 'table-price';
  const totalTD = document.createElement('td');
  totalTD.className = 'table-price';

  subtotalRow.append(subtotalTD);
  taxRow.append(taxTD);
  totalRow.append(totalTD);

   // add menu items to receipt which updates subtotal, tax, and total
  let subtotal = 0;
  let tax = 0;
  let total = 0;

  const orderTableBody = orderTable.getElementsByTagName('tbody')[0];

  let textFieldPopulated = false;

  function updateOrderTable() {
    textFieldPopulated = true;
    const addedItemRow = document.createElement('tr');
    const addedItemName = document.createElement('td');
    addedItemName.innerHTML = this.dataset.name;
    addedItemName.colSpan = '2';
    const addedItemPrice = document.createElement('td');
    addedItemPrice.innerHTML = `$${this.dataset.price}`;
    addedItemPrice.className = 'table-price';
    addedItemRow.append(addedItemName, addedItemPrice);
    orderTableBody.append(addedItemRow);

    subtotal += parseFloat(this.dataset.price);
    tax = parseFloat((0.0825 * subtotal).toFixed(2));
    total = parseFloat((subtotal + tax).toFixed(2));
    subtotalTD.innerHTML = `$${subtotal}`;
    taxTD.innerHTML = `$${tax}`;
    totalTD.innerHTML = `$${total}`;
  }
   // generate menu item cards
  const itemCards = document.getElementById('menuItems');

  for (let x = 0; x < menuItems.items.length; x += 1) {
    const itemCard = document.createElement('article');
    itemCard.className = 'card';
    const itemCardImage = document.createElement('div');
    itemCardImage.className = 'card-image';
    itemCard.append(itemCardImage);
    const itemCardName = document.createElement('h4');
    itemCardName.className = 'card-header';
    itemCardName.innerHTML = ` ${menuItems.items[x].name}`;
    itemCard.append(itemCardName);
    const itemCardPrice = document.createElement('p');
    itemCardPrice.innerHTML = `$${menuItems.items[x].price}`;
    itemCardPrice.className = 'card-price';
    itemCard.append(itemCardPrice);
    const itemCardButton = document.createElement('button');
    itemCardButton.addEventListener('click', updateOrderTable);
    itemCardButton.innerHTML = 'Add To Order';
    itemCardButton.className = 'card-button';
    itemCardButton.dataset.price = (menuItems.items[x].price);
    itemCardButton.dataset.name = (menuItems.items[x].name);
    itemCard.append(itemCardButton);
    itemCards.append(itemCard);
  }


  function createToast(event) {
    event.preventDefault();
    const toast = document.createElement('div');
    toast.style.backgroundColor = 'rgb(255, 51, 51)';
    toast.className = 'toast';
    const nameInput = document.getElementById('nameInput');
    const numberInput = document.getElementById('numberInput');
    const addressInput = document.getElementById('addressInput');
    if (textFieldPopulated === false) {
      const noItemsP = document.createElement('p');
      noItemsP.innerHTML = 'No menu items selected.';
      toast.append(noItemsP);
    } else if (numberInput.value === '') {
      const numberP = document.createElement('p');
      numberP.innerHTML = 'Number must be filled out.';
      toast.append(numberP);
    } else if (addressInput.value === '') {
      const addressP = document.createElement('p');
      addressP.innerHTML = 'Address must be filled out.';
      toast.append(addressP);
    } else if (nameInput.value === '') {
      const nameP = document.createElement('p');
      nameP.innerHTML = 'Name must be filled out.';
      toast.append(nameP);
    } else {
      const successP = document.createElement('p');
      successP.innerHTML = 'Your order was completed successfully!';
      toast.append(successP);
      toast.style.backgroundColor = 'rgb(0, 204, 102)';
    }

    document.body.appendChild(toast);
    toast.className = 'toast';
    setTimeout(() => {
      toast.className = 'toast fade';
    }, 400);
    setTimeout(() => {
      toast.className = 'toast fade fade-out';
    }, 5000);
  }

  const formSubmitButton = document.getElementById('formSubmit');

  formSubmitButton.addEventListener('click', createToast);
});
