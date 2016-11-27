(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', foundItemsDirective);;


function foundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}


NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
var menu = this;
menu.nothing = false;
menu.findItem = function (itemToFind) {
menu.foundItems = MenuSearchService.getMatchedMenuItems(itemToFind);

if (itemToFind == "" || itemToFind == undefined)
{
  menu.nothing = true;
  console.log("Nothing found");
}
else
{
  menu.nothing = false;
}
};

menu.onRemove = function(index) {
  MenuSearchService.removeItem(index);
  menu.foundItems = MenuSearchService.getFoundItems();
};


}


MenuSearchService.$inject = ['$http'];
function MenuSearchService($http){

var service = this;
var foundItems = [];


service.removeItem = function (index)
{
  foundItems.splice(index,1);
}
service.getFoundItems = function()
{
  return foundItems;
};
service.getMatchedMenuItems = function(itemToFind)
{

  foundItems = [];

  var response = $http({
      method: "GET",
      url: "https://davids-restaurant.herokuapp.com/menu_items.json"
    });

var promise = response;

    promise.then(function (response) {
      for (var i in response.data.menu_items)
      {
        if (response.data.menu_items[i].description.indexOf(itemToFind) != -1)
        {
          foundItems.push(response.data.menu_items[i]);
        }
      }
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
    });

return foundItems;
};
}
})();
