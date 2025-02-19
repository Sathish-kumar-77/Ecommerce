using System;
using Core.Entities;

namespace Core.Interface;

public interface ICartService
{
    Task<shoppingCart?>GetCartAsync(string key);

    Task<shoppingCart?>SetCartAsync(shoppingCart cart);
    

    Task<bool>DeleteCartAsync(string key);


}
