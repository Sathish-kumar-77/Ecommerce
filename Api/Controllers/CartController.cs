using Core.Entities;
using Core.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : BaseApiController
    {
        private readonly ICartService _cartService;

        public CartController(ICartService cartService)
        {
            _cartService = cartService;
        }

        [HttpGet]
        public async Task<ActionResult<shoppingCart>> GetCartById(string id)
        {
            var cart = await _cartService.GetCartAsync(id);
            return Ok(cart ?? new shoppingCart { Id = id });
        }

        [HttpPost]
        public async Task<ActionResult<shoppingCart>> UpdateCart(shoppingCart cart)
        {
            var updateCart = await _cartService.SetCartAsync(cart);
            if (updateCart == null) return BadRequest("Problem in cart");

            return updateCart;
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCart(string id)
        {
            var result = await _cartService.DeleteCartAsync(id);
            if (!result) return BadRequest("Problem in deleting cart");

            return Ok();
        }
    }
}
