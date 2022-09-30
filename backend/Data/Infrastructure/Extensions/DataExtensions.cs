using System.Text;
using Data.EFContext;
using Newtonsoft.Json;

namespace Data.Infrastructure.Extensions
{
    public static class DataExtensions
    {
        public static object GetPropValue(this object src, string propName)
            => src.GetType().GetProperty(propName)?.GetValue(src);

        public static T Clone<T>(this T source)
        {
            var serialized = JsonConvert.SerializeObject(source,
                new JsonSerializerSettings()
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
            return JsonConvert.DeserializeObject<T>(serialized);
        }

        public static List<Variance> DetailedCompare<T>(this T original, T updated)
        {
            var variances = new List<Variance>();
            var fi = original.GetType().GetProperties();
            foreach (var f in fi)
            {
                var v = new Variance();
                v.Prop = f.Name;
                v.Before = f.GetValue(original);
                v.After = f.GetValue(updated);

                if (v.Before != null && v.After != null && !v.Before.Equals(v.After))
                {
                    variances.Add(v);
                }
            }
            return variances;
        }

        public static string RandomString(int length)
        {
            var random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            return new string(Enumerable.Repeat(chars, length).Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public static string TransformHostNameFromUrl(string url)
        {
            var myUri = new UriBuilder(url).Uri;
            string host = myUri.Host;

            // remove www
            host = host.Replace("www.", "");
            host = host.Replace(".", "-");

            return host;
        }

        public static string GetBasicAuthString(string login, string pass)
        {
            return Convert.ToBase64String(Encoding.GetEncoding("ISO-8859-1").GetBytes(login + ":" + pass));
        }

        public static bool IsBase64(this string base64String)
        {
            // Credit: oybek https://stackoverflow.com/users/794764/oybek
            if (String.IsNullOrEmpty(base64String) || base64String.Length % 4 != 0
                                                   || base64String.Contains(" ") || base64String.Contains("\t") || base64String.Contains("\r") || base64String.Contains("\n"))
            { return false; }

            try
            {
                Convert.FromBase64String(base64String);
                return true;
            }
            catch (Exception exception)
            {
                // Handle the exception
            }
            return false;
        }


        public static void TryUpdateManyToMany<T, TKey>(this AppDbContext db, IEnumerable<T> currentItems, IEnumerable<T> newItems, Func<T, TKey> getKey) where T : class
        {
            db.Set<T>().RemoveRange(currentItems.Except(newItems, getKey));
            db.Set<T>().AddRange(newItems.Except(currentItems, getKey));
        }

        public static IEnumerable<T> Except<T, TKey>(this IEnumerable<T> items, IEnumerable<T> other, Func<T, TKey> getKeyFunc)
        {
            return items
                .GroupJoin(other, getKeyFunc, getKeyFunc, (item, tempItems) => new { item, tempItems })
                .SelectMany(t => t.tempItems.DefaultIfEmpty(), (t, temp) => new { t, temp })
                .Where(t => ReferenceEquals(null, t.temp) || t.temp.Equals(default(T)))
                .Select(t => t.t.item);
        }
    }

    public static class DateTimeExtensions
    {
        public static DateTime? SetKindUtc(this DateTime? dateTime)
        {
            if (dateTime.HasValue)
            {
                return dateTime.Value.SetKindUtc();
            }
            else
            {
                return null;
            }
        }
        public static DateTime SetKindUtc(this DateTime dateTime)
        {
            if (dateTime.Kind == DateTimeKind.Utc) { return dateTime; }
            return DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
        }
    }

    public class Variance
    {
        public string Prop { get; set; }
        public object Before { get; set; }
        public object After { get; set; }
    }
}
