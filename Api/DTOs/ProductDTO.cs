using System;
using System.ComponentModel.DataAnnotations;

namespace Api.DTOs;

public class ProductDTO
{   [Required]
    public string Name{get ;set;} =string.Empty;

     [Required]
    public   string ?Description{get ;set;}= string.Empty;

     [Range(0.01,double.MaxValue,ErrorMessage ="Must give proper price")]
    public decimal Price{get;set;}

    [Required]
    public  string  PictureUrl{get;set;}=string.Empty;

   [Required]
    public  string Type { get; set; } =string.Empty;

    [Required]
    public   string Brand{get;set;} =string.Empty;

     [Range(1,int.MaxValue,ErrorMessage ="quality in stock must be grether than 1")]
    public int QuantityInStock { get; set; }
}

