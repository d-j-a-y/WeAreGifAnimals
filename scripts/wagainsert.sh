#!/bin/bash

E_ARG_ERR=65
E_FIL_ERR=66


helpme()
{
	echo "############################################################################"
	echo "### WHATFOR : automate the waga update : generate the css, js and html"
	echo "### HOWTO : $0 \"gifanimals_name\" \"index\" (related to .gif file)"
	echo "### HELP : --help , display this help"
	echo "#######################################################"
}

#Check necessary files
checkfilespresence()
{
	filehtml='./index.html'
	filepersonnage='./css/waga_personnages.css'
	filejs='./js/wearegifanimals.js'
	filessound='./js/waga_son.js'

	for checkfilelist in "$filehtml" "$filepersonnage" "$filejs" "$filessound"
	do
		if [ ! -f "$checkfilelist" ]
		then
			echo "Can't found \"$checkfilelist\". Are you in waga root folder ?" ;
			return $E_FIL_ERR;
		fi
	done
	return 0;
}


if [ $# -eq 0 ]
then
	echo "ERROR : and what ? .... you forgot the gifanimals name!"
	helpme
	exit 1;
fi


checkfilespresence
if [ $? -eq $E_FIL_ERR ]
then
	echo "Error in checking files presence. Exit now.";
	exit $E_FIL_ERR;
fi

# if [ $1 -eq "--help" ]
# then
#	echo "ERROR : and ? .... you forgot the gifanimals name"
#	helpme
#	exit 1;
# fi

index=$2

# Insert lines in a files starting from a specific line
match='<!--WAGA_NEW_ANIMEMAL-->'

WagaHTML=$(cat <<EOF
<div class=\"resizable draggable animemal $1\" id=\"\" onmouseover=\"playSound($index);\"  onmouseout=\"stopSound($index);\">\n\\
  \t<img src=\".\/ressources\/$1.gif\" onload=\"updateProgressBar()\" alt=\"\" >\n\\
  \t<div class=\"corner TL rotatable\"><\/div>\n\\
  \t<div class=\"corner TR\"><\/div>\n\\
  \t<div class=\"corner BL duplicatable\"><\/div>\n\\
  \t<div class=\"corner BR resizeui\"><\/div>\n\\
<\/div>
EOF
)

sed -i "s/$match/$match\n$WagaHTML/" $filehtml

WagaCSS=$(cat <<EOF
.$1{\n\\
}\n\\
.$1:hover{\n\\
}\n
EOF
)

sed -i "s/$match/$match\n$WagaCSS/" $filepersonnage

WagaJS='                    {name:\"'$1'\", zindex:100, bottom:\"auto\", top:\"30%\", right:\"auto\", left:\"32%\", width: \"90px\", height:\"auto\" },'

sed -i "s/$match/$match\n$WagaJS/" $filejs


((index -= 1))

WagaJSSON='      '\''.\/ressources\/son\/'$1'.mp3'\'',  \/\/'$index' '

sed -i "s/$match/$WagaJSSON\n$match/" $filessound

