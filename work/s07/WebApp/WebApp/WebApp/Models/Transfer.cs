using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApp.Models
{
    public class Transfer
    {
        public int Sender { get; set; }
        public decimal Amount { get; set; }
        public int Recipient { get; set; }

        public Transfer()
        {

        }
        public Transfer(int sender, decimal amount, int recipient)
        {
            Sender = sender;
            Amount = amount;
            Recipient = recipient;
        }
         
        
    }
}
