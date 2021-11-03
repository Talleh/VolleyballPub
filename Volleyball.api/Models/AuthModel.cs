using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace Volleyball.api.Models
{
    public class AuthResult
    {
        private AuthResult()
        {

        }

        public HttpStatusCode Code { get; set; }
        public bool Succeeded { get; set; }
        public string Error { get; set; }
        public string AccessToken { get; set; }
        public int Id { get; set; }

        public static AuthResult Failed(string error)
        {
            return new AuthResult
            {
                Code = HttpStatusCode.BadRequest,
                Error = error
            };
        }

        public static AuthResult Succeded(string token, int id)
        {
            return new AuthResult
            {
                Code = HttpStatusCode.OK,
                Succeeded = true,
                AccessToken = token,
                Id = id
            };
        }
    }
}
