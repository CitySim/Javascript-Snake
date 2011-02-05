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
        
        case 80: 
            if (snake.Moving)
            {
                snake.Moving = false;
            }
            else
            {
                snake.Moving = true;
                snake.Move();
            }
            break;
	}
}

function SetUpGame(runGame, mapId)
{
    // Spielbereich suchen
	var html = document.getElementById("game");
    
    // Reset
	html.innerHTML = "";
	snake = 0;
	
    // neu machen
	snake = new Snake(mapId);
	snake.Direction = "r";
	
    // Ausgabe
	snake.map.Print(html);
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
		html.innerHTML += "<div id=\"StartButton\"><button onClick=\"SetUpGame(true, " + getGetLvl() + ")\">Starte Spiel</button></div>";
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

function getGetLvl()
{
    if(location.search.length > 0)
    {
        var get_param_str = location.search.substring(1, location.search.length);
        var get_params = get_param_str.split("&");
        for(i = 0; i < get_params.length; i++)
        {
            var key_value = get_params[i].split("=");
            if(key_value.length == 2)
            {
                if (key_value[0] == "lvl")
                    return parseInt(key_value[1]);
            }
        }
    }
    return 0;
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