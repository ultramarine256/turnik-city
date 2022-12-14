using Data;

namespace Domain.Services.Email.Models
{
    public class DoodleEmailData
    {
        public string Title { get; set; }
        public string Hash { get; set; }
        public string ReceivedDateTimeStr { get; set; }
        public VehicleData Vehicle { get; set; }
        public CustomerData Customer { get; set; }
        public BookingData Booking { get; set; }
        public DealerData Dealer { get; set; }
        public string VehicleStickerUrl { get; set; }
        public string WelcomeStickerUrl { get; set; }

        public DoodleEmailData()
        {
            Vehicle = new VehicleData();
            Customer = new CustomerData();
            Booking = new BookingData();
            Dealer = new DealerData();
        }

        public object AsSendGridObject(string templateType)
        {
            var result =
            new
            {
                template = new
                {
                    dealer = EMAIL_TEMPLATE.DEALER == templateType,
                    customer = EMAIL_TEMPLATE.CUSTOMER == templateType,
                    expert = EMAIL_TEMPLATE.EXPERT == templateType,
                },

                title = Title.ClearString(),

                vehicle = Vehicle != null ? new
                {
                    title = Vehicle.Title,
                    pageUrl = Vehicle.PageUrl,
                    imageUrl = Vehicle.ImageUrl,
                    vin = Vehicle.Vin,
                    stock = Vehicle.Stock,
                    year = Vehicle.Year,
                    make = Vehicle.Make,
                    model = Vehicle.Model
                } : null,

                customer = Customer != null ? new
                {
                    name = $"{Customer.FirstName} {Customer.LastName}",
                    email = Customer.Email,
                    phone = Customer.Phone,
                    comment = Customer.Comment,
                    guests = Customer.GuestEmails
                } : null,

                booking = Booking != null ? new
                {
                    dateTime = Booking.DateTime,
                    expert = new
                    {
                        name = Booking.ExpertName,
                        email = Booking.ExpertEmail,
                        phone = Booking.ExpertPhone,
                    },
                    beverage = new
                    {
                        title = Booking.BeverageName,
                        imageUrl = ""
                    },
                    route = new
                    {
                        title = Booking.RouteName,
                        imageUrl = ""
                    },
                    service = Booking.ServiceInfo?.Items.Count > 0 ? new
                    {
                        title = string.IsNullOrEmpty(Booking.ServiceInfo?.Title) ? "Services" : Booking.ServiceInfo.Title,
                        items = Booking.ServiceInfo.Items.Select(r => ValueAndComment(r.Name, r.Comment)).ToList()
                    } : null,
                    delivery = new
                    {
                        isUsed = Booking.IsVehicleDelivery,
                        address = Booking.DeliveryAddress
                    }
                } : null,

                dealer = Dealer != null ? new
                {
                    name = Dealer.Name,
                    address = Dealer.Address,
                    phone = Dealer.Phone,
                    siteUrl = Dealer.SiteUrl
                } : null,

                vehicleStickerUrl = VehicleStickerUrl,
                welcomeStickerUrl = WelcomeStickerUrl,
                surveyUrl = $"https://app.vipdrv.net/public/survey/{Hash}"
            };

            return result;
        }

        private string ValueAndComment(string value, string comment)
            => string.IsNullOrEmpty(comment) ? value : $"{value} ({comment})";

        public class VehicleData
        {
            public string Title { get; set; }
            public string PageUrl { get; set; }
            public string ImageUrl { get; set; }

            public string Vin { get; set; }
            public string Stock { get; set; }
            public string Year { get; set; }
            public string Make { get; set; }
            public string Model { get; set; }
            public string Condition { get; set; }
        }

        public class CustomerData
        {
            public string FirstName { get; set; }
            public string LastName { get; set; }
            public string Email { get; set; }
            public string Phone { get; set; }
            public string Comment { get; set; }
            public IList<string> GuestEmails { get; set; }
        }

        public class BookingData
        {
            public string DateTime { get; set; }
            public string ExpertName { get; set; }
            public string ExpertEmail { get; set; }
            public string ExpertPhone { get; set; }
            public string ExpertCrmId { get; set; }
            public string BeverageName { get; set; }
            public string RouteName { get; set; }
            public Service ServiceInfo { get; set; }

            public IList<MusicTrack> MusicTracks { get; set; }

            public bool IsVehicleDelivery { get; set; }
            public string DeliveryAddress { get; set; }

            public BookingData()
            {
                ServiceInfo = new Service();
            }

            public class MusicTrack
            {
                public string Title { get; set; }
            }

            public class ServiceItem
            {
                public string Name { get; set; }
                public string Comment { get; set; }
            }

            public class Service
            {
                public string Title { get; set; }
                public IList<ServiceItem> Items { get; set; }
            }
        }

        public class DealerData
        {
            public string Name { get; set; }
            public string Address { get; set; }
            public string Phone { get; set; }
            public string SiteUrl { get; set; }
        }
    }

    public class EMAIL_CONSTANTS
    {
        public const string EMAIL_FROM = "dude@doodle.com";
        public const string DEALER_NAME = "MyDealer";
    }

    public class EMAIL_TEMPLATE
    {
        public const string CUSTOMER = "customer";
        public const string DEALER = "dealer";
        public const string EXPERT = "expert";
    }
}
