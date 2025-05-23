﻿

namespace Webshop.App.src.main.Models.Responses;

public class UserResponseData
{
    public int id { get; set; }
    
    public string email { get; set; }
    
    public string display_name { get; set; }
    
    
    public UserResponseData(User user)
    {
        try
        {
            id = user.CustomerId;
            email = user.Email;
            display_name = user.DisplayName;
        }
        catch (Exception e)
        {
            throw new Exception("No logged in user: " + e.Message);
        }
    }
}