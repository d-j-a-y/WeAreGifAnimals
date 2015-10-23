#Fond d'ecrans

##Propriete des images
* Taille des images : 1900x1425 pixels
* jpeg / qualite 85

##Pour extraire une image depuis une video
Extraction d'une image a la seconde 8 depuis la video `IMG_1219.MOV` dans le fichier `output_image04.jpg`
`avconv -ss 00:00:08  -i IMG_1219.MOV -frames 1 output_image04.jpg`

##Pour le code
Dans le fichier [wearegifanimals.js](../js/wearegifanimals.js) ajouter l'image dans la variable 'backgroundBank'
