using System;
using System.Collections.Generic;

namespace Example.API.Models
{
    public class AboutModel
    {

        #region CONSTRUCTORS

        public AboutModel()
        {
            Id = Guid.NewGuid();
        }

        #endregion CONSTRUCTORS

        #region MEMBERS

        public Guid Id { get; set; }
        public string host { get; set; }
        public ICollection<ServiceModel> services { get; set; }
        public string currentTime { get; set; }

        #endregion MEMBERS
    }
}
