using System;
using Microsoft.AspNet.Mvc;

namespace Amegala.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
    }
}
