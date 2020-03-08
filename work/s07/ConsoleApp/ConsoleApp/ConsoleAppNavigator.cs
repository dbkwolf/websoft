using System;
using System.Collections.Generic;
using System.IO;
using Newtonsoft.Json;
using System.Linq;

namespace ConsoleApp
{
    class ConsoleAppNavigator
    {

        public static string path = "data\\account.json";
        private static List<Account> accounts = new List<Account>();


        public static void Main(string[] args)
        {

            LoadJSON();
            DisplayMainMenu();


        }

        private static void LoadJSON()
        {

            using (StreamReader r = new StreamReader(path))
            {
                string json = r.ReadToEnd();
                accounts = JsonConvert.DeserializeObject<List<Account>>(json);
            }

            //sort list so it is easier to search in the future.
            accounts = accounts.OrderBy(o => o.Number).ToList();
        }

        private static void WriteJSON()
        {
            var convertedJson = JsonConvert.SerializeObject(accounts, Formatting.Indented);
            System.IO.File.WriteAllText(path, convertedJson);
        }

        public static void DisplayMainMenu()
        {
            Console.Clear();
            Console.WriteLine("==========================================================");
            string main = "MAIN MENU";
            Console.WriteLine($"{main.PadLeft(32)}");
            Console.WriteLine("==========================================================");
            Console.WriteLine("Please choose from the following options:");
            Console.WriteLine(" 1) View Accounts \n 2) View Account by Number \n 3) Search \n 4) Move (Transfer Money) \n 5) Create New Account \n 6) Exit");
            Console.Write("\n>>:");


            Int32.TryParse(Console.ReadLine(), out int input);


            bool pendingInput = true;
            while (pendingInput)
            {
                switch (input)
                {
                    //VIEW ALL ACCOUNTS
                    case 1:
                        pendingInput = false;
                        DisplayAllAccounts(accounts, "VIEWING ALL ACCOUNTS");
                        break;

                    //VIEW SPECIFIC ACCOUNT (BY NUMBER)
                    case 2:
                        pendingInput = false;
                        DisplaySpecificAccount();
                        break;

                    //SEARCH ALL
                    case 3:
                        pendingInput = false;
                        SearchAccounts();
                        break;

                    //TRANSFER
                    case 4:

                        pendingInput = false;
                        TransferMoney();
                        break;

                    //CREATE NEW ACCOUNT
                    case 5:
                        pendingInput = false;
                        CreateNewAccount();
                        break;

                    //EXIT
                    case 6:
                        pendingInput = false;
                        Console.WriteLine("\nExiting Console Application ..... Goood Bye!\n\n");
                        break;

                    //WRONG INPUT
                    default:
                        Console.WriteLine("Please input the number relevant to the desired option, i.e. only numbers 1 - 6:");
                        Console.Write("\n>>:");
                        Int32.TryParse(Console.ReadLine(), out input);
                        break;
                }
            }
        }

        private static void CreateTableHead()
        {
            Console.WriteLine("==========================================================");
            string strNum = "Number";
            string strLabel = "Label";
            string strOwner = "Owner";
            string strBalance = "Balance";

            var tablehead = $"{strNum.PadRight(20)} {strBalance} {strLabel.PadLeft(10)} {strOwner.PadLeft(10)}";

            Console.WriteLine(tablehead);
            Console.WriteLine("==========================================================");
            Console.WriteLine();
        }

        private static void CreateTableRow(Account account)
        {
            Console.WriteLine(account.Display());
            Console.WriteLine("__________________________________________________________");
            Console.WriteLine();
        }

        private static void CreateSectionHeader(string title, int padding, string subtitle)
        {
            Console.Clear();
            Console.WriteLine($"\n{title.PadLeft(padding)}\n");
            Console.WriteLine(subtitle);
        }

        private static void DisplayAllAccounts(List<Account> accounts, string title)
        {

            CreateSectionHeader(title, 40, "");

            CreateTableHead();

            foreach (var account in accounts)
            {
                CreateTableRow(account);
            }

            GetNextSteps("VIEW ALL", "Search all accounts.");
        }

        private static void DisplaySpecificAccount()
        {

            CreateSectionHeader("VIEWING SPECIFIC ACCOUNT BY NUMBER", 45, "Please enter the Number of the account you wish to view:");

            Console.Write("\n>>:");

            Int32.TryParse(Console.ReadLine(), out int num);

            var (isValid, validatedAccount) = IsAccountValid(num);


            if (isValid)
            {
                Console.WriteLine();
                CreateTableHead();
                CreateTableRow(validatedAccount);
            }

            GetNextSteps("SEARCH SPECIFIC", "Search Again");
        }

