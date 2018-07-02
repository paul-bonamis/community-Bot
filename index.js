//╔════════════════════════════════════════════════════════╗
//║                                                        ║  
//║            BOT DISCORD COMMUNAUTE BY @AIRKASS          ║
//║                                                        ║                 
//╚════════════════════════════════════════════════════════╝

const Discord = require("discord.js");
const client = new Discord.Client();
var dernierAppel = new Array();


// ⇉ CONFIGURATION
const token = "TOKEN123TOKEN123TOKEN123TOKEN123" // → TOKEN DU BOT

var prefix = "/"; // → PREFIX DU BOT

var cbienvenue = "451731223077978124"; // → ID DU SALON DE BIENVENUE

var pcolor = "#FEFEFE"; // → COULEUR PRIMAIRE (embed...)

var scolor = "#00B212"; // → COULEUR PRINCIPALEMENT VERT POUR TOUS LES SUCCES !

var ccolor = "#E24343"; // → COULEUR PRINCIPALEMNT ROUGE POUR TOUS LES "CANCEL" !

var ProfilGame = "Discord Bot By AirKass"; // → Le bot joue à ......

var ProfilStream = "https://twitch.tv/gotaga"; // → Le bot stream du ......

var autorole = "Membre" // → METTRE LE ROLE ICI (AUTO ROLE)

// ⇉ CONNECTION

client.on("ready", () => {;
var memberCount = client.users.size;
var servercount = client.guilds.size;
	var servers = client.guilds.array().map(g => g.name).join(',');
    console.log("===============CONNECTION=============");
    console.log("");
    console.log(`[!] Le bot ${client.user.tag} est prêt.`);
    console.log("");
    console.log(`[!] Invitation : https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
    console.log("");
    console.log("============CONFIGURATION=============");
    console.log("");
    console.log("[!] Couleur primaire : " + pcolor);
    console.log("");
    console.log("[!] Couleur Succes : " + scolor);
    console.log("");
    console.log("[!] Couleur Cancel : " + ccolor);
    console.log("");
    console.log("[!] Token : " + token);
    console.log("");
    console.log("[!] Salon de bienvenue : " + cbienvenue);
    console.log("");
    console.log("[!] Préfix : " + prefix);
    console.log("");
    console.log("[!] Le bot joue à : " + ProfilGame);
    console.log("");
    console.log("[!] Le bot stream : " + ProfilStream);
    console.log("");
    console.log("================STATS=================");
    console.log("");
    console.log("[!] Nombre de serveurs : " + servercount);
    console.log("");
    console.log("[!] Nombre d'utilisateur : " + memberCount);
    console.log("");
    console.log(`[!] Il est actuellement sur les serveurs suivants : ${client.guilds.map(c=>c.name).join(', ')}`);
    console.log("");
    console.log("======================================");
client.user.setStatus('Online')
client.user.setGame(ProfilGame, ProfilStream);
});

// ⇉ MESSAGE DE BIENVENUE / MESSAGE PRIVE
client.on('guildMemberAdd', member => {
    console.log("[+] " + member.user.username + " viens d'arriver sur le discord");
    var wel_embed = new Discord.RichEmbed()
     .setColor(pcolor)
     .setAuthor("Bienvenue sur le discord " + member.user.username, member.user.avatarURL)
    member.createDM().then(channel => {
        return channel.send(wel_embed);  
    }).catch(console.error)
    member.createDM().then(channel => {
        return channel.send(wel2_embed);  
    }).catch(console.error)


// ⇉ AUTO ROLE

    let role = member.guild.roles.find("name", autorole)
    member.addRole(role)

// ⇉ NOUVEAU MEMBRE SALON BIENVENUE
    var cwel_embed = new Discord.RichEmbed()
    .setColor(scolor)
    .setAuthor(member.user.username + " viens de rejoindre le discord !", member.user.avatarURL)
    .setTimestamp()
    .setFooter("Nouveau membre")
    member.guild.channels.get(cbienvenue).send(cwel_embed);
});

// ⇉ MEMBRE PARTI SALON BIENVENUE
client.on('guildMemberRemove', member => {
    console.log("[-] " + member.user.username + " viens de partir du discord !");
    var cbye_embed = new Discord.RichEmbed()
    .setColor(color)
    .setAuthor(member.user.username + " est parti du discord !", member.user.avatarURL)
    .setTimestamp()
    .setFooter("Membre parti")
    member.guild.channels.get(cbienvenue).send(cbye_embed);

});

// ⇉ MUTE / UNMUTE
client.on("message", (message) => {
    if(message.content.startsWith(prefix + "mute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRAROR")) return message.channel.send(":x: Vous n'avez pas la permission :x:");

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Je n'ai pas la permission :x:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
            message.channel.send(`${mute.user.username} est mute dans ce salon !`);

        })
    }
    if(message.content.startsWith(prefix + "unmute")) {
        if(!message.guild.member(message.author).hasPermission("ADMINISTRAROR")) return message.channel.send(":x: Vous n'avez pas la permission :x:");

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var mute = message.guild.member(message.mentions.users.first());
        if(!mute) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }

        if(!message.guild.member(client.user).hasPermission("ADMINISTRATOR")) return message.channel.send(":x: Je n'ai pas la permission :x:");
        message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
            message.channel.send(`${mute.user.username} n'est plus mute dans ce salon!`);

        })
    }

});

