namespace Core.Entities;

public class shoppingCart{

    public string Id{get; set;}

    public List<CartItem>Items{get;set;}=[];

}