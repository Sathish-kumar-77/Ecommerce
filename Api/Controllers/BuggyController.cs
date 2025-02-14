using System;
using Api.DTOs;
using Core.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

public class BuggyController : BaseApiController
{
[HttpGet("unauthorized")]

public IActionResult GetUnauthorized(){

    return Unauthorized();
}

[HttpGet("badrequest")]

public IActionResult GetBadRequest(){

    return BadRequest(" not a good request");
}

[HttpGet("notfound")]

public IActionResult GetNotFound(){

    return NotFound();
}

[HttpGet("internalerror")]

public IActionResult GetInternalError(){

    throw new Exception("this is a test exception ");
}

[HttpPost("validationerror")]

public IActionResult GetvaidationError( ProductDTO product){

    return Ok();
}
}
