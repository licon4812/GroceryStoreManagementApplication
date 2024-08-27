using System;

namespace GroceryStore.API.Exceptions.Product
{ 
    public class ProductNotFoundException : Exception {
        public ProductNotFoundException() : base ("The requested Product could not be found") { }
        public ProductNotFoundException(string id) : base($"The requested Product with Id '{id}' could not be found") { }
    }
}
