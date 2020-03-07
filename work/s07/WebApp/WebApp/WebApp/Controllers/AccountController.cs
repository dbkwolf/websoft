using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebApp.Models;
using WebApp.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebApp.Controllers
{
    [Route("api/[controller]")]
    public class AccountController : Controller
    {
        // GET: api/<controller>
        [HttpGet]
        public IEnumerable<Account> Get()
        {
            return DataService.accounts.ToArray();
        }

        // GET api/account/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            string response;

            Account searchedAccount = DataService.GetAccountByNumber(id);

            if (searchedAccount != null)
            {
                response = JsonConvert.SerializeObject(searchedAccount, Formatting.Indented);
            }
            else
            {

                DataAccessError error = new DataAccessError("NULL_ACCOUNT", "The account searched for was not found; Search returned null.");

                response = JsonConvert.SerializeObject(error, Formatting.Indented);
            }

            return response;
        }

        // POST api/<controller>
        [HttpPost]
        public string Post([FromBody]Transfer tx)
        {

            
            return DataService.PerformTransfer(tx);


        }

        // PUT api/<controller>/5
        [HttpPut("{id}")]
        public string Put(int id, [FromBody]Transfer tx)
        {

           return DataService.PerformTransfer(tx);

        }

        // DELETE api/<controller>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
