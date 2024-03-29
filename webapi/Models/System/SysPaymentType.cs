namespace webapi.Models.System
{
    public class SysPaymentType
    {
        public int Id { get; set; }
        public required string PaymentType { get; set; }
        public Int16 Code { get; set; }
    }
}
