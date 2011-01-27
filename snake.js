/* * * * * * * * * * * * * * * * *      Javascript Snake       * * * * * * * * * * * * * * * * * *         Javascript          * * * * * * * * * * * * * * * * * * Autor: Sven Tatter          * *                             * * Lizenz:                     * *  Namensnennung-Weitergabe   * *  unter gleichen Bedingungen * *  3.0 Deutschland            * * * * * * * * * * * * * * * * */document.onkeydown = KeyPress;function KeyPress (event){	if(!event)		event = window.event;		switch (event.keyCode)	{		case 37: Change("l"); break;		case 38: Change("t"); break;		case 39: Change("r"); break;		case 40: Change("d"); break;	}}function Change(dic){	switch (dic)	{		case "l":			if (snake && moved) if (snake.Direction != "r") { moved = false; snake.Direction = "l"; }			break;		case "t":			if (snake && moved) if (snake.Direction != "d") { moved = false; snake.Direction = "t"; }			break;		case "r":			if (snake && moved) if (snake.Direction != "l") { moved = false; snake.Direction = "r"; }			break;		case "d": 			if (snake && moved) if (snake.Direction != "t") { moved = false; snake.Direction = "d"; }			break;	}}//variablenvar map;var snake;var moved = true;var runTime = 0;//Funktionnenfunction StartGame(run){	var html = document.getElementById("game");	html.innerHTML = "";	map = 0;	snake = 0;		snake = new Snake();	snake.Tiles = new Array();	map = new Map(loadMap.length, loadMap[0].length);		snake.Bonus[0] = snake.newBonus();	snake.Direction = "r";		map.Print(html);	snake.Print();		if(run)	{		snake.Moving = true;		runTime = 0;		snake.Move();	}	else	{		html.innerHTML += "<div id=\"StartButton\"><button onClick=\"StartGame(true)\">Starte Spiel</button></div>";	}}function contains (array, value){	for (i = 0; i < array.length; i++)	{		if(array[i].Left == value.Left && array[i].Top == value.Top)		{			return true;		}	}	return false;}// Map-Klasse ------------------------------------------------------------------function Map (w, h){	this.width = w;	this.height = h;		this.Tiles = new Array();	for (i = 0; i < loadMap.length; i++)	{		this.Tiles[i] = new Array();		for (j = 0; j < loadMap[0].length; j++)		{			this.Tiles[i][j] = loadMap[i][j];		}	}}Map.prototype.Print = function(html)	{		var result = "";		result += "<table>\n";		for(h = 0; h < this.height; h++)		{			result += "<tr>\n";			for(w = 0; w < this.width; w++)			{				// normal ------------------------------------------------------				if (this.Tiles[w][h] == 0)				{					result += 						"<td id=\"pos-" + w + "-" + h + "\" style=\"background-repeat: no-repeat; background-image:url(image/test1.png)\">" +						"<img src=\"image/empty.png\">" +						"</td>\n";				}				// blockiert ---------------------------------------------------				else if (this.Tiles[w][h] == 1)				{					result += 						"<td id=\"pos-" + w + "-" + h + "\" style=\"background-repeat: no-repeat; background-image:url(image/test2.png)\">" +						"<img src=\"image/empty.png\">" +						"</td>\n";				}				//snake --------------------------------------------------------				else if (this.Tiles[w][h] == 2)				{					result += 						"<td id=\"pos-" + w + "-" + h + "\" style=\"background-repeat: no-repeat; background-image:url(image/test1.png)\">" +						"<img src=\"image/empty.png\">" +						"</td>\n";					snake.Tiles[snake.Tiles.length] = new Position(w, h);				}				// error -------------------------------------------------------				else				{					result += "<td>err</td>";				}			}			result += "</tr>\n";		}		result += "</table>\n";		html.innerHTML = result;	}// Snake-Klasse ----------------------------------------------------------------function Snake (w, h){}Snake.prototype.Points = 0;Snake.prototype.Direction = "n";	Snake.prototype.Moving = false;	Snake.prototype.grow = false;Snake.prototype.Tiles = new Array();Snake.prototype.Bonus = new Array();	Snake.prototype.Print = function()	{		for(h = 0; h < map.height; h++)		{			for(w = 0; w < map.width; w++)			{				var htmlObject = document.getElementById("pos-" + w + "-" + h);				if(contains(this.Tiles, new Position(w, h)))				{					htmlObject.innerHTML = "<img src=\"image/snake.png\">";				}				else if(contains(this.Bonus, new Position(w, h)))				{					htmlObject.innerHTML = "<img src=\"image/bonus.png\">";				}				else 				{					htmlObject.innerHTML = "<img src=\"image/empty.png\">";				}			}		}	}Snake.prototype.Move = function()	{		var start = new Date();				this.UpdateBonus();		if(this.CkeckCol())		{			this.Moving = false;			alert("GameOver");			if(confirm("Neues Spiel?"))				StartGame(true);			else				document.getElementById("game").innerHTML += "<div id=\"RestartButton\"><button onClick=\"StartGame(true)\">Starte Neues Spiel</button></div>";		}		if(this.Moving)		{			setTimeout("snake.Move()", 200);		}		else		{			return;		}				moved = true;				if(this.grow)		{			this.Tiles[this.Tiles.length] = new Position(this.Tiles[this.Tiles.length - 1].Left, this.Tiles[this.Tiles.length - 1].Top);			this.grow = false;		}		else		{			for(i = 0; i < this.Tiles.length - 1; i++)			{				this.Tiles[i] = new Position(this.Tiles[i + 1].Left, this.Tiles[i + 1].Top);			}		}				switch(this.Direction)		{			case "l":				this.Tiles[this.Tiles.length - 1].Left--;				break;							case "r":				this.Tiles[this.Tiles.length - 1].Left++;				break;							case "t":				this.Tiles[this.Tiles.length - 1].Top--;				break;							case "d":				this.Tiles[this.Tiles.length - 1].Top++;				break;							case "n":				return;				break;		}				if (this.Tiles[this.Tiles.length - 1].Top == -1)			this.Tiles[this.Tiles.length - 1].Top = map.height - 1;					if (this.Tiles[this.Tiles.length - 1].Top == map.height)			this.Tiles[this.Tiles.length - 1].Top = 0;					if (this.Tiles[this.Tiles.length - 1].Left == -1)			this.Tiles[this.Tiles.length - 1].Left = map.width - 1;					if (this.Tiles[this.Tiles.length - 1].Left == map.width)			this.Tiles[this.Tiles.length - 1].Left = 0;				this.Print();		this.Points += this.Tiles.length;		this.PrintStatus();				var now = new Date();		tmpRunTime = parseInt(now.getTime() - start.getTime());		if(tmpRunTime > runTime)			runTime = tmpRunTime;	}	Snake.prototype.UpdateBonus = function()	{		for (i = 0; i < this.Bonus.length; i++)		{			if(this.Bonus[i].Left == this.Tiles[this.Tiles.length - 1].Left &&				this.Bonus[i].Top == this.Tiles[this.Tiles.length - 1].Top)			{				this.Points += this.Tiles.length * 100;				this.grow = true;				this.Bonus[i] = this.newBonus();			}		}	}	Snake.prototype.newBonus = function()	{		do		{			pos = new Position(parseInt(Math.random() * map.width), parseInt(Math.random() * map.height));		}		while (map.Tiles[pos.Left][pos.Top] == 1)				return pos;	}Snake.prototype.PrintStatus = function()	{		var htmlObject = document.getElementById("stat");		htmlObject.innerHTML = "Punkte: " + this.Points +			" Länge: " + this.Tiles.length +			" Max. Updatezeit: " + runTime + "ms";	}	Snake.prototype.CkeckCol = function()	{		//ist der kopf in einer Wand?		for(h = 0; h < map.height; h++)		{			for(w = 0; w < map.width; w++)			{				if(w == this.Tiles[this.Tiles.length - 1].Left &&					h == this.Tiles[this.Tiles.length - 1].Top &&					map.Tiles[w][h] == 1)				{					return true;				}			}		}				//ist der Kopf in der Schlange?		for (i = 0; i < this.Tiles.length - 1; i++)		{			if(this.Tiles[i].Left == this.Tiles[this.Tiles.length - 1].Left && this.Tiles[i].Top == this.Tiles[this.Tiles.length - 1].Top)			{				return true;			}		}				return false;	}// Position-Klasse -------------------------------------------------------------function Position (l, t){	this.Left = l;	this.Top= t;}Position.prototype.Left;Position.prototype.Top;