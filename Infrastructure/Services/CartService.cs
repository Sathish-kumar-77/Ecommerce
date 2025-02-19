using System;
using Core.Entities;
using Core.Interface;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CartService : ICartService
    {
        
        private static readonly Dictionary<string, shoppingCart> _cartStorage = new();

        public async Task<shoppingCart?> GetCartAsync(string key)
        {
           
            return await Task.Run(() =>
            {
                _cartStorage.TryGetValue(key, out var cart);
                return cart;
            });
        }

        public async Task<shoppingCart?> SetCartAsync(shoppingCart cart)
        {
            // Simulate async behavior with Task.Run
            return await Task.Run(() =>
            {
                // Store the cart in the in-memory dictionary
                _cartStorage[cart.Id] = cart;
                return cart;
            });
        }

        public async Task<bool> DeleteCartAsync(string key)
        {
            // Simulate async behavior with Task.Run
            return await Task.Run(() =>
            {
                return _cartStorage.Remove(key);
            });
        }
    }
}
