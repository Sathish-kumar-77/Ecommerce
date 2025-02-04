using System.Security.Cryptography.X509Certificates;
using Core.Entities;

namespace Core.Interface.Specification;

public class TypeListSpecification : BaseSpecification<Product,string>{

    public  TypeListSpecification(){


        AddSelect(x=> x.Type);

        ApplyDistinct();


    }
}