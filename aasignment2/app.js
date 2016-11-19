(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);



ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var itemsToBuy = this;

  itemsToBuy.items = ShoppingListCheckOffService.getItemsToBuy();
  itemsToBuy.nothing = true;

  itemsToBuy.removeItem = function (itemIndex, itemName, itemQuantity) {
    ShoppingListCheckOffService.addBoughtItem(itemName, itemQuantity);
    ShoppingListCheckOffService.removeItem(itemIndex);
    itemsToBuy.empty = ShoppingListCheckOffService.getItemsEmpty();
    itemsToBuy.nothing = ShoppingListCheckOffService.getItemsBougthEmpty();
};

}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var itemsBought = this;
  itemsBought.items = ShoppingListCheckOffService.getItemsBought();
  //itemsBought.nothing = ShoppingListCheckOffService.getItemsBougthEmpty();

}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var itemsAlreadyBought = [];
  var itemsToBuyList = [
    {
      name: "Milk",
      quantity: "2"
    },
    {
      name: "Donuts",
      quantity: "200"
    },
    {
      name: "Cookies",
      quantity: "300"
    },
    {
      name: "Chocolate",
      quantity: "5"
    },
    {
      name: "CupCakes",
      quantity: "5"
    }
  ];
  service.addBoughtItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    itemsAlreadyBought.push(item);
    console.log(itemsAlreadyBought);
  };


  service.removeItem = function (itemIdex) {
    itemsToBuyList.splice(itemIdex, 1);
  };

  service.getItemsToBuy = function () {
    return itemsToBuyList;
  };

  service.getItemsBought = function () {
    return itemsAlreadyBought;
  };

   service.getItemsEmpty = function() {
     if (itemsToBuyList.length == 0)
     {
       return true;
     }
     else
    {
      return false;
    }
   }

   service.getItemsBougthEmpty = function() {
     if (itemsAlreadyBought.length == 0)
     {
       return true;
     }
     else
    {
      return false;
    }
   }

}


})();
