using System;
using System.Linq.Expressions;

namespace Core.Interface;

public interface ISpecification<T>
{
   Expression<Func<T,bool>> ?Criteria{get;}

   Expression <Func<T,object>>? orderBy{get;}

   Expression <Func<T,object>>? orderDescending{get;}
}
