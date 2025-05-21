using BLL.DTOs.CartDTOs;
using BLL.DTOs.OrderDTOs;
using BLL.Gridify.CustomModels;
using BLL.Models;
using Gridify;

namespace BLL.BusinessServices.Abstract;

public interface IOrderService
{
    Task<Paged<ListOrderVm>> GetList(GridifyQuery query);

    Task<ListOrderVm> GetById(Guid id);

    Task<Success> CreatePaymentIntent(CreatePaymentIntentCommand command);

    Task<Success> ConfirmPaymentIntent(ConfirmPaymentIntentCommand command);
}