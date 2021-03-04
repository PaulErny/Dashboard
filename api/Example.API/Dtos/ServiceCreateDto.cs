using System.ComponentModel.DataAnnotations;

namespace Example.API.Dtos
{
    public class ServiceCreateDto
    {
        public ServiceCreateDto()
        {
        }

        [Required]
        public string name { get; set; }
    }
}
