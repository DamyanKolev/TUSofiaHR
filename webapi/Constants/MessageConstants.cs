namespace webapi.Constants
{
    public record MessageConstants
    {
        public const string MESSAGE_SUCCESS_SELECT = "Success selection";
        public const string MESSAGE_FAILED_SELECT = "Failed selection";

        public const string MESSAGE_SUCCESS_SIGN_IN = "Success sign in";
        public const string MESSAGE_FAILED_SIGN_IN = "Failed sign in";

        public const string MESSAGE_SUCCESS_REGISTRATION = "Success registration";
        public const string MESSAGE_FAILED_REGISTRATION = "Failed registration";

        public const string MESSAGE_INSERT_SUCCESS = "Successful insertion";
        public const string MESSAGE_INSERT_FAILED = "Failed insertion";
        public const string MESSAGE_UPDATE_SUCCESS = "Successful update";
        public const string MESSAGE_UPDATE_FAILED = "Failed update";
        public const string MESSAGE_DELETE_SUCCESS = "Successful deletion";
        public const string MESSAGE_DELETE_FAILED = "Failed deletion";

        public const string MESSAGE_USERNAME_EXIST = "User already exists!";
        public const string MESSAGE_REGISTRATION_FAILED = "User creation failed! Please check user details and try again.";

        public const string MESSAGE_VALID_TOKEN = "Token is valid!";
        public const string MESSAGE_INVALID_TOKEN = "Token is invalid!";
        public const string MESSAGE_NULL_TOKEN = "Token is null!";

        public const string MESSAGE_CREATE_CLAIM_FAILED = "Failed to create claim";

        public const string MESSAGE_RECORD_NOT_FOUND = "Record not found";
        public const string MESSAGE_USER_NOT_FOUND = "User not found";
        public const string MESSAGE_ROLE_NOT_FOUND = "Role not found";

        public const string MESSAGE_SUCCESS_ADD_USER_ROLE = "Role successfully added";
        public const string MESSAGE_FAILED_ADD_USER_ROLE = "Role failed added";

        public const string MESSAGE_REFRESH_TOKEN_FAILED = "Failed to refresh token";
        public const string MESSAGE_REFRESH_TOKEN_SUCCESS = "Success to refresh token";

        public const string END_MONTH_DATA_NOT_FILLED = "The monthly employee data has not been completed";
        public const string END_MONTH_DATA_IS_FILLED = "Monthly employee data has been completed";
    }
}
