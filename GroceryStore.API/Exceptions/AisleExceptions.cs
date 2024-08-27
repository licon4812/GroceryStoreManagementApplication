using System;

namespace GroceryStore.API.Exceptions.Aisle
{
    public class AisleNotFoundException : Exception
    {
        public AisleNotFoundException() : base("The requested Aisle could not be found") { }
        public AisleNotFoundException(string id) : base($"The requested Aisle with Id '{id}' could not be found") { }
    }

    public class DuplicateAisleNameException : Exception
    {
        public DuplicateAisleNameException() : base("An aisle with the same name already exists") { }
        public DuplicateAisleNameException(string name) : base ($"An aisle with the same name \"{name}\" already exists") { }
    }
}
