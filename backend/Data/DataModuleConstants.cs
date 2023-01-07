using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Data
{
    internal class DataModuleConstants
    {
    }

    public static class StringExtensions
    {
        public static string ClearString(this string input)
            => String.IsNullOrEmpty(input) ? "" : (new Regex("[^a-zA-Z0-9 -]").Replace(input, "")).Trim();

        public static string SlugFromEmailString(string email)
            => email.Split("@")[0];
    }
}