        private static void SearchAccounts()
        {

            CreateSectionHeader("SEARCH", 32, "Please enter a Search String:");

            Console.Write("\n>>:");

            string strSearch = Console.ReadLine();
            List<Account> results = new List<Account>();

            //Search by Number, fully
            //check that input can be understood as a number
            if (Int32.TryParse(strSearch, out int num))
            {
                Account account = accounts.SingleOrDefault(o => o.Number == num);
                if (account != null)
                {
                    results.Add(account);
                }
            }

            if (!String.IsNullOrEmpty(strSearch))
            {

                foreach (var account in accounts)
                {
                    //Search substring of Label
                    if (account.Label.Contains(strSearch))
                    {

                        results.Add(account);
                    }

                    //Search by Owner
                    if (Int32.TryParse(strSearch, out int ownerNumber) && account.Owner == ownerNumber)
                    {
                        results.Add(account);
                    }
                }

            }

            if (results.Count > 0)
            {
                DisplayAllAccounts(results, "VIEWING MATCHING ACCOUNTS");
            }
            else
            {
                Console.Write("\nNo Results\n");
            }

            GetNextSteps("SEARCH ALL", "Search Again");
        }

        private static void TransferMoney()
        {

            CreateSectionHeader("TRANSFER MONEY", 32, "Please enter the necessary information requested below: ");

            var transferInformation = RequestTransferInformation();

            if (transferInformation.isConfirmed)
            {
                //Get Information
                Account senderAccount = transferInformation.senderAccount;
                decimal amount = transferInformation.amount;
                Account recipientAccount = transferInformation.recipientAccount;

                //Get Index
                int senderIndex = accounts.FindIndex(a => a.Number == senderAccount.Number);
                int recipientIndex = accounts.FindIndex(a => a.Number == recipientAccount.Number);

                //Perform Transfer
                accounts[senderIndex].Balance -= amount;
                accounts[recipientIndex].Balance += amount;

                //Write File
                WriteJSON();

                Console.WriteLine("\n ... TRANSACTION SUCCESSFUL");
            }


            GetNextSteps("TRANSFER", "Make another Transfer");


        }

        private static void CreateNewAccount()
        {
            CreateSectionHeader("CREATE NEW ACCOUNT", 30, "Please input the necessary information:");

            var (isConfirmed, newAccount) = RequestNewAccountInformation();

            if (isConfirmed)
            {
                CreateSectionHeader("CREATE NEW ACCOUNT", 30, "Please input the necessary information:");

                accounts.Add(newAccount);

                //sort list again
                accounts = accounts.OrderBy(o => o.Number).ToList();

                WriteJSON();

                Console.WriteLine("--- New Account Created ---");
                CreateTableHead();
                CreateTableRow(newAccount);
            }


            GetNextSteps("CREATE NEW", "Create another account");
        }

