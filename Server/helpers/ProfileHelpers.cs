namespace Server.Helpers;

using Server.Data.Models;

public static class ProfileHelper
{
    public static Avatar MakeDefaultProfileAvatar(List<Profile> TakenProfiles)
    {
        if (TakenProfiles.Count() >= 8)
        {
            return null;
        }

        var possibleAvatars = new List<Avatar>();
        possibleAvatars.Add(new Avatar { Icon = "🐥", Color = "#fcd933" });
        possibleAvatars.Add(new Avatar { Icon = "🦊", Color = "#ff7e46" });
        possibleAvatars.Add(new Avatar { Icon = "🐙", Color = "#cd5d6f" });
        possibleAvatars.Add(new Avatar { Icon = "🐋", Color = "#99adfc" });
        possibleAvatars.Add(new Avatar { Icon = "🦄", Color = "#c57bed" });
        possibleAvatars.Add(new Avatar { Icon = "🐷", Color = "#fc99c3" });
        possibleAvatars.Add(new Avatar { Icon = "🦉", Color = "#7c5751" });
        possibleAvatars.Add(new Avatar { Icon = "🐸", Color = "#6cfcb2" });

        foreach (var p in TakenProfiles)
        {
            possibleAvatars.Remove(possibleAvatars.Find(a => a.Icon.ToLower() == p.Avatar.Icon.ToLower()));
        }

        var random = new Random();
        var randomAvatar = possibleAvatars[random.Next(0, possibleAvatars.Count())];

        return randomAvatar;
    }
}