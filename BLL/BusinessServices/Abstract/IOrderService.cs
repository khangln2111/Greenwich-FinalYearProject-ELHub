using BLL.DTOs.OrderDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IOrderService
{
    Task<Paged<OrderVm>> GetList(GridifyQuery query);

    Task<OrderVm> GetById(Guid id);

    Task<Success> CreatePaymentIntent(CreatePaymentIntentCommand command);

    Task<Success> ConfirmPaymentIntent(string paymentIntentId);

    Task<Paged<OrderVm>> GetListSelf(GridifyQuery query);

    Task<OrderDetailVm> GetByIdSelf(Guid id);
}