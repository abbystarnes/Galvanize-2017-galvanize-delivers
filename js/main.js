var menuItems = {
   "items": [{
         "name": "Royale with Cheese",
         "price": 8.99
      },
      {
         "name": "Arugula Pie",
         "price": 11.99
      },
      {
         "name": "Smoked Swine",
         "price": 14.99
      },
      {
         "name": "Ice Cream Biscuit",
         "price": 7.99
      }
   ]
}

// article id=item.name

document.addEventListener("DOMContentLoaded", function(event) {
   //move toggle order panel
   var headerButton = document.getElementById('headerButton');
   var aside = document.getElementById('aside');
   var myScreen = document.getElementById('screen');

   function toggleAside() {
      if (aside.className != "aside aside-active") {
         aside.className = "aside aside-active";
         headerButton.className = "header-button header-button-active";
      } else {
         aside.className = "aside";
         headerButton.className = "header-button";
      }


   }

   // remove panel toggle med/large screens
   if (matchMedia) {
      var mq = window.matchMedia("(min-width: 1116px)");
      mq.addListener(WidthChange);
      WidthChange(mq);
   }

   function WidthChange(mq) {
      if (mq.matches) {
         headerButton.removeEventListener('click', toggleAside);
      } else {
         headerButton.addEventListener('click', toggleAside);
      }
   }


   // generate table items
   var orderTable = document.getElementById('orderTable');
   var subtotalRow = document.getElementById('subtotalRow');
   var taxRow = document.getElementById('taxRow');
   var totalRow = document.getElementById('totalRow');

   var subtotalTD = document.createElement('td');
   subtotalTD.className = 'table-price';
   var taxTD = document.createElement('td');
   taxTD.className = 'table-price';
   var totalTD = document.createElement('td');
   totalTD.className = 'table-price';

   subtotalRow.append(subtotalTD);
   taxRow.append(taxTD);
   totalRow.append(totalTD);

   // add menu items to receipt which updates subtotal, tax, and total
   let subtotal = 0;
   let tax = 0;
   let total = 0;

   let orderTableBody = orderTable.getElementsByTagName('tbody')[0];

   let textFieldPopulated = false;

   function updateOrderTable() {
      textFieldPopulated = true;
      var addedItemRow = document.createElement('tr');
      var addedItemName = document.createElement('td');
      addedItemName.innerHTML = this.dataset.name;
      addedItemName.colSpan = '2';
      var addedItemPrice = document.createElement('td');
      addedItemPrice.innerHTML = `$${this.dataset.price}`;
      addedItemPrice.className = 'table-price';
      addedItemRow.append(addedItemName, addedItemPrice);
      orderTableBody.append(addedItemRow);

      subtotal = subtotal + parseFloat(this.dataset.price);
      tax = parseFloat((.0825 * subtotal).toFixed(2));
      total = parseFloat((subtotal + tax).toFixed(2));
      subtotalTD.innerHTML = `$${subtotal}`;
      taxTD.innerHTML = `$${tax}`;
      totalTD.innerHTML = `$${total}`;
   }
   //generate menu item cards
   let itemCards = document.getElementById('menuItems');

   for (let x = 0; x < menuItems['items'].length; x++) {
      var itemCard = document.createElement('article');
      itemCard.className = "card";
      var itemCardImage = document.createElement('div');
      itemCardImage.className = "card-image";
      itemCard.append(itemCardImage);
      var itemCardName = document.createElement('h4');
      itemCardName.className = "card-header"
      itemCardName.innerHTML = ` ${menuItems['items'][x].name}`;
      itemCard.append(itemCardName);
      var itemCardPrice = document.createElement('p');
      itemCardPrice.innerHTML = `$${menuItems['items'][x].price}`;
      itemCardPrice.className = "card-price";
      itemCard.append(itemCardPrice);
      var itemCardButton = document.createElement('button');
      itemCardButton.addEventListener('click', updateOrderTable);
      itemCardButton.innerHTML = "Add To Order";
      itemCardButton.className = "card-button"
      itemCardButton.dataset.price = (menuItems['items'][x].price);
      itemCardButton.dataset.name = (menuItems['items'][x].name);
      itemCard.append(itemCardButton);
      itemCards.append(itemCard);
   }

   function createToast(event) {
      event.preventDefault();
      let toast = document.createElement('div');
      toast.style.backgroundColor = 'red';
      toast.className = 'toast';
      let nameInput = document.getElementById('nameInput');
      let numberInput = document.getElementById('numberInput');
      let addressInput = document.getElementById('addressInput');

      if (textFieldPopulated === false) {
         let noItemsP = document.createElement('p');
         noItemsP.innerHTML = "No menu items selected";
         toast.append(noItemsP);
      } else if (numberInput.value == "") {
         let numberP = document.createElement('p');
         numberP.innerHTML = "Number must be filled out";
         toast.append(numberP);
      } else if (addressInput.value == "") {
         let addressP = document.createElement('p');
         addressP.innerHTML = "Number must be filled out";
         toast.append(addressP);
      } else if (nameInput.value == "") {
         let nameP = document.createElement('p');
         nameP.innerHTML = "Name must be filled out";
         toast.append(nameP);
      } else {
         let successP = document.createElement('p');
         successP.innerHTML = "Your order was completed successfully!";
         toast.append(successP);
         toast.style.backgroundColor = 'green'
      }

      document.body.appendChild(toast);

   }

   let formSubmitButton = document.getElementById('formSubmit');

   formSubmitButton.addEventListener('click', createToast);


});