        private static (bool isConfirmed, Account newAccount) RequestNewAccountInformation()
        {
            int number = 0;
            decimal balance = 0;
            string label = "";
            int owner = 0;
            Account new_account = null;
            bool isInfoPending = true;
            int infoRequestStage = 1;
            bool isConfirmed = false;
            while (isInfoPending)
            {
                switch (infoRequestStage)
                {
                    case 1:
                        var isNumberPending = true;
                        while (isNumberPending)
                        {
                            Console.Write("Enter Account Number >>:");
                            if (!Int32.TryParse(Console.ReadLine(), out number))
                            {
                                Console.WriteLine("That's not a number. Try Again.");


                            }
                            else
                            {
                                Account account = accounts.SingleOrDefault(o => o.Number == number);
                                if (account != null)
                                {
                                    Console.WriteLine("That account number is already in use. Choose another.");
                                }
                                else
                                {
                                    isNumberPending = false;
                                }

                            }
                        }

                        infoRequestStage = GetNextInfoRequestStage(2);

                        break;

                    case 2:
                        CreateSectionHeader("CREATE NEW ACCOUNT", 30, "Please input the necessary information:");
                        var isLabelPending = true;
                        while (isLabelPending)
                        {
                            Console.Write("Enter a Label For the Account (e.g. Salary) >>:");
                            var lbl = Console.ReadLine();
                            if (string.IsNullOrEmpty(lbl))
                            {
                                Console.WriteLine("Label can't be empty.");

                            }
                            else
                            {
                                label = lbl;
                                isLabelPending = false;

                            }
                        }

                        infoRequestStage = GetNextInfoRequestStage(3);

                        break;
                    case 3:
                        CreateSectionHeader("CREATE NEW ACCOUNT", 30, "Please input the necessary information:");
                        var isOwnerPending = true;
                        while (isOwnerPending)
                        {
                            Console.Write("Enter the Owner's ID (Only Integers are valid here e.g. 123456) >>:");

                            if (!Int32.TryParse(Console.ReadLine(), out owner))
                            {
                                Console.WriteLine("That's not a number. Try Again.");

                            }
                            else
                            {
                                isOwnerPending = false;

                            }
                        }

                        infoRequestStage = GetNextInfoRequestStage(4);
                        break;
                    case 4:
                        CreateSectionHeader("CREATE NEW ACCOUNT", 30, "Please input the necessary information:");
                        var isBalancePending = true;
                        while (isBalancePending)
                        {
                            Console.Write($"Enter the starting balance for account No. {number} >>:");

                            if (!Decimal.TryParse(Console.ReadLine(), out balance))
                            {
                                Console.WriteLine("That's not a number. Try Again.");

                            }
                            else
                            {
                                isBalancePending = false;

                            }
                        }

                        infoRequestStage = GetNextInfoRequestStage(5);
                        break;

                    case 5:
                        CreateSectionHeader("CREATE NEW ACCOUNT", 30, "Please review the new account details and confirm:");
                        new_account = new Account(number, balance, label, owner);
                        CreateTableHead();
                        CreateTableRow(new_account);
                        isConfirmed = PromptConfirmation("create the above account", "\n --- ACTION CANCELLED ---", "\n --- ACTION CONFIRMED ---");

                        isInfoPending = false;

                        break;
                    default:
                        isInfoPending = false;
                        break;

                }
            }



            return (isConfirmed, new_account);
        }

        private static (Account senderAccount, decimal amount, Account recipientAccount, bool isConfirmed) RequestTransferInformation()
        {
            Account senderAccount = null;
            decimal amount = 0;
            Account recipientAccount = null;
            bool isConfirmed = false;

            bool isInfoPending = true;
            int infoRequestStage = 1;
            while (isInfoPending)
            {
                switch (infoRequestStage)
                {
                    case 1:
                        //ask for sender account
                        senderAccount = RequestAccountNumber("Sender");
                        Console.WriteLine("\nAccount Found:");
                        CreateTableHead();
                        CreateTableRow(senderAccount);

                        infoRequestStage = GetNextInfoRequestStage(2);

                        break;
                    case 2:
                        //ask for amount to be sent
                        CreateSectionHeader("TRANSFER MONEY", 32, "Please enter the necessary information requested below: ");
                        bool isAmountPending = true;
                        while (isAmountPending)
                        {
                            Console.Write("\nEnter Amount To Be Transferred>>: ");
                            Decimal.TryParse(Console.ReadLine(), out decimal number);
                            decimal remainingAmount = senderAccount.Balance - number;

                            if (remainingAmount >= 0)
                            {
                                amount = number;
                                isAmountPending = false;
                                Console.WriteLine($"\nAmount to be transferred: {amount}");
                            }
                            else
                            {
                                Console.WriteLine("Insufficient Funds.");
                            }

                        }

                        infoRequestStage = GetNextInfoRequestStage(3);

                        break;
                    case 3:
                        //ask for recipients account
                        CreateSectionHeader("TRANSFER MONEY", 32, "Please enter the necessary information requested below: ");
                        recipientAccount = RequestAccountNumber("Recipient");
                        Console.WriteLine("\nAccount Found:");
                        CreateTableHead();
                        CreateTableRow(recipientAccount);
                        infoRequestStage = GetNextInfoRequestStage(4);
                        break;

                    case 4:
                        //Confirmation
                        CreateSectionHeader("TRANSFER MONEY", 32, "Please review the transaction details: ");
                        Console.WriteLine("\n   TRANSACTION OVERVIEW:");
                        Console.WriteLine
                        (

                              "   _______________________________\n" +
                            $"\n   Sender:{senderAccount.Owner} " +
                            $"\n   Sender Account:{senderAccount.Number} " +
                            "\n   -------------------------------" +
                            $"\n   Amount:{amount:00.00} " +
                            "\n   -------------------------------" +
                            $"\n   Recipient:{recipientAccount.Owner} " +
                            $"\n   Recipient Account:{recipientAccount.Number} " +
                            "\n   _______________________________"
                        );

                        isConfirmed = PromptConfirmation("perform the above transaction", "\n-- TRANSACTION CANCELLED --", "\n-- TRANSACTION CONFIRMED --\n");

                        isInfoPending = false;
                        break;

                    default:
                        CreateSectionHeader("TRANSFER MONEY", 32, "");
                        isInfoPending = false;
                        break;
                }
            }

            return (senderAccount, amount, recipientAccount, isConfirmed);
        }

