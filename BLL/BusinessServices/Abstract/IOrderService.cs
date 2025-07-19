using BLL.DTOs.OrderDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IOrderService
{
    Task<Paged<OrderVm>> GetList(GridifyQuery query);

    Task<OrderVm> GetById(Guid id);

    Task<Success> CreateOrder(CreateOrderCommand command);

    Task<Success> ConfirmOrder(Guid id);

    Task<Paged<OrderVm>> GetListSelf(GridifyQuery query);

    Task<OrderDetailVm> GetByIdSelf(Guid id);
}