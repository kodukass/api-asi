namespace rest_api_dotnet.Models
{
    public class Greetings
    {
        public int Id { get; set; }
        public string Recipient { get; set; } = String.Empty;
        public string Message { get; set; } = String.Empty;
        public string Sender { get; set; } = String.Empty;
    }
}
