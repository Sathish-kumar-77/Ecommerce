using System;
using System.Linq.Expressions;

namespace Core.Interface.Specification;

public class BaseSpecification<T>(Expression<Func<T, bool>> ?criteria) : ISpecification<T>
{  
  
    
    protected BaseSpecification():this(null){}
    public Expression<Func<T,bool>> ?Criteria =>criteria;

    public Expression<Func<T, object>>? orderBy {get; private set;}

    public Expression<Func<T, object>>? orderDescending {get; private set;}


    protected void AddOrderBy(Expression<Func<T,object>>orderByExpression){

        orderBy=orderByExpression;
    }
     protected void AddOrderByDescending(Expression<Func<T,object>>orderByDescExpression){

        orderDescending=orderByDescExpression;
    }
}
