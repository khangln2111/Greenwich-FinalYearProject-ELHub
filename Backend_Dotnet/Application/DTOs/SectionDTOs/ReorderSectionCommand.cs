namespace Application.DTOs.SectionDTOs;

public class ReorderSectionCommand
{
    public Guid Id { get; set; }
    public int NewOrder { get; set; }
}