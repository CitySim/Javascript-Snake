/* * * * * * * * * * * * * * * *
 *      Javascript Snake       *
 * * * * * * * * * * * * * * * *
 * Autor: Sven Tatter          *
 *                             *
 * Lizenz:                     *
 *  Namensnennung-Weitergabe   *
 *  unter gleichen Bedingungen *
 *  3.0 Deutschland            *
 * * * * * * * * * * * * * * * */

include("js/Position.Class.js");
include("js/Snake.Class.js");
include("js/Map.Class.js");

var map;
var snake;

document.onkeydown = KeyPress;

function KeyPress (event)
{
    if(!event)
		event = window.event;
	
	switch (event.keyCode)
	{
		case 37: snake.Change("l"); break;
		case 38: snake.Change("t"); break;
		case 39: snake.Change("r"); break;
		case 40: snake.Change("d"); break;
	}
}

function SetUpGame(runGame)
{
    // Spielbereich suchen
	var html = document.getElementById("game");
    
    // Reset
	html.innerHTML = "";
	map = 0;
	snake = 0;
	
    // neu machen
	snake = new Snake();
	snake.Tiles = new Array();
	map = new Map(0);
	
	snake.Bonus[0] = snake.newBonus();
	snake.Direction = "r";
	
    // Ausgabe
	map.Print(html);
	snake.Print();
	
    
	if(runGame)
	{
        runTime = 0;
        
        // Bewegung der Schlange anstoßen
		snake.Moving = true;
		snake.Move();
	}
	else
	{
        // Start Button erzeugen 
		html.innerHTML += "<div id=\"StartButton\"><button onClick=\"SetUpGame(true)\">Starte Spiel</button></div>";
	}
}

function include(file)
{
    var script  = document.createElement('script');
    script.src  = file;
    script.type = 'text/javascript';
    script.defer = true;
    
    document.getElementsByTagName('head').item(0).appendChild(script);
}

function contains (positionArray, position)
{
	for (i = 0; i < positionArray.length; i++)
	{
		if(positionArray[i].X == position.X && positionArray[i].Y == position.Y)
		{
			return true;
		}
	}
	return false;
}