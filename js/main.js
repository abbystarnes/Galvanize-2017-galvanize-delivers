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

   // generate table items
   var orderTable = document.getElementById('orderTable');
   var subtotalRow = document.getElementById('subtotalRow');
   var taxRow = document.getElementById('taxRow');
   var totalRow = document.getElementById('totalRow');

   var subtotalTD = document.createElement('td');
   var taxTD = document.createElement('td');
   var totalTD = document.createElement('td');

   subtotalRow.append(subtotalTD);
   taxRow.append(taxTD);
   totalRow.append(totalTD);

   // add menu items to receipt which updates subtotal, tax, and total
   let subtotal = 0;
   let tax = 0;
   let total = 0;

   let orderTableBody = orderTable.getElementsByTagName('tbody')[0];
   console.log(orderTableBody);

   function updateOrderTable() {
      var addedItemRow = document.createElement('tr');
      var addedItemName = document.createElement('td');
      addedItemName.innerHTML = this.dataset.name;
      var addedItemPrice = document.createElement('td');
      addedItemPrice.innerHTML = this.dataset.price;
      addedItemRow.append(addedItemName, addedItemPrice);
      orderTableBody.append(addedItemRow);

      subtotal = subtotal + parseFloat(this.dataset.price);
      tax = parseFloat((.0825 * subtotal).toFixed(2));
      total = parseFloat((subtotal + tax).toFixed(2));
      console.log(subtotal, tax, total);
      subtotalTD.innerHTML = `$${subtotal}`;
      taxTD.innerHTML = `$${tax}`;
      totalTD.innerHTML = `$${total}`;
   }
   //generate menu item cards
   let itemCards = document.getElementById('menuItems');

   for (let x = 0; x < menuItems['items'].length; x++) {
      var itemCard = document.createElement('article');
      var itemCardName = document.createElement('h4');
      itemCardName.innerHTML = ` ${menuItems['items'][x].name}`;
      itemCard.append(itemCardName);
      var itemCardPrice = document.createElement('p');
      itemCardPrice.innerHTML = `$${menuItems['items'][x].price}`;
      itemCard.append(itemCardPrice);
      var itemCardButton = document.createElement('button');
      itemCardButton.addEventListener('click', updateOrderTable);
      itemCardButton.innerHTML = "Add To Order";
      itemCardButton.dataset.price = (menuItems['items'][x].price);
      itemCardButton.dataset.name = (menuItems['items'][x].name);
      itemCard.append(itemCardButton);
      itemCards.append(itemCard);
   }
   //click button
   // create new tr
   // create new td w/name
   // create new td w/price
   // append td to tr
   // append tr to table
   //subtotal = subtotal + price
   // recalculate tax and total


   // no items/blank textfiels -- validation error message in toast
   // success message in toast
});
