using Application.Common.Contracts.GeneralContracts;
using Application.Common.Models;
using Application.DTOs.OrderDTOs;
using Application.Gridify.CustomModels;
using Gridify;

namespace Application.Common.Contracts.AppContracts;

public interface IOrderService : IAppService
{
    Task<Paged<OrderVm>> GetList(GridifyQuery query);

    Task<OrderVm> GetById(Guid id);

    Task<Success> CreateOrder(CreateOrderCommand command);

    Task<Success> ProcessOrder(Guid id);

    Task<Paged<OrderVm>> GetListSelf(GridifyQuery query);

    Task<OrderDetailVm> GetByIdSelf(Guid id);
}