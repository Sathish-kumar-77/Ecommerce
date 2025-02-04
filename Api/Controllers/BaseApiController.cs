using Api.RequestHelpers;
using Core.Entities;
using Core.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseApiController : ControllerBase
    {

        protected async Task<ActionResult> CreatePagedResult<T>(IGenericRepository<T> repo, ISpecification<T> spec, int PageIndex, int PageSize) where T : BaseEntity
        {

            var items = await repo.ListAsync(spec);

            var Count = await repo.CountAsync(spec);

            var Pagination = new Pagination<T>(PageIndex, PageSize, Count, items);

            return Ok(Pagination);



        }


    }
}
