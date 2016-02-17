#!/bin/bash

helpme()
{
	echo ""
	echo "### WHATFOR : automate the waga update : generate the css and html code"
	echo "### HOWTO : $0 \"gifanimals_name\" \"index\" (related to .gif file)"
	echo "### HOWTO : --help , display this help"
}

if [ $# -eq 0 ]
then
	echo "ERROR : and ? .... you forgot the gifanimals name"
	helpme
	exit 1;
fi

# if [ $1 -eq "--help" ]
# then
#	echo "ERROR : and ? .... you forgot the gifanimals name"
#	helpme
#	exit 1;
# fi

clear

index=$2

echo "---------HTML------------->"
echo "<div class=\"resizable draggable animemal $1\" id=\"\" onmouseover=\"playSound($index);\"  onmouseout=\"stopSound($index);\">"
echo "<img src=\"./ressources/$1.gif\" onload=\"updateProgressBar()\" alt=\"\" >"
echo "<div class=\"corner TL rotatable\"></div>"
echo -e "\t<div class=\"corner TR\"></div>"
echo -e "\t<div class=\"corner BL duplicatable\"></div>"
echo -e "\t<div class=\"corner BR resizeui\"></div>"
echo "</div>"
echo -e "\n"
echo "---------CSS------------->"
echo ".$1{"
echo "}"
echo ".$1:hover{"
echo "}"
echo -e "\n"
echo "---------JS------------->"
echo "                    {name:\"$1\", zindex:100, bottom:\"auto\", top:\"30%\", right:\"auto\", left:\"32%\", width: \"90px\", height:\"auto\" },"
echo -e "\n"

((index -= 1))

echo "---------JS_son--------->"
echo "      './ressources/son/$1.mp3' //$index"
