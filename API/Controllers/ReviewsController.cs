using BLL.BusinessServices.Abstract;
using BLL.DTOs.ReviewDTOs;
using BLL.Gridify.CustomModels;
using Gridify;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ReviewsController(IReviewService reviewService) : ControllerBase
{
    // GET: /api/Reviews/course/{courseId}
    [HttpGet("course/{courseId:guid}")]
    [ProducesResponseType<Paged<ReviewVm>>(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetReviewsByCourseId(Guid courseId, [FromQuery] GridifyQuery query)
    {
        var reviews = await reviewService.GetListByCourseId(courseId, query);
        return Ok(reviews);
    }

    //GET: /api/Reviews/{id:guid}
    [HttpGet("{id:guid}")]
    [ProducesResponseType<ReviewVm>(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> GetReviewById(Guid id)
    {
        var review = await reviewService.GetById(id);
        return Ok(review);
    }

    //POST: /api/Reviews
    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateReview([FromBody] CreateReviewCommand command)
    {
        var result = await reviewService.Create(command);
        return StatusCode(StatusCodes.Status201Created, result);
    }

    //PUT: /api/Reviews
    [HttpPut]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateReview([FromBody] UpdateReviewCommand command)
    {
        var result = await reviewService.Update(command);
        return Ok(result);
    }

    //DELETE: /api/Reviews/{id:guid}
    [HttpDelete("{id:guid}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteReview(Guid id)
    {
        var result = await reviewService.Delete(id);
        return Ok(result);
    }

    //POST: /api/Reviews/reply
    [HttpPost("reply")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> ReplyToReview([FromBody] ReplyToReviewCommand command)
    {
        var result = await reviewService.ReplyToReview(command);
        return Ok(result);
    }

    //PUT: /api/Reviews/reply
    [HttpPut("reply")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateReplyToReview([FromBody] UpdateReviewReplyCommand command)
    {
        var result = await reviewService.UpdateReviewReply(command);
        return Ok(result);
    }
}