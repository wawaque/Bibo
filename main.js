import { DESTRUCTION } from 'dns';

const Discord = require('discord.js');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('joke.json');
const phraseswag = new FileSync('debutphrase.json');
const db = low(adapter);
const database = low(phraseswag);

var phrasenb = database.get('phrase').map('phrase_value').value();
var jokesnb = db.get('jokes').map('jokes_values').value();
 
var bot = new Discord.Client();
var prefix = "."

bot.on('ready', () => {
    bot.user.setPresence({ game: {name : '.help | bot by Astros#5597'}});
    console.log("Le bot est bien connecté");
});

bot.login('NDM5NDU3MTUxNTUxNzk5MzA2.Dcef-w.N7XZexyU35T8vGHGiJ9l0eiL3YA');


function random(min, max) {
    return Math.floor(Math.random() * (max - min +1) + min);
}


bot.on("message", message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(message.author.bot) return;

    if (command ==='help'){ // Embed Liste commandes fini
        var help_embed = new Discord.RichEmbed()
        .setColor("B50000")
        .setTitle("Help :")
        .addField("Commandes diverses :", ".ping : Indique ton ping")
        .addField(".choice", "Choix aléatoire entre deux propositions")
        .addField("Jeu :", "insérez jeu")
        .addField("Jeu :", "insérez jeu")
        .addField("Jeu :", "insérez jeu")
        .addField("Jeu :", "insérez jeu")
        .addField("Listes des jeux :", ".game")
        .setFooter("By Astros#5597")
    message.author.sendEmbed(help_embed);
    }

    if (command ==='game'){ // Embed liste jeux fini
        var game_embed = new Discord.RichEmbed()
        .setColor("B50000")
        .setTitle("Jeux :")
        .addField(".dice :", " Dice : Jeu de dé")
        .addField(".coinflip", "Coinflip : Pile ou face")
        .addField("Jeu :", "insérez jeu")
        .addField("Jeu :", "insérez jeu")
        .addField("Jeu :", "insérez jeu")
        .setFooter("By Astros#5597")
    message.author.sendEmbed(game_embed);
    }

    if (command === "dice") { // Commande finie
        randnum  = random(1, 6); 

        if (randnum ==6) { 
            message.reply("6 ! C'est Gagné, Quelle chance ! :game_die:") 
            console.log(randnum) 
        }
        if (randnum ==5) { 
            message.reply("5 ! Tu y est presque ! Courage ! :game_die:") 
            console.log(randnum) 
        }
        if (randnum ==4) {  
            message.reply("4 ! Pas mal ! Tu peux mieux faire ! :game_die:")     
            console.log(randnum) 
        }
        if (randnum ==3) {  
            message.reply("3 ! La moitié de 6, à moitié Gagné ! :game_die:") 
            console.log(randnum) 
        }
        if (randnum ==2) {  
            message.reply("2 ! Pff ! Pas terrible ! :game_die:") 
            console.log(randnum) 
        }
        if (randnum ==1) {  
            message.reply("1 ! C'est pas ton jour de chance toi ! :game_die:") 
            console.log(randnum) 
        }
    }

    if (command === 'coinflip') {
        randnum = random(1,2);
        
        if (randnum ==1) { 
            message.reply("Pile !") 
        } else { 
            message.reply("Face !") 
        }

    }

    if (command === "sondage") { // Commande finie
        var array = message.content; 
        var arrayY = array.split(' '); 
        delete arrayY[0]; 
        
        console.log(arrayY); 
        console.log(arrayY.join(" ")); 
        
        message.delete() 
            return message.channel.sendMessage(arrayY.join(" ")).then(function (message) {  
                message.react("👍") 
                message.react("👎") 
             })
            

    }

    if (command === "choice") { // Commande finie ( seulement 2 propostions )
        var messagetest = message.content; 
        var tableau = messagetest.split(' '); 
        var choix1 = tableau[1]; 
        var choix2 = tableau[3]; 

        if (choix1,choix2 === undefined) { 
            return message.reply('Tu as oublié des propositions :confused: \nLa commande a effectué est : **.choice proposition1 or proposition2**  :ok_hand:');
        } 

        randchoice = random(1,2); 

        if (randchoice == 1) { 
            message.channel.sendMessage("Je choisis évidemment : " + choix1 + " :relieved:"); 
        } 
        if (randchoice == 2) { 
            message.channel.sendMessage('Tu sais très bien que je choisis : ' + choix2 + " :wink:");
        }
    }

    if (command === "joke") { // Commande finie
        randjok = random(1,12) 
        randphrase = random(1,8)
        
        console.log(randjok); 
        
        var phrase = db.get('')
        var jok = db.get(`jokes[${randjok}].jokes_value`).toString().value();
        var debut = database.get(`phrase[${randphrase}].phrase_value`).toString().value();
        
        console.log(debut);
        console.log(jok); 

        message.channel.sendMessage(`${debut} ${jok}`); 
    }


    if (command === "avatar") {
    return message.reply("Tiens, voici ta photo de profil ! " + message.author.avatarURL);

    }

    if (command === 'info') { // Version non fini bug retour à la ligne
        var presend = message.author.presence.status
        console.log(presend)
        var info_embed = new Discord.RichEmbed()
        .setColor("00D1C6")
        .setTitle(":bust_in_silhouette: :" + message.author.username +  "#" + message.author.discriminator, " ")
        .addField(":id: : " + message.author.id," ")
        .addField("Crée le:  " + message.author.createdAt," ")
        .addField("Status : " + message.author.presence.status," ")
        .setFooter("By Astros#5597")
    message.channel.sendEmbed(info_embed);
    }

});
