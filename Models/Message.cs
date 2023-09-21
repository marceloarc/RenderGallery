namespace RenderGallery.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;

    [Table("Message")]
    public class Message
    {
        [Key]

        public int id { get; set; }

        [Column(TypeName = "text")]
        public string msg_content { get; set; }

        public int? conversation_id { get; set; }
        public int? user_id { get; set; }

        [Column(TypeName = "datetime")]
        public DateTime? time { get; set; }
        public int? visu_status { get; set; }
        [ForeignKey("conversation_id")]
        public virtual Chat Chat{ get; set; }


    }
}

