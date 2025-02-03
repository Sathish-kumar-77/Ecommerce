using System;
using Core.Entities;
using Core.Interface;

namespace Infrastructure.Data;

public class SpecificationEvalutor<T> where T : BaseEntity
{

public static IQueryable<T> GetQuery(IQueryable<T> query,ISpecification<T> spec){

    if(spec.Criteria !=null){

        query=query.Where(spec.Criteria);
    }
    if(spec.orderBy != null){

        query= query.OrderBy(spec.orderBy);
    }
     if(spec.orderDescending != null){

        query= query.OrderByDescending(spec.orderDescending);
    }

    return query;
}
}
