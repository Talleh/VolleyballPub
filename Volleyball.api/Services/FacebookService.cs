using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Volleyball.api.Models;

namespace Volleyball.api.Services
{
    public class FacebookService : IFacebookService
    {
        private readonly HttpClient _client;
        public FacebookService()
        {
            _client = new HttpClient
            {
                BaseAddress = new Uri("https://graph.facebook.com/v10.0/")
            };
            _client.DefaultRequestHeaders
                .Accept
                .Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }


        public async Task<FacebookUser> GetUser(string facebookToken)
        {
            var result = await GetAsync<dynamic>(facebookToken, "me", "fields=email,first_name,last_name,picture");
            if (result == null)
            {
                throw new Exception("User from this token not exist");
            }

            var account = new FacebookUser
            {
                Email = result.email,
                FirstName = result.first_name,
                LastName = result.last_name,
                Picture = result.picture.data.url
            };

            return account;
        }

        private async Task<T> GetAsync<T>(string accessToken, string endpoint, string args = null)
        {
            var response = await _client.GetAsync($"{endpoint}?{args}&access_token={accessToken}");
            if (!response.IsSuccessStatusCode)
                return default;

            var result = await response.Content.ReadAsStringAsync();

            return JsonConvert.DeserializeObject<T>(result);
        }
    }
}