// ⇉ REPORT

client.on("message", (message) => {
	
	if(message.content.substring(0, 7) == prefix + "report")
	{
		var commande = message.content.split(" ");
		
		if(typeof commande[1] === 'undefined')
		{
			if(message.author.bot === false)
			{
				message.reply("**Aide pour la commande report :** \n\n Pour rapporter un ou plusieurs utilisateurs ayant un comportement inapproprié, mettre le nom ou les noms des utilisateurs après la commande report. \n\n Vous pouvez également rajouter une raison particulière avec l'attribut `-r:\"Votre raison\"`. \n\n Ne vous amusez pas à abuser cette commande à tout va, merci :wink: ! \n\n **Exemple 1 :** `/report @user` \n **Exemple 2 :** `/report @user1 @user2` \n **Exemple 3 :** `/report @user1 -r:\"Une raison\"`");
			}
		}
		else
		{
			var verifNom = true;
			var raisonSignalement = null;
			var inOptionRaison = false;
			
			for(var i = 1; i < commande.length; i++)
			{
				if(commande[i].charAt(1) !== "@")
				{
					if(commande[i].substring(0, 4) == "-r:\"")
					{
						raisonSignalement = commande[i].substring(3);
						inOptionRaison = true;
					}
					else
					{
						if(inOptionRaison == false)
						{	
							verifNom = false;
						}
						else
						{
							raisonSignalement = raisonSignalement + " " + commande[i];
						}
					}
				}
			}
			
			if(verifNom === true)
			{
				var aAppele = false;
				for(var i = 0; i < dernierAppel.length; i++)
				{
					if(dernierAppel[i][0] == message.author.id)
					{
						if((message.createdTimestamp - dernierAppel[i][1]) < 180000)
						{
							aAppele = true;
						}
						else
						{
							aAppele = false;
							dernierAppel.splice(i, 1);
						}
					}
				}
				
				if(aAppele == false)
				{
					dernierAppel.push([message.author.id, message.createdTimestamp]);
					
					var moderateurs = new Array();
					
					var sontAvertis = true;
					
					message.channel.guild.roles.forEach(function(role)
					{				
                        if (role.hasPermission('BAN_MEMBERS'))	
						{
							role.members.forEach(function(member)
							{
								var estDejaPrevenu = false;
								for(var j = 0; j < moderateurs.length; j++)
								{
									if(member == moderateurs[j])
									{
										estDejaPrevenu = true;
									}
								}
									
								if(estDejaPrevenu == false)
								{
									moderateurs.push(member);
								
									function timeConverter(timestamp)
									{
										var a = new Date(timestamp);
										var tabMois = ['Janv.','Févr.','Mars','Avri.','Mai.','Juin','Juil.','Août','Sept.','Octo.','Nove.','Déce.'];
										var annee = a.getFullYear();
										var mois = tabMois[a.getMonth()];
										var date = a.getDate();
										var heure = a.getHours();
										var min = a.getMinutes();
										var sec = a.getSeconds();
										var time = "le " + date + ' ' + mois + ' ' + annee + ' à ' + heure + 'h' + min + ':' + sec ;
										return time;
									}
									
									var MP = "Un rapport soumis " + timeConverter(message.createdTimestamp) + " par **" + message.author.username + "** a été effectué à l'encontre de ";
									
									message.mentions.users.forEach(function(user)
									{
										MP = MP + "@" + user.username + " ";
									});
									
									MP =  MP + "sur *" + member.guild.name + "/" + message.channel.name + "*";
									
									if(raisonSignalement != null)
									{
										MP = MP + " pour la raison suivante : *" + raisonSignalement + "*";
									}
									
									try
									{
										member.user.sendMessage(MP);
									}
									catch(e)
									{
										sontAvertis = false;
									}
								}
							});
						}
					});
					
					if(sontAvertis == true)
					{
                        var signembed = new Discord.RichEmbed()
                        .setColor('#00B212')
                        .addField(":white_check_mark: Signalement effectué !", "‏")
                        .setTimestamp()
                        message.channel.send(signembed)
                        message.author.createDM().then(channel => {
                            return channel.send(signembed);  
                        }).catch(console.error)
					}
				}
			}
		}
	}
});

// ⇉ STATS USER 

client.on('message', message => {
    if(message.content.startsWith(prefix + "mystats")) {
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
             .setColor(pcolor)
             .setThumbnail(message.author.avatarURL)
             .addField("Vous avez rejoint le: ", message.member.joinedAt)
        message.channel.send(embed);
        
    }
})

client.on("message", (message) => {
    if(message.content.startsWith(prefix + "stats")) {

        if(message.mentions.users.size === 0 ){
            return message.channel.send(":x: Vous devez mentioner un utilisateur ! :x:");
        }

        var statsuser = message.guild.member(message.mentions.users.first());

        if(!statsuser) {
            return message.channel.send(":x: Je n'ai pas trouver l'utilisateur ou il n'existe pas :x:");
        }
        
        var embed = new Discord.RichEmbed()
        .setAuthor(message.author.username, message.author.avatarURL)
        .setColor(pcolor)
        .setThumbnail(`https://airkass.s-ul.eu/tXvyh5Dz`)
        .addField(`${statsuser.user.username} a rejoint le:  `, statsuser.joinedAt)
        message.channel.send(embed);

    }

})

// ⇉ RANDOM (BONJOUR,SALUT..)
client.on('message', message => {

    if(message.content.toLowerCase().includes('bonjour')){
        random();

        if (randnum == 0){
            message.reply("Hey, je suis un bot !");
        }

        if (randnum == 1){
            message.reply("Hey ça roule ?");
        }

        if (randnum == 2){
            message.reply("Yoo");
        }

        if (randnum == 3){
            message.reply("Hey");
        }


    }
    if(message.content.toLowerCase().includes('salut')){
        random2();

        if (randnum == 0){
            message.reply("Hey, je suis un bot !");
        }

        if (randnum == 1){
            message.reply("Hey ça roule ?");
        }

        if (randnum == 2){
            message.reply("Yoo");
        }

        if (randnum == 3){
            message.reply("Hey");
        }

    }

});

function random2(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}

// ⇉ ANTI INSULTE, PUB...

client.on('message', message => {
    var i_embed = new Discord.RichEmbed()
    .setColor('#E24343')
    .addField(":warning: **Ton langage** " + message.author.username + " :warning:", "‏")
    .setTimestamp()

    var l_embed = new Discord.RichEmbed()
    .setColor('#E24343')
    .addField(":warning: **Pas de lien** " + message.author.username + " :warning:", "‏")
    .setTimestamp()

    var pub_embed = new Discord.RichEmbed()
    .setColor('#E24343')
    .addField(":warning: **Pas de pub** " + message.author.username + " :warning:", "‏")
    .setTimestamp()


    if(message.content.toLowerCase().includes('pute')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('connard')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('fdp')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('enculé')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('merde')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('fils de pute')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('porn')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('batard')){
        message.delete(message.author);
        message.channel.send(i_embed)
    }

    if(message.content.toLowerCase().includes('https://discord.gg/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
    }

    if(message.content.toLowerCase().includes('https://discord.me/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
    }

    if(message.content.toLowerCase().includes('https://discord.io/')){
        message.delete(message.author);
        message.channel.send(pub_embed)
    }

});


// ⇉ PURGE COMMANDE
client.on('message', message => {

    let msg = message.content.toUpperCase();
    let sender = message.author;
    let cont = message.content.slice(prefix.length).split(" ");
    let args = cont.slice(1);

    if (msg.startsWith(prefix + 'PURGE')) {
        console.log("[PURGE] " + message.author.username + " viens d'utiliser la cmd purge");
        async function purge() {
            message.delete();

            if (!message.member.roles.find("name", serveuradmin)) { 
                message.channel.send(':x: Tu as besoin du role' + serveuradmin + 'pour faire cette commande :x:');
                return; 
            }

            if (isNaN(args[0])) {
                message.channel.send(':x: Veuillez utiliser un nombre comme argument. :x: \n\nUtilisation: `/purge <nombre>`'); 
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); 

            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`:x: Erreur: ${error}`));

        }

        purge();

    }
});

// ⇉ COMMANDE ROLES (PC,XBOX..)
client.on('message', message => {
if (message.content === prefix + "pc"){
    if (message.member.roles.find("name", "🖥️ PC")) { 
    message.member.removeRole(message.guild.roles.find('name', '🖥️ PC'));
    var xbox_del = new Discord.RichEmbed()
     .setColor('#E24343')
     .setAuthor(message.author.username, message.author.avatarURL)
     .addField("Vous avez été retiré du role 🖥️ PC", "‏‏‏")
     .setTimestamp()
    message.channel.send(xbox_del)
    }else{
  message.member.addRoles(message.guild.roles.find('name', '🖥️ PC'))
      .then(console.log)
      .catch(console.error);
    var xbox_embed = new Discord.RichEmbed()
      .setColor('#00B212')
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("Vous avez été ajouté au rôle 🖥️ PC", "‏‏‏")
      .setTimestamp()
    message.channel.send(xbox_embed)
    }
} else if (message.content === prefix + "ps4"){
    if (message.member.roles.find("name", "🎮 PS4")) { 
    message.member.removeRole(message.guild.roles.find('name', '🎮 PS4'));
    var xbox_del = new Discord.RichEmbed()
     .setColor('#E24343')
     .setAuthor(message.author.username, message.author.avatarURL)
     .addField("Vous avez été retiré du role 🎮 PS4", "‏‏‏")
     .setTimestamp()
    message.channel.send(xbox_del)
    }else{
  message.member.addRoles(message.guild.roles.find('name', '🎮 PS4'))
      .then(console.log)
      .catch(console.error);
    var xbox_embed = new Discord.RichEmbed()
      .setColor('#00B212')
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("Vous avez été ajouté au rôle 🎮 PS4", "‏‏‏")
      .setTimestamp()
    message.channel.send(xbox_embed)
    }
} else if (message.content === prefix + "xbox"){
    if (message.member.roles.find("name", "💚 XBOX")) { 
    message.member.removeRole(message.guild.roles.find('name', '💚 XBOX'));
    var xbox_del = new Discord.RichEmbed()
     .setColor('#E24343')
     .setAuthor(message.author.username, message.author.avatarURL)
     .addField("Vous avez été retiré du role 💚 XBOX", "‏‏‏")
     .setTimestamp()
    message.channel.send(xbox_del)
    }else{
  message.member.addRoles(message.guild.roles.find('name', '💚 XBOX'))
      .then(console.log)
      .catch(console.error);
    var xbox_embed = new Discord.RichEmbed()
      .setColor('#00B212')
      .setAuthor(message.author.username, message.author.avatarURL)
      .addField("Vous avez été ajouté au rôle 💚 XBOX", "‏‏‏")
      .setTimestamp()
    message.channel.send(xbox_embed)
    }
// ⇉ EMBED REGLES
} else if (message.content === prefix + "regles"){
    message.delete(message.author);
        var regles_embed = new Discord.RichEmbed()
            .setColor(pcolor)
            .setThumbnail("https://image.com") // IMPORTANT METTRE IMAGE POUR DES REGLES
            .addField("• Règle du Discord", "‎‎‎Merci de bien vouloir lire attentivement ce salon avant de faire n'importe quoi sur le serveur, Tout manquements aux règles sera sanctionné.")
            .addField("‏", "→ La politesse est de mise, le respect également, veillez à rester courtois et polis envers tout le monde.")
            .addField("‏", "→ TOUT propos raciste, haineux, diffamatoire et tout type de message (incluant le troll) incitant à la haine est INTERDIT. Vous êtes l'unique responsable de vos messages.‎‎‎")
            .addField("‏", "‎‎‎→ Tout message à caractère pornographique, contenu choquant, haineux […] est interdit.")
            .addField("‏", "‎‎‎→ Le Discord  est un serveur vocal francophone, seul le français doit être utilisé.")
            .addField("‏", "‎‎‎→ Toutes publicités sont interdites sans l'autorisation. Aucun lien de serveur Discord doit apparaître.")
            .addField("‏", "→ Le recrutement de quoique soit pour une autre association ou organisme est interdit.‎‎‎")
            .addField("‏", "‎‎‎→ La vente et l'achat de comptes, services ou tout autres biens sont interdits.")
        message.channel.send(regles_embed);

// ⇉ EMBED RESAUX SOCIAUX
} else if (message.content === prefix + "social"){
    message.delete(message.author);
        var soc_embed = new Discord.RichEmbed()
            .setColor(pcolor)
            .setThumbnail("https://image.com") // IMPORTANT METTRE IMAGE POUR DES RESAUX SOCIAUX
            .addField("• Résaux Sociaux", "‎‎‎‏")
            .addField("⚪️ https://airkass.tk", "‏")
            .addField("🔵 https://twitter.com/airkass", "‏")
            .addField("🔴 contact@airkass.tk", "‏")
            message.channel.send(soc_embed);    
}

});

client.login(token)

//╔════════════════════════════════════════════════════════╗
//║                                                        ║  
//║            BOT DISCORD COMMUNAUTE BY @AIRKASS          ║
//║                                                        ║                 
//╚════════════════════════════════════════════════════════╝
