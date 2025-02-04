using Core.Entities;

namespace Core.Interface.Specification;

public class BrandListSpecification : BaseSpecification<Product,string>{

    public BrandListSpecification()
    {
        AddSelect(x => x.Brand);
        ApplyDistinct();
    }
}