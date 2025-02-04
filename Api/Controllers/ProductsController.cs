using Api.RequestHelpers;
using Core.Entities;
using Core.Interface;
using Core.Interface.Specification;
using Core.Specification;
using Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers;


public class ProductsController(IGenericRepository<Product> repo) : BaseApiController
{



    [HttpGet]

    public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts([FromQuery] ProductSpecParams specParams)
    {

        // core - specification - product specification used this to retrive the brand type and sort 
        var spec = new ProductSpecification(specParams);


        return await CreatePagedResult(repo, spec, specParams.PageIndex, specParams.PageSize);
    }


    [HttpGet("{id:int}")]

    public async Task<ActionResult<Product>> GetProduct(int id)
    {


        var product = await repo.GetByIdAsync(id);

        if (product == null) return NotFound();

        return product;
    }

    [HttpPost]

    public async Task<ActionResult<Product>> CreateProduct(Product product)
    {


        repo.Add(product);

        if (await repo.SaveAllAsync())
        {

            return CreatedAtAction("GetProduct", new { id = product.Id }, product);

        }

        return BadRequest("Problem creating Product");

    }

    [HttpPut("{id:int}")]

    public async Task<ActionResult> UpdateProduct(int id, Product product)
    {

        if (product.Id != id || !ProductExists(id)) return BadRequest("cannot update this product");

        repo.Update(product);

        if (await repo.SaveAllAsync())
        {

            return NoContent();
        }

        return BadRequest("Problem update the Product ");

    }

    [HttpDelete("{id:int}")]

    public async Task<ActionResult> DeleteProduct(int id)
    {


        var product = await repo.GetByIdAsync(id);

        if (product == null) return NotFound();

        repo.Remove(product);

        if (await repo.SaveAllAsync())
        {

            return NoContent();

        }

        return BadRequest("Problem while deleting  the Product");
    }

    [HttpGet("brands")]

    public async Task<ActionResult<IReadOnlyList<string>>> GetBrands()
    {

        var spec = new BrandListSpecification();

        return Ok(await repo.ListAsync(spec));
    }


    [HttpGet("types")]
    public async Task<ActionResult<IReadOnlyList<string>>> GetTypes()
    {

        var spec = new TypeListSpecification();

        return Ok(await repo.ListAsync(spec));
    }

    private bool ProductExists(int id)
    {

        return repo.Exits(id);
    }



}