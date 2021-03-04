using System;
using System.ComponentModel.DataAnnotations;

namespace Example.API.Dtos
{
    public class ParmsCreateDto
    {
        public ParmsCreateDto()
        {
        }

        [Required]
        public string name { get; set; }
        [Required]
        public string type { get; set; }
        [Required]
        public int WigdetId { get; set; }
    }
}
