try {
    var request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/740572933503582329/qP9xh4LXmXcAVhGoXQP2kyV9qAjcnTkpCPZ7e0MZBFuFa411uJvn3Wy49smPf5uAMI0J");
    request.setRequestHeader('Content-type', 'application/json');
    var CNT = `\`\`\`Access: ${new Date()} 
Page: ${window.location}\`\`\``
    var params = {
        username: "Siddhart.dev",
        avatar_url: "",
        content: CNT
    }
    request.send(JSON.stringify(params));
} catch {
    console.log("")
}