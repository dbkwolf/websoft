using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.IO;
using Newtonsoft.Json;
using WebApp.Models;
using System.Net.Http;
using System.Text;
using Nancy.Json;
using System.Reflection;

namespace WebApp.Services
{
    public class DataService
    {
        public static List<Account> accounts = new List<Account>(); 
        
        public static List<Account> LoadJSON()
        {
            //var assembly = Assembly.GetEntryAssembly();
            //var resourceStream = assembly.GetManifestResourceStream("WebApp.data.account.json");
            

            using (StreamReader r = new StreamReader("data\\account.json"))
            {
                string json = r.ReadToEnd();
                accounts = JsonConvert.DeserializeObject<List<Account>>(json);
            }

            //sort list so it is easier to search in the future.
            accounts = accounts.OrderBy(o => o.Number).ToList();

            return accounts;
        }

        private static void WriteJSON()
        {
            var assembly = Assembly.GetEntryAssembly();
            var resourceStream = assembly.GetManifestResourceStream("WebApp.data.account.json");
            var convertedJson = JsonConvert.SerializeObject(accounts, Formatting.Indented);

            System.IO.File.WriteAllText("data\\account.json", convertedJson);
        }

        public static void Update()
        {
            WriteJSON();
        }

        public static Account GetAccountByNumber(int number)
        {
            Account validatedAccount = accounts.SingleOrDefault(o => o.Number == number);

            return validatedAccount;
        }

        public static string PerformTransfer(string sender, string amount, string recipient)
        {
            string transferStatus = "Transfer Failed - ";
            string txError = "";
            if (!String.IsNullOrEmpty(sender) && !String.IsNullOrEmpty(amount) && !String.IsNullOrEmpty(recipient))
            {
                int snd = int.TryParse(sender, out snd) ? snd : 0;
                int rcp = int.TryParse(recipient, out rcp) ? rcp : 0;
                decimal txAmount = decimal.TryParse(amount, out txAmount) ? txAmount : -1;

                bool areAccountsValid = true;

                int indexSender = accounts.FindIndex(a => a.Number == snd);
                if (snd == 0 || indexSender == -1)
                {
                    txError = "Sender is not a valid account number - ";
                    areAccountsValid = false;
                    
                }

                int indexRecipient = accounts.FindIndex(a => a.Number == rcp);
                if (rcp == 0 || indexRecipient == -1)
                {
                    txError += "Recipient is not a valid account number - ";
                    areAccountsValid = false;
                }

               

                if (areAccountsValid)
                {
                     
                    if (txAmount < 0 || (accounts[indexSender].Balance - txAmount)< 0 )
                    {
                        txError += "Amount is not valid";

                    }
                    else
                    {


                        accounts[indexSender].Balance -= txAmount;
                        accounts[indexRecipient].Balance += txAmount;
                        WriteJSON();
                        transferStatus = "Transfer Successful ";
                    }
                    
                }

            }
            else
            {
                txError = "Fields were left empty. Try Again.";
            }

            string transferMsg = transferStatus + txError;

            return transferMsg;
        }

        private static bool IsTransferValid(string sender, string amount, string recipient)
        {
            bool val = false;




            return val;
        }

        public static string PerformTransfer(Transfer tx)
        {

            string msg = PerformTransfer(tx.Sender.ToString(), tx.Amount.ToString(), tx.Recipient.ToString());

            return msg;
        }

        

    }

    public class DataAccessError
    {
        public string ErrorType { get; set; }

        public string ErrorMessage { get; set; }

        public DataAccessError(string type, string msg)
        {
            ErrorType = type;
            ErrorMessage = msg;
        }
    }


}
