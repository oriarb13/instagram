//initials for avatars
function stringAvatar(name) {
    if (!name) return { children: "?" };
    const nameParts = name.split(" ");
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${nameParts[0][0]}${nameParts[1]?.[0] || ""}`.toUpperCase(),
    };
}
//avatar color
function stringToColor(string) {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = "#";
    for (let i = 0; i < 3; i++) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
}

export { stringAvatar };
