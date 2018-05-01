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

    if (command ==='help'){
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

    if (command ==='game'){ 
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

    if (command === "dice") { // Commande de Dice
        randnum  = random(1, 6); // On choisi un numéro random entre 1 et 6

        if (randnum ==6) { // Si le numéro est 6
            message.reply("6 ! C'est Gagné, Quelle chance ! :game_die:") // L'utilisateur à gagné
            console.log(randnum) // On log le numéro
        }
        if (randnum ==5) { // Si le numéro est 5
            message.reply("5 ! Tu y est presque ! Courage ! :game_die:") // L'utilisateur perd
            console.log(randnum) 
        }
        if (randnum ==4) {  // Si le numéro est 4
            message.reply("4 ! Pas mal ! Tu peux mieux faire ! :game_die:") // L'utilisateur perd
            console.log(randnum) 
        }
        if (randnum ==3) {  // Si le numéro est 3
            message.reply("3 ! La moitié de 6, à moitié Gagné ! :game_die:") // L'utilisateur perd
            console.log(randnum) 
        }
        if (randnum ==2) {  // Si le numéro est 2
            message.reply("2 ! Pff ! Pas terrible ! :game_die:") // L'utilisateur perd
            console.log(randnum) 
        }
        if (randnum ==1) {  // Si le numéro est 1
            message.reply("1 ! C'est pas ton jour de chance toi ! :game_die:") // L'utilisateur perd
            console.log(randnum) 
        }
    }

    if (command === 'coinflip') { // Commande de coinflip
        randnum = random(1,2); // On choisi un numéro random entre 1 et 2
        
        if (randnum ==1) { // Si le numéro est 1
            message.reply("Pile !") // Alors le résultat sera Pile
        } else { // Sinon
            message.reply("Face !") // Le resultat sera Face
        }

    }

    if (command === "sondage") { // Commande de sondage 
        var array = message.content; /// On donne a ''array'' le contenu du message
        var arrayY = array.split(' '); // On sépare le contenu du message, on en fait un tableau
        delete arrayY[0]; // On suprimme le premier argument (commande)
        
        console.log(arrayY); // On log le tableau 
        console.log(arrayY.join(" ")); // On join tout les élements du tableau avec un espace
        
        message.delete() // Message de l'utilisateur suprimmé 
            return message.channel.sendMessage(arrayY.join(" ")).then(function (message) { // On renvoi le message de l'utilisateur 
                message.react("👍") // /// /// /// /// /// /// /// /////
                message.react("👎") // Et on réagis avec des émojis ///
             })
            

    }

    if (command === "choice") { // Commande qui effectue un choix aléatoirement entre deux propositions
        var messagetest = message.content; // On donne a "messagetest" le contenu du message
        var tableau = messagetest.split(' '); // On sépare le contenu du message, on en fait un tableau
        var choix1 = tableau[1]; // On donne a choix1 le premier argument (on ne veux pas la commande)
        var choix2 = tableau[3]; // On donne a choix2 le troisieme argument (on ne veux pas le or)

        if (choix1,choix2 === undefined) { // Si les arguments sont vides
            return message.reply('Tu as oublié des propositions :confused: \nLa commande a effectué est : **.choice proposition1 or proposition2**  :ok_hand:');
        } // On envoi un message a l'utilisateur pour lui demandé de mettre des choix

        randchoice = random(1,2); // On choisi un nombre aléatoire en 1 et 2

        if (randchoice == 1) { // Si le nombre est égale a 1 
            message.channel.sendMessage("Je choisis évidemment : " + choix1 + " :relieved:"); // Le bot choisira choix1
        } 
        if (randchoice == 2) { // Si le nombre est égale a 2 
            message.channel.sendMessage('Tu sais très bien que je choisis : ' + choix2 + " :wink:");  // Le bot choisira choix2
        }
    }

    if (command === "joke") { // Commande de blague aléatoire
        randjok = random(1,12) // On choisi un nombre aléatoire entre 1 et 12 (il y a 12 blagues)
        randphrase = random(1,8)
        
        console.log(randjok); // On log le nombre
        
        var phrase = db.get('')
        var jok = db.get(`jokes[${randjok}].jokes_value`).toString().value(); // On va chercher une blague qui correspond a "randjok" dans le fichier
        var debut = database.get(`phrase[${randphrase}].phrase_value`).toString().value();
        
        console.log(debut);
        console.log(jok); // On log la blague

        message.channel.sendMessage(`${debut} ${jok}`); // On envoi la blague
        return
    }

});
