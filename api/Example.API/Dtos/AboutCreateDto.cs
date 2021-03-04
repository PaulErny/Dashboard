using System;
namespace Example.API.Dtos
{
    public class AboutCreateDto
    {
        public AboutCreateDto()
        {
        }

        public string host { get; set; }
        public string currentTime { get; set; }
    }
}
