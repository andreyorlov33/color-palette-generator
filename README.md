# Color Palette Generator

This comand line tool easily alows artists and designers to generate color palette csv tables with color hex values and their hue offset degree. The hue conversions are 100% consistant with that of Adobe Photoshop.

## Getting Started

Simply clone or download this repository , and run 
```
npm install

npm start
```
Input hexedecimal values of colors that you would like to palette in a signle line 
```
    #C79121 #ABC721 #21ABC7
``` 
If App will then validate that hexidecimal values you've entered are infact valid,
in case that a value is not a valid hexidecimal value the App will give a list of invalid hex values and will ask you to re enter them.
Any values you subsequently enter will be added to the list. Otherwise simply hit RETURN and those values will be omitted form the list. 

You will then be asked for the Hue Offset Degree˚ -- the hue value by witch you want your palette to increment

The App will then generate a PALETTE.csv file to its root directory

## Authors

* **Andrey Orlov** - *Initial work* - [Andreyorlov33](https://github.com/Andreyorlov33)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


