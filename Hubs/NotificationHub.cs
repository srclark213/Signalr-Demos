using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalrDemo.Hubs
{
    public class NotificationHub : Hub
    {
        public override async Task OnConnectedAsync()
        {
            Random rnd = new Random();
            var group = rnd.Next(1,5);
            
            await Groups.AddToGroupAsync(Context.ConnectionId, group.ToString());

            await Clients.Client(Context.ConnectionId).SendAsync("GroupAssigned", group);
        }

        public async Task SendNotification(string message)
        {
            await Clients.All.SendAsync("SendNotification", message);
        }

        public async Task SendGroupNotification(string message, string group)
        {
            await Clients.Group(group).SendAsync("SendNotification", message);
        }

        public async Task SendToast(string message)
        {
            await Clients.All.SendAsync("SendToast", message);
        }

        public async Task SendGroupToast(string message, string group)
        {
            await Clients.Group(group).SendAsync("SendToast", message);
        }
    }
}