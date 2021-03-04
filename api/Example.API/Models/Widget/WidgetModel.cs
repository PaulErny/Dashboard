using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Example.API.Models
{
    [JsonObject(IsReference = true)] 
    public class Params
    {
        public Params()
        {
        }

        [Key]
        public int Id { get; set; }
        public int widgetId {get; set;}
        public string name { get; set; }
        public string type { get; set; }
        public WidgetModel widget { get; set; }
    }

    [JsonObject(IsReference = true)] 
    public class WidgetModel
    {
        public WidgetModel()
        {
            @params = new List<Params>();
        }

        [Key]
        public int Id { get; set; }
        public string name { get; set; }
        public int modelId {get; set;}
        public string description { get; set; }
        public IList<Params> @params {get; set;}
        public ServiceModel serviceModel { get; set; }
    }
}
