using System;
using System.Dynamic;
using System.Linq.Expressions;

namespace Core.Interface;

//this is interface support the specification pattern ; 
public interface ISpecification<T>
{
   Expression<Func<T,bool>> ?Criteria{get;}

   Expression <Func<T,object>>? orderBy{get;}

   Expression <Func<T,object>>? orderDescending{get;}

   bool IsDistinct{get;}

   int Skip{get;}

   int Take{get;}

   bool IsPagingEnabled{get;}

   IQueryable<T>ApplyCriteria(IQueryable<T> query);

  
}

public interface ISpecification<T,TResult>: ISpecification<T>{

   Expression<Func<T,TResult>>? Select{get;}
}