        private static bool PromptConfirmation(string action, string no_case, string yes_case)
        {
            bool isConfirmed = false;
            ConsoleKey response;
            do
            {
                Console.Write($"\nAre you sure you want to {action}? [y/n] ");
                response = Console.ReadKey(false).Key;
                if (response != ConsoleKey.Enter)
                    Console.WriteLine();

            } while (response != ConsoleKey.Y && response != ConsoleKey.N);

            if (response == ConsoleKey.N)
            {
                Console.WriteLine(no_case);

            }
            else
            {
                Console.WriteLine(yes_case);
                isConfirmed = true;
            }

            return isConfirmed;
        }

        private static int GetNextInfoRequestStage(int nextStage)
        {
            int next = 0;
            Console.WriteLine("Press [Enter] to Continue, or [x] to cancel transaction:");
            ConsoleKey key = Console.ReadKey(false).Key;
            if (key == ConsoleKey.Enter)
            {
                Console.WriteLine("User pressed enter!");
                next = nextStage;

            }
            else if (key == ConsoleKey.X)
            {
                Console.WriteLine("User did not press enter.");

            }

            return next;
        }

        private static Account RequestAccountNumber(string type)
        {
            Account account = null;
            bool isAccountPending = true;
            while (isAccountPending)
            {
                Console.Write($"\nEnter {type}'s Account Number>>:");
                Int32.TryParse(Console.ReadLine(), out int number);

                var (isValid, validatedAccount) = IsAccountValid(number);

                if (isValid)
                {
                    account = validatedAccount;
                    isAccountPending = !isValid;
                }

            }

            return account;
        }

        private static (bool isValid, Account validatedAccount) IsAccountValid(int number)
        {
            bool isValid = false;

            //search in our json db
            Account validatedAccount = accounts.SingleOrDefault(o => o.Number == number);


            if (validatedAccount == null)
            {
                Console.WriteLine("\nWe can't find that account in our system. Try again.\n");
            }
            else
            {
                isValid = true;
            }

            return (isValid, validatedAccount);
        }

        private static void GetNextSteps(string origin, string message)
        {
            Console.WriteLine($"0) {message}");
            Console.WriteLine("1) Go Back to Main Menu\n");
            Console.Write("\n>>:");
            Int32.TryParse(Console.ReadLine(), out int input);

            bool pendingInput = true;

            while (pendingInput)
            {
                switch (input)
                {
                    //SEARCH AGAIN
                    case 0:
                        pendingInput = false;

                        if (string.Equals(origin, "SEARCH ALL"))
                        {
                            SearchAccounts();
                        }
                        else if (string.Equals(origin, "SEARCH SPECIFIC"))
                        {
                            DisplaySpecificAccount();
                        }
                        else if (string.Equals(origin, "TRANSFER"))
                        {
                            TransferMoney();
                        }
                        else if (string.Equals(origin, "VIEW ALL"))
                        {
                            SearchAccounts();
                        }
                        else if (string.Equals(origin, "CREATE NEW"))
                        {
                            CreateNewAccount();
                        }

                        break;

                    //BACK TO MAIN
                    case 1:
                        pendingInput = false;
                        DisplayMainMenu();
                        break;

                    //WRONG INPUT
                    default:
                        Console.WriteLine("Please input the number relevant to the desired option, i.e. '0' for another search or '1' to go back to main");
                        Console.Write("\n>>:");
                        Int32.TryParse(Console.ReadLine(), out input);
                        break;
                }
            }
        }

        public static string GetParent(string parentName, string FileName)
        {
            var dir = new DirectoryInfo(System.IO.Directory.GetCurrentDirectory());

            while (dir.Parent.Name != parentName)
            {
                dir = dir.Parent;
            }
            return dir.Parent.FullName + "\\data\\" + FileName;
        }
    }
}

