using System;
using System.Collections.Generic;


using Newtonsoft.Json;
using System.Runtime.Serialization;

namespace Example.API.Models
{
    [JsonObject(IsReference = true)] 
    public class ServiceModel
    {

        #region CONSTRUCTOR
        public ServiceModel() {
            widgets = new List<WidgetModel>();
        }

        #endregion CONSTRUCTOR

        #region FIELDS

        public int Id { get; set; }
        public string Name { get; set; }
        public IList<WidgetModel> widgets { get; set; }
        #endregion FIELDS
    }
}