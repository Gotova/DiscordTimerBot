// Load up the discord.js library
const Discord = require("discord.js");


// This is your client. Some people call it `bot`, some people call it `self`, 
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values. 
const config = require("./config.json");
// config.token contains the bot's token
// config.prefix contains the message prefix.

process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', reason.stack || reason)
  // Recommended: send the information to sentry.io
  // or whatever crash reporting service you use
});

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot ist ne miese bitch, has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".
  client.user.setActivity(`Serving ${client.guilds.size} Timelines`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`Serving ${client.guilds.size} Timelines`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`Serving ${client.guilds.size} Timelines`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.
  
  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;
  
  if(message.content == "Roast Jan") {
    var rand = Math.floor((Math.random() * 5) + 1);
    console.log(rand);

    if (rand == 1) {
      const m = await message.channel.send("Alle Menschen werden geboren und sterben. Sie sind eingeschränkt von der Zeit. Nur.. Jan ist ziemlich eingeschränkt in so einigen Dingen..");
    } else if (rand == 2) {
      const m = await message.channel.send("Ich kann die Zukunft sehen und weiß trotzdem nicht ob Jan jemals aus Silber raus kommt..");
    } else if (rand == 3) {
      const m = await message.channel.send("Ich sollte Palkia fragen ob er Jan vielleicht in eine eigene Dimension stecken kann.. Zumindest muss ich ihn dann nicht mehr ertragen.");
    } else if (rand == 4) {
      const m = await message.channel.send("So langsam hab ich echt keine Lust mehr auf Jan. Ich sollte Arceus Gesellschaft leisten und einfach nur noch schlafen..");
    } else if (rand == 5) {
      const m = await message.channel.send("In einer nicht allzu fernen Zukunft wird Jan die ganze Zeit von Ibi weggeyeeted.");
    } else {
      console.log("Jan Roast funktioniert nicht");
    }
    
  }

  

  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;
  
  // Here we separate our "command" name, and our "arguments" for the command. 
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/#+/g);
  const command = args.shift().toLowerCase();
  
  // Let's go with a few common example commands! Feel free to delete or change those.

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }
  
  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
    // To get the "message" itself we join the `args` back into a string with spaces: 
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(O_o=>{}); 
    // And we get the bot to say the thing: 
    message.channel.send(sayMessage);
  }
  

  if(command === "timer") {
    try {
      console.log("Eins!");

      var Spiel = args[8];
      var Quelle = args[9];
      var Link = args[10];
      var Trailer = args[11];
      var Thumb = args[12];

      //const m = await message.channel.send("Preparing Timer..") ;
      const m = await message.channel.send({embed: {
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        } ,
        title: Spiel ,
        color: 0xE8800C,
        description: "**Preparing Timer..**"
      }}) ;
      message.channel.send("", {files: [Thumb]});

      var d = new Date();
      var StartTime = d.getTime();
      
      await m.react('👍').then(() => m.react('👎'));

      //Ausrechnen wann der Timer enden Soll
      var Zeit1 = parseInt(args[0], 10);
      var Zeit2 = parseInt(args[2], 10);
      var Zeit3 = parseInt(args[4], 10);
      var Zeit4 = parseInt(args[6], 10);

      if (isNaN(Zeit1) == true) {
        m.edit({embed: {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          } ,
          title: "**Eingabe Fehler**" ,
          color: 0xFF0000,
          description: "**Die eingegebenen Argumente entsprechen nicht den Rechtlinien. Bitte halte folgendes Format ein: > +Timer#Zeit1#Zeiteinheit1#Zeit2#Zeiteinheit2#Zeit3#Zeiteinheit3#Zeit4#Zeiteinheit4#Name des Spiels#Name der Quelle (z.b. Humble Bundle)#Link zum Angebot#Link zum Trailer oder Gameplay#Links zu nem Coverart oder Screenshot vom Spiel (Muss ein Bild sein) <**",
          timestamp: new Date(),
        }});
      }
      if (isNaN(Zeit2) == true) {
        m.edit({embed: {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          } ,
          title: "**Eingabe Fehler**" ,
          color: 0xFF0000,
          description: "**Die eingegebenen Argumente entsprechen nicht den Rechtlinien. Bitte halte folgendes Format ein: > +Timer#Zeit1#Zeiteinheit1#Zeit2#Zeiteinheit2#Zeit3#Zeiteinheit3#Zeit4#Zeiteinheit4#Name des Spiels#Name der Quelle (z.b. Humble Bundle)#Link zum Angebot#Link zum Trailer oder Gameplay#Links zu nem Coverart oder Screenshot vom Spiel (Muss ein Bild sein) <**",
          timestamp: new Date(),
        }});
      }
      if (isNaN(Zeit3) == true) {
        m.edit({embed: {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          } ,
          title: "**Eingabe Fehler**" ,
          color: 0xFF0000,
          description: "**Die eingegebenen Argumente entsprechen nicht den Rechtlinien. Bitte halte folgendes Format ein: > +Timer#Zeit1#Zeiteinheit1#Zeit2#Zeiteinheit2#Zeit3#Zeiteinheit3#Zeit4#Zeiteinheit4#Name des Spiels#Name der Quelle (z.b. Humble Bundle)#Link zum Angebot#Link zum Trailer oder Gameplay#Links zu nem Coverart oder Screenshot vom Spiel (Muss ein Bild sein) <**",
          timestamp: new Date(),
        }});
      }
      if (isNaN(Zeit4) == true) {
        m.edit({embed: {
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          } ,
          title: "**Eingabe Fehler**" ,
          color: 0xFF0000,
          description: "**Die eingegebenen Argumente entsprechen nicht den Rechtlinien. Bitte halte folgendes Format ein: > +Timer#Zeit1#Zeiteinheit1#Zeit2#Zeiteinheit2#Zeit3#Zeiteinheit3#Zeit4#Zeiteinheit4#Name des Spiels#Name der Quelle (z.b. Humble Bundle)#Link zum Angebot#Link zum Trailer oder Gameplay#Links zu nem Coverart oder Screenshot vom Spiel (Muss ein Bild sein) <**",
          timestamp: new Date(),
        }});
      }
      
      var Einheit1 = args[1];
      var Einheit2 = args[3];
      var Einheit3 = args[5];
      var Einheit4 = args[7];
      
      console.log("Zwei!");

      switch(Einheit1) {
        case "d":
          Zeit1 = Zeit1 * 24 * 60 * 60 * 1000;
          break;
        case "h":
          Zeit1 = Zeit1 * 60 * 60 * 1000;
          break;
        case "m":
          Zeit1 = Zeit1 * 60 * 1000;
          break;
        case "s":
          Zeit1 = Zeit1 * 1000;
          break;
        default:
          await m.edit({embed: {
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            } ,
            title: "**Etwas stimmt mit Einheit1 nicht.**" ,
            color: 0xff0000,
            description: "**Bitte benachrichtige Gotova um das Problem zu lösen.**",
            timestamp: new Date(),
          }});
      }
      
      switch(Einheit2) {
        case "d":
          Zeit2 = Zeit2 * 24 * 60 * 60 * 1000;
          break;
        case "h":
          Zeit2 = Zeit2 * 60 * 60 * 1000;
          break;
        case "m":
          Zeit2 = Zeit2 * 60 * 1000;
          break;
        case "s":
          Zeit2 = Zeit2 * 1000;
          break;
        default:
          await m.edit({embed: {
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            } ,
            title: "**Etwas stimmt mit Einheit2 nicht.**" ,
            color: 0xff0000,
            description: "**Bitte benachrichtige Gotova um das Problem zu lösen.**",
            timestamp: new Date(),
          }});
      }
      
      switch(Einheit3) {
        case "d":
          Zeit3 = Zeit3 * 24 * 60 * 60 * 1000;
          break;
        case "h":
          Zeit3 = Zeit3 * 60 * 60 * 1000;
          break;
        case "m":
          Zeit3 = Zeit3 * 60 * 1000;
          break;
        case "s":
          Zeit3 = Zeit3 * 1000;
          break;
        default:
          await m.edit({embed: {
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            } ,
            title: "**Etwas stimmt mit Einheit3 nicht.**" ,
            color: 0xff0000,
            description: "**Bitte benachrichtige Gotova um das Problem zu lösen.**",
            timestamp: new Date(),
          }});
      }
      
      switch(Einheit4) {
        case "d":
          Zeit4 = Zeit4 * 24 * 60 * 60 * 1000;
          break;
        case "h":
          Zeit4 = Zeit4 * 60 * 60 * 1000;
          break;
        case "m":
          Zeit4 = Zeit4 * 60 * 1000;
          break;
        case "s":
          Zeit4 = Zeit4 * 1000;
          break;
        default:
          await m.edit({embed: {
            author: {
              name: client.user.username,
              icon_url: client.user.avatarURL
            } ,
            title: "**Etwas stimmt mit Einheit4 nicht.**" ,
            color: 0xff0000,
            description: "**Bitte benachrichtige Gotova um das Problem zu lösen.**",
            timestamp: new Date(),
          }});
      }
      
      console.log("Drei!");
      var EndTime = StartTime + Zeit1 + Zeit2 + Zeit3 + Zeit4;
      
      //Jetzt erstellen wir die Nachricht die sich dauerhaft ändern soll!
    
      console.log("Vier!");
      var CurrentTime = d.getTime();

      var Tage = null;
      var Stunden = null;
      var Minuten = null;
      var Sekunden = null;

      var Upvote = null;
      var Downvote = null;
      var RatingNum = null;
      var Rating = null;
      var Ablaufzeit = null;

      const HalfHeartpiece = client.emojis.find(emoji => emoji.name === "HalfHeartpiece");
      const EmptyHeartpiece = client.emojis.find(emoji => emoji.name === "EmptyHeartpiece");
      const FullHeartpiece = client.emojis.find(emoji => emoji.name === "FullHeartpiece");

      for (var i = 0; i < (Math.floor((EndTime - CurrentTime) / 5000) + 2); i++) {
        (function (i) {

          setTimeout(function () {
            
            console.log("Im Loop Zwei!" + CurrentTime);

            var d = new Date();
            CurrentTime = d.getTime();

            Tage = Math.floor((EndTime - CurrentTime) / 1000 / 60 / 60 / 24);
            Stunden = Math.floor(((EndTime - CurrentTime) - (Tage * 86400000)) / 1000 / 60 / 60 );
            Minuten = Math.floor(((EndTime - CurrentTime) - (Tage * 86400000) - (Stunden * 3600000)) / 1000 / 60);
            Sekunden = Math.floor(((EndTime - CurrentTime) - (Tage * 86400000) - (Stunden * 3600000) - (Minuten * 60000)) / 1000);

            //Rating System -----------------------------------------------------------------------------
            Upvote = m.reactions.find(reaction => reaction.emoji.name === '👍').count;
            Downvote = m.reactions.find(reaction => reaction.emoji.name === '👎').count;

            RatingNum = Upvote / (Upvote + Downvote);
            

            if (RatingNum <= 0.091) {
              Rating = EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece;
            } else if ( RatingNum > 0.091 && RatingNum < 0.182) {
              Rating = HalfHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece;
            } else if (RatingNum >= 0.182 && RatingNum <= 0.273) {
              Rating = FullHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece;
            } else if (RatingNum > 0.273 && RatingNum <= 0.364) {
              Rating = FullHeartpiece+" "+HalfHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece;
            } else if (RatingNum > 0.364 && RatingNum <= 0.455) {
              Rating = FullHeartpiece+" "+FullHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece;
            } else if (RatingNum > 0.455 && RatingNum <= 0.546) {
              Rating = FullHeartpiece+" "+FullHeartpiece+" "+HalfHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece;
            } else if (RatingNum > 0.546 && RatingNum <= 0.637) {
              Rating = FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece+" "+EmptyHeartpiece+" "+EmptyHeartpiece;
            } else if (RatingNum > 0.637 && RatingNum <= 0.728) {
              Rating = FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece+" "+HalfHeartpiece+" "+EmptyHeartpiece;
            } else if (RatingNum > 0.728 && RatingNum <= 0.819) {
              Rating = FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece+" "+EmptyHeartpiece;
            } else if (RatingNum > 0.819 && RatingNum <= 0,91) {
              Rating = FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece+" "+HalfHeartpiece;
            } else if (RatingNum > 0.91 && RatingNum <= 1) {
              Rating = FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece+" "+FullHeartpiece;
            }
            //Rating System ------------------------------------------------------------------------------

            //Ablaufzeit ---------------------------------------------------------------------------------
            if ((EndTime - CurrentTime) >= 86400000) {
              Ablaufzeit = "Es verbleiben __**" + Tage + " Tage, " + Stunden + " Stunden, " + Minuten + " Minuten und " + Sekunden + " Sekunden**__ bis die Zeit abläuft.";
            } else if ((EndTime - CurrentTime) >= 3600000) {
              Ablaufzeit = "Es verbleiben __**" + Stunden + " Stunden, " + Minuten + " Minuten und " + Sekunden + " Sekunden**__ bis die Zeit abläuft.";
            } else if ((EndTime - CurrentTime) >= 60000) {
              Ablaufzeit = "Es verbleiben __**" + Minuten + " Minuten und " + Sekunden + " Sekunden**__ bis die Zeit abläuft.";
            } else if ((EndTime - CurrentTime) >= 1000) {
              Ablaufzeit = "Es verbleiben __**" + Sekunden + " Sekunden**__ bis die Zeit abläuft.";
            }
            //Ablaufzeit ---------------------------------------------------------------------------------

            if (CurrentTime < EndTime) {
              
              //m.edit(`Es verbleiben ${Tage} Tage, ${Stunden} Stunden, ${Minuten} Minuten und ${Sekunden} Sekunden bis der Timer abläuft. `);
              
              m.edit({embed: {
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                } ,
                title: "**" + Spiel + "**" ,
                color: 0x66c1dd,
                description: "**"+ Spiel + "** ist zur Zeit kostenlos auf " + Quelle + " zu erhalten! Klickt [__**Hier**__]("+ Link + ") um euch das Spiel abzuholen!",
                fields: [{
                  name: "Timer:",
                  value: Ablaufzeit
                },
                {
                  name:"Rating",
                  value: Rating,
                  inline: true
                },
                {
                  name: "Videos:",
                  value: "Um euch den **Trailer** anzusehen drückt bitte [__**Hier**__]("+ Trailer + ").",
                  inline: true
                },
                ],
                timestamp: new Date(),
              }});

            }

            //Zeit abgelaufen
            if (CurrentTime >= EndTime) {
              
              m.edit({embed: {
                author: {
                  name: client.user.username,
                  icon_url: client.user.avatarURL
                } ,
                title: "**" + Spiel + "**" ,
                color: 0x404040,
                description: "**"+ Spiel + "** ist zur Zeit kostenlos auf " + Quelle + " zu erhalten! Klickt [__**Hier**__]("+ Link + ") um euch das Spiel abzuholen!",
                fields: [{
                  name: "Timer:",
                  value: "Die Zeit ist abgelaufen."
                },
                {
                  name:"Rating",
                  value: Rating,
                  inline: true
                },
                {
                  name: "Videos:",
                  value: "Um euch den **Trailer** anzusehen drückt bitte [__**Hier**__]("+ Trailer + ").",
                  inline: true
                },
                ],
                timestamp: new Date(),
              }});
              
            }
            
            m.channel.fetchMessage(m.id).then(r => {
              return console.log(r.reactions.filter(a => a.emoji.name == '👎').map(reaction => reaction.count)[0]);
          });
            
          }, 5000*i);

        })(i);

      }
    } 
    catch (err) {
      console.log(err);
    }
  }
  
  
  if(command === "ban") {
    if(!message.member.roles.some(r=>["Admin"].includes(r.name)) )
      return message.reply("Sorry, you don't have permissions to use this!");
    
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable) 
      return message.reply("I cannot ban this user! Do they have a higher role? Do I have ban permissions?");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";
    
    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }
  
  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.
    
    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);
    
    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
  
});

client.login(process.env.config.token);

Promise.reject(new Error('This is fine Error 001'));
