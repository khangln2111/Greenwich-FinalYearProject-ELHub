using BLL.DTOs.OrderDTOs;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IOrderService
{
    Task<Success> CreateOrder();

    Task<Success> ConfirmOrder(ConfirmOrderCommand command);

    Task<Paging<ListOrderVm>> GetList(GridifyQuery query);

    Task<ListOrderVm> GetById(Guid id);
}