using BLL.DTOs.OrderDTOs;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IOrderService
{
    Task<string> CreateOrder();

    Task<string> ConfirmOrder(ConfirmOrderCommand command);

    Task<Paging<ListOrderVm>> GetList(GridifyQuery query);

    Task<ListOrderVm> GetById(Guid id);
}