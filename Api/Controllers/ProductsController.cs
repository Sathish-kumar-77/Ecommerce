using Core.Entities;
using Core.Interface;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase{
    private readonly IProductRepository repo;

    public ProductsController(IProductRepository repo){
        this.repo = repo;
    }
 
 
 [HttpGet]

 public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(string ?brand ,string ?type ,string ? sort){

    return Ok( await repo.GetProductsAsync(brand,type,sort));
 }


[HttpGet("{id:int}")]

public async Task<ActionResult<Product>> GetProduct(int id){


    var product = await repo.GetProductsByIdAsync(id);

    if(product ==null) return NotFound();

    return product;
}

[HttpPost]

public async Task<ActionResult<Product>> CreateProduct(Product product){


    repo.AddProduct(product);

   if(await repo.SaveChangesAsync()){

    return CreatedAtAction("GetProduct",new{id = product.Id},product);

   }

    return BadRequest("Problem creating Product");

}

[HttpPut("{id:int}")]

public async Task<ActionResult> UpdateProduct(int id,Product product){

if(product.Id != id || !ProductExists(id)) return BadRequest("cannot update this product");

repo.UpdateProduct(product);

if(await repo.SaveChangesAsync()){

    return NoContent();
}

return BadRequest("Problem update the Product ");

}

[HttpDelete("{id:int}")]

public async Task<ActionResult>DeleteProduct(int id ){


    var product=await repo.GetProductsByIdAsync(id);

    if(product == null ) return NotFound();

    repo.DeleteProduct(product);

   if(await repo.SaveChangesAsync()){
    
     return NoContent();

   }

    return BadRequest("Problem while deleting  the Product");
}

[HttpGet("brands")]

public async Task<ActionResult<IReadOnlyList<string>>>GetBrands(){

    return Ok(await repo.GetBrandAsync());
}


[HttpGet("types")]
public async Task<ActionResult<IReadOnlyList<string>>>GetTypes(){

    return Ok(await repo.GetTypeAsync());
}

private bool ProductExists(int id ){

    return repo.ProductExists(id);
}



}