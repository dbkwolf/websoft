using System;

using System.Diagnostics;
using System.Net;

using Microsoft.AspNetCore.Mvc;

using Microsoft.Extensions.Logging;
using WebApp.Models;
using WebApp.Services;

namespace WebApp.Controllers
{
    public class HomeController : Controller
    {

        
        private readonly ILogger<HomeController> _logger;


        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()

        {
            
            return View(DataService.LoadJSON());
        }

        [HttpPost]
        public IActionResult Index(string sender, string amount, string recipient)

        {
            
                     
            string msg = DataService.PerformTransfer(sender, amount, recipient);
           
            ViewBag.TxMsg = msg;

            return View(DataService.LoadJSON());
        }

       

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        public string HeyHo()
        {
            return "This is the hezho action method...";
        }
    }
}
