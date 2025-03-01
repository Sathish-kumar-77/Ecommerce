using Core.Entities;

namespace Core.Interface;                // it is example Repo pattern now changed to generic pattern 


public interface IProductRepository{

    Task<IReadOnlyList<Product>>GetProductsAsync(string ? brand ,string ?type,string ? sort );

    Task <Product?>GetProductsByIdAsync( int id );

    Task <IReadOnlyList<string>>GetBrandAsync();

    Task <IReadOnlyList<string>>GetTypeAsync();
    void  AddProduct(Product product);

    void UpdateProduct(Product product);

    void DeleteProduct (Product product);

    bool ProductExists (int id);
    


    Task<bool> SaveChangesAsync();
}