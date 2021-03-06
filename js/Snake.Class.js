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

function Snake (mapId)
{
    this.Direction = "n";
    this.Moving = false;
    this.grow = false;
    this.moved = true;
    this.Tiles = new Array();
    this.Bonus = new Array();
    this.runTime = 0;
    
    this.map = new Map(mapId);
    
    for (var i = 0; i < this.map.bonus; i++)
        this.Bonus[i] = this.newBonus();
}
	
Snake.prototype.Print =
    function()
	{
		for(y = 0; y < this.map.height; y++)
		{
			for(x = 0; x < this.map.width ;x++)
			{
				var htmlObject = document.getElementById("pos-" + y + "-" + x);
				if(contains(this.Tiles, new Position(y, x)))
				{
					htmlObject.innerHTML = "<img src=\"image/snake.png\">";
				}
				else if(contains(this.Bonus, new Position(y, x)))
				{
					htmlObject.innerHTML = "<img src=\"image/bonus.png\">";
				}
				else 
				{
					htmlObject.innerHTML = "<img src=\"image/empty.png\">";
				}
			}
		}
	}

Snake.prototype.Change =
    function (dic)
    {
        switch (dic)
    	{
    		case "l":
    			if (this.moved) if (this.Direction != "r") { this.moved = false; this.Direction = "l"; }
    			break;
    		case "t":
    			if (this.moved) if (this.Direction != "d") { this.moved = false; this.Direction = "t"; }
    			break;
    		case "r":
    			if (this.moved) if (this.Direction != "l") { this.moved = false; this.Direction = "r"; }
    			break;
    		case "d": 
    			if (this.moved) if (this.Direction != "t") { this.moved = false; this.Direction = "d"; }
    			break;
    	}
    }
    
Snake.prototype.Move =
    function()
	{
		var start = new Date();
		
		this.UpdateBonus();
		if(this.CkeckCol())
		{
			this.Moving = false;
			alert("GameOver");
			if(confirm("Neues Spiel?"))
				SetUpGame(true, 0);
			else
				document.getElementById("game").innerHTML += "<div id=\"RestartButton\"><button onClick=\"SetUpGame(true, " + getGetLvl() + ")\">Starte Neues Spiel</button></div>";
		}

		if(this.Moving)
		{
			setTimeout("snake.Move()", 200);
		}
		else
		{
			return;
		}
		
		this.moved = true;
		
		if(this.grow)
		{
			this.Tiles[this.Tiles.length] = new Position(this.Tiles[this.Tiles.length - 1].Y, this.Tiles[this.Tiles.length - 1].X);
			this.grow = false;
		}
		else
		{
			for(i = 0; i < this.Tiles.length - 1; i++)
			{
				this.Tiles[i] = new Position(this.Tiles[i + 1].Y, this.Tiles[i + 1].X);
			}
		}
		
        if(this.Tiles.length > this.map.levelUp)
        {
            this.Moving = false;
            if(Maps[this.map.MapId + 1] == null)
                this.map.MapId = -1;
            
            setTimeout("SetUpGame(true,  " + (this.map.MapId + 1) + ")", 3000);
        }
        
		switch(this.Direction)
		{
			case "l":
				this.Tiles[this.Tiles.length - 1].X--;
				break;
				
			case "r":
				this.Tiles[this.Tiles.length - 1].X++;
				break;
				
			case "t":
				this.Tiles[this.Tiles.length - 1].Y--;
				break;
				
			case "d":
				this.Tiles[this.Tiles.length - 1].Y++;
				break;
				
			case "n":
				return;
				break;
		}
		
		if (this.Tiles[this.Tiles.length - 1].Y == -1)
			this.Tiles[this.Tiles.length - 1].Y = this.map.height - 1;
			
		if (this.Tiles[this.Tiles.length - 1].Y == this.map.height)
			this.Tiles[this.Tiles.length - 1].Y = 0;
			
		if (this.Tiles[this.Tiles.length - 1].X == -1)
			this.Tiles[this.Tiles.length - 1].X = this.map.width - 1;
			
		if (this.Tiles[this.Tiles.length - 1].X == this.map.width)
			this.Tiles[this.Tiles.length - 1].X = 0;
		
		this.Print();
        if(isNaN(Points))
            Points = 0;
        
		Points += this.Tiles.length;
		this.PrintStatus();
		
		var now = new Date();
		tmpRunTime = parseInt(now.getTime() - start.getTime());
		if(tmpRunTime > runTime)
			runTime = tmpRunTime;
	}
	
Snake.prototype.UpdateBonus =
    function()
	{
		for (i = 0; i < this.Bonus.length; i++)
		{
			if(this.Bonus[i].X == this.Tiles[this.Tiles.length - 1].X &&
				this.Bonus[i].Y == this.Tiles[this.Tiles.length - 1].Y)
			{
				Points += this.Tiles.length * 100;
				this.grow = true;
				this.Bonus[i] = this.newBonus();
			}
		}
	}
	
Snake.prototype.newBonus = 
    function()
	{
		do
		{
			pos = new Position(parseInt(Math.random() * this.map.height), parseInt(Math.random() * this.map.width));
		}
		while (this.map.Tiles[pos.Y][pos.X] == 1) // solange blockiertes Feld
		
		return pos;
	}

Snake.prototype.PrintStatus = 
    function()
	{
		var htmlObject = document.getElementById("stat");
		htmlObject.innerHTML = "Punkte: " + Points +
			" Länge: " + this.Tiles.length +
			" Max. Updatezeit: " + runTime + "ms";
	}
	
Snake.prototype.CkeckCol =
    function()
	{
		//ist der kopf in einer Wand?
		for(y = 0; y < this.map.height; y++)
		{
			for(x = 0; x < this.map.width; x++)
			{
				if(x == this.Tiles[this.Tiles.length - 1].X &&
					y == this.Tiles[this.Tiles.length - 1].Y &&
					this.map.Tiles[y][x] == 1)
				{
					return true;
				}
			}
		}
		
		//ist der Kopf in der Schlange?
		for (i = 0; i < this.Tiles.length - 1; i++)
		{
			if(this.Tiles[i].X == this.Tiles[this.Tiles.length - 1].X && this.Tiles[i].Y == this.Tiles[this.Tiles.length - 1].Y)
			{
				return true;
			}
		}
		
		return false;
	}