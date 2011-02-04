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

var Maps = new Array();

include("maps/Map0.js");

function Map (mapId)
{
    this.height = Maps[mapId][0];
    this.width = Maps[mapId][1];
    this.Tiles = Maps[mapId][2];
}

Map.prototype.Print =
    function (html)
	{
		var result = "";
		result += "<table>\n";
		for(y = 0; y < this.height; y++)
		{
			result += "<tr>\n";
			for(x = 0; x < this.width; x++)
			{
				// normal ------------------------------------------------------
				if (this.Tiles[y][x] == 0)
				{
					result += 
						"<td id=\"pos-" + y + "-" + x + "\" style=\"background-repeat: no-repeat; background-image:url(image/test1.png)\">\n" +
						"   <img src=\"image/empty.png\">\n" +
						"</td>\n";
				}
				// blockiert ---------------------------------------------------
				else if (this.Tiles[y][x] == 1)
				{
					result += 
						"<td id=\"pos-" + y + "-" + x + "\" style=\"background-repeat: no-repeat; background-image:url(image/test2.png)\">\n" +
						"   <img src=\"image/empty.png\">\n" +
						"</td>\n";
				}
				// snake --------------------------------------------------------
				else if (this.Tiles[y][x] == 2)
				{
					result += 
						"<td id=\"pos-" + y + "-" + x + "\" style=\"background-repeat: no-repeat; background-image:url(image/test1.png)\">\n" +
						"   <img src=\"image/empty.png\">\n" +
						"</td>\n";
					snake.Tiles[snake.Tiles.length] = new Position(y, x);
				}
				// error -------------------------------------------------------
				else
				{
					result += "<td>err</td>\n";
				}
			}
			result += "</tr>\n";
		}
		result += "</table>\n";
		html.innerHTML = result;
	}