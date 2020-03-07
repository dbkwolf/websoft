using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.Rendering;

namespace WebApp.Models
{
    public class Account
    {

     
        public int Number { get; set; }

        public decimal Balance { get; set; }
        public string Label { get; set; }
        public int Owner { get; set; }

        public Account(int number, decimal balance, string label, int owner)
        {
            Number = number;
            Balance = balance;
            Label = label;
            Owner = owner;
        }

        public string Display()
        {
            return $"{Number.ToString().PadRight(20)} {Balance:00.00}  {Label.PadLeft(10)} {Owner.ToString().PadLeft(10)} ";
        }

       
    }

    

}
