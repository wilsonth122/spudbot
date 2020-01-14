const db = require("../libs/db.js");
const parser = require("../libs/parser.js");

const message = controller => {
  controller.hears([":spud:"], ["message"],
    async(bot, message) => {
      let spudsGiven = parser.findSpuds(message.text);
      let userIDs = parser.findUserIDs(message.text);

      if(userIDs) {
        userIDs.forEach((userID) => {
          db.updateUserSpuds(userID, spudsGiven)
        })

        userIDs = parser.parseUserHandles(userIDs)

        await bot.startPrivateConversation(message.user)
        await bot.reply(message, "You just gave *" + spudsGiven + "* spud(s) to *" + userIDs.join(", ") + "*")
      }
      else {
        await bot.startPrivateConversation(message.user)
        await bot.reply(message, "You haven't mentioned a user(s) to give a spud to!")
        await bot.reply(message, `
You haven't mentioned a user(s) to give a spud to!
Try: :spud: <@${message.user}>
        `)
      }
    }
  );
};

const reaction = controller => {
  controller.on("reaction_added", async(bot, message) => {
    if(message.reaction === "spud") {
      db.updateUserSpuds(message.item_user, 1)

      await bot.startPrivateConversation(message.user)
      await bot.reply(message, `You just gave a spud to *<@${message.item_user}>*`)
    }
  });

  controller.on("reaction_removed", async(bot, message) => {
    if(message.reaction === "spud") {
      db.updateUserSpuds(message.item_user, -1)

      await bot.startPrivateConversation(message.user)
      await bot.reply(message, `You just removed a spud from *<@${message.item_user}>*`)
    }
  });
}

const score = controller => {
  controller.hears(
    ["score", "ranking", "leaderboard"],
    ["direct_mention", "direct_message"],
    async(bot, message) => {
      let users = await db.getAllSpuds()

      if (users && users.length > 0) {
        let ranked = users.sort((a, b) => b.score - a.score);
        let sentences = ranked.map(
          (user, index) => `<@${user._id}> is n°${index + 1} with *${user.score}* spud(s)`
        );
        
        await bot.reply(message, sentences.join("\n"));
      }
      else {
        await bot.reply(message, "Error fetching the current score - everyone's a winner!");
      }
    }
  );
};

const left = controller => {
  controller.hears(
    ["left", "how much", "how many"],
    ["direct_message"],
    async(bot, message) => {
      await bot.reply(message, "Give as many as you want, I don't care, I'm in beta!");
    }
  );
};

const help = controller => {
  controller.hears(
    ["help", "command", "commands", "feature", "features"],
    ["direct_message"],
    async(bot, message) => {
      await bot.reply(
        message,
        `
In public channels, just ping someone and add the :spud: emoji next to his name.
You can ask me how many :spud: you have left but in direct message:
Just ask me \`left\` (or \`how many\`; \`how much\`)

If you want to know the ranking, ask me \`score\`, \`ranking\` or \`leaderboard\`
        `
      );
    }
  );
};

const mention = controller => {
  controller.on('direct_mention', async(bot, message) => {
    await bot.reply(message, `
*Spud Fact Time*
The ultimate origin of the word spud isn’t known. 
It first appeared in English around 1440 and referred to a short dagger, possibly from the Dutch spyd, the Old Norse spjot (spear), or the Latin spad (sword). 
Whatever the case, after the 15th century, the meaning of the word expanded: Instead of referring just to “a short dagger,” a spud could be one of various types of digging 
implements—and, eventually, referred to those tubers we all know and love.
      `
    );
  });
};

module.exports = function(controller) {
  message(controller);
  reaction(controller);
  score(controller);
  left(controller);
  help(controller);
  mention(controller);
}