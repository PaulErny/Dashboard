using System;
using System.ComponentModel.DataAnnotations;

namespace Example.API.Dtos
{
    public class WidgetCreateDto
    {
        public WidgetCreateDto()
        {
        }

        [Required]
        public int ServiceId { get; set; }

        [Required]
        public string name { get; set; }

        [Required]
        public string description { get; set; }
    }
}
