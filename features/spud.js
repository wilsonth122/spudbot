module.exports = function(controller) {
    // controller.hears(":spud:", "ambient", (bot, message) => {
    //     console.log("Handling spud...")
    //     const id = parser.findID(message.text);

    //     if (id !== null) {
    //         const ids = DB.getIDs();
    //         const userIndex = ids.indexOf(id);
    //         const senderIndex = ids.indexOf(message.user);
    //         const spudsGiven = parser.countSpuds(message.text);

    //         if (userIndex > -1) {
    //         console.log("User " + userIndex + " gave " + senderIndex + " " + spudsGiven + " spuds.")
    //         const giver = DB.getUser(senderIndex);

    //         if (giver.left >= spudsGiven) {
    //             spud.giveSpud(userIndex, spudsGiven);
    //             spud.removeLeft(senderIndex, spudsGiven);
    //             bot.api.reactions.add(
    //             {
    //                 timestamp: message.ts,
    //                 channel: message.channel,
    //                 name: "spud"
    //             },
    //             function(err, res) {
    //                 if (err) {
    //                 bot.botkit.log("Failed to add emoji reaction :(", err);
    //                 }
    //             }
    //             );
    //             bot.replyEphemeral(message, `You have ${giver.left} spuds left today.`)
    //         } else {
    //             bot.replyEphemeral(
    //             message,
    //             `Sorry <@${message.user}>, you only have ${giver.left} spuds remaning.. And you tried to give *${spudsGiven}*`
    //             );
    //         }
    //         }
    //     }
    // });

    // controller.hears(
    //     ["score", "ranking"],
    //     ["direct_mention", "direct_message"],
    //     (bot, message) => {
    //         const users = DB.getUsers();
    //         const ranked = users.sort((a, b) => b.spuds - a.spuds);
    //         const firsts = ranked.slice(0, 5).filter(u => u.spuds > 0);
    //         const sentences = firsts.map(
    //         (user, index) =>
    //             `<@${user.id}> is n°${index + 1} with *${user.spuds}* spuds`
    //         );
    //         bot.reply(message, sentences.join("\n"));
    //     }
    // );

    // controller.hears(
    //     ["left", "how much", "how many"],
    //     "direct_message",
    //     (bot, message) => {
    //         const ids = DB.getIDs();
    //         const userIndex = ids.indexOf(message.user);
    //         const user = DB.getUser(userIndex);
    //         bot.reply(message, `You have ${user.left} spuds left for today`);
    //     }
    // );

    controller.hears(
        ["help", "aide", "commands", "command"],
        ["direct_message", "direct_mention"],
        (bot, message) => {
          bot.reply(
            message,
            `
            In public channels, just ping someone and add the :potato: emoji next to his name.
            You can ask me how many :potato: you have left but in direct message:
            Just ask me \`left\` (or \`how many\`; \`how much\`)
            
            If you want to know the ranking, ask me \`score\` or \`ranking\`
            `
          );
        }
      );

}