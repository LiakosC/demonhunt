game.preload = function() {
	var graphics = GRAPHICS_ROOT;
	var audio = AUDIO_ROOT;
	
	ph.load.image("empty", graphics + "/empty.png");
	ph.load.image("black", graphics + "/black.png");
	
	ph.load.image("hero", graphics + "/hero/texture.png");
	ph.load.image("hero_attack", graphics + "/hero/attack.png");
	ph.load.image("hero_jump", graphics + "/hero/jump.png");
	
	ph.load.image("skeleton", graphics + "/enemies/skeleton/texture.png");
	ph.load.image("skeleton_dead", graphics + "/enemies/skeleton/dead.png");
	ph.load.spritesheet("skeleton_attack", graphics + "/enemies/skeleton/attack.png", 370/5, 350/5, 25);
	
	ph.load.spritesheet("gold", graphics + "/gold_spritesheet.png", 350/7, 50, 7);
	ph.load.image("Mask of the Demon Hunter", graphics + "/artifacts/Mask of the Demon Hunter.png");
	
	ph.load.image("blue-wall", graphics + "/walls/blue-wall.png");
	ph.load.image("brick-wall", graphics + "/walls/brick-wallx50.png");
	ph.load.image("stone-wall", graphics + "/walls/stone-wall.png");
	ph.load.image("death_flash", graphics + "/death_flash.png");
	ph.load.image("red-door", graphics + "/red-door.png");
	ph.load.image("blue-door", graphics + "/blue-door.png");
	ph.load.image("green-door", graphics + "/green-door.png");
	ph.load.image("purple-door", graphics + "/purple-door.png");
	ph.load.image("exit-door", graphics + "/exit-door.png");
	
	ph.load.image("gate150_closed", graphics + "/gate150_closed.png");
	ph.load.image("gate150_opened", graphics + "/gate150_opened.png");
	
	ph.load.image("sokail", graphics + "/sprites/sokail.png");
	ph.load.image("hello_the_moon", graphics + "/sprites/hello_the_moon.png");
	ph.load.image("dont_stone", graphics + "/sprites/dont_stone.png");
	ph.load.image("level_right", graphics + "/sprites/level_right.png");
	ph.load.image("1", graphics + "/sprites/1.png");
	ph.load.image("leap", graphics + "/sprites/leap.png");
	ph.load.image("moon", graphics + "/sprites/moon.png");
	
	ph.load.audio("game-music", audio + "/game.ogg");
	ph.load.audio("doom", audio + "/doom.ogg");
	ph.load.audio("hop1", audio + "/hop1.ogg");
	ph.load.audio("hop2", audio + "/hop2.ogg");
	ph.load.audio("hop3", audio + "/hop3.ogg");
	ph.load.audio("damaged1", audio + "/damaged1.ogg");
	ph.load.audio("damaged2", audio + "/damaged2.ogg");
	ph.load.audio("damaged3", audio + "/damaged3.ogg");
	ph.load.audio("attack1", audio + "/attack1.wav");
	ph.load.audio("attack2", audio + "/attack2.wav");
	ph.load.audio("attack3", audio + "/attack3.wav");
	ph.load.audio("wallmove", audio + "/wallmove.wav");
	ph.load.audio("open", audio + "/open.wav");
	ph.load.audio("door", audio + "/door.wav");
	ph.load.audio("destroy", audio + "/destroy.wav");
	ph.load.audio("gold", audio + "/gold.wav");
	
	// victory
	ph.load.image("victory-image", graphics + "/victory-image.png");
	ph.load.audio("victory-music", audio + "/victory.ogg");
}
