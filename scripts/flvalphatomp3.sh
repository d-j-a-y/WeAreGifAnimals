#!/bin/bash

##TODO resize % has option
##TODO adjust rythm has option

helpme()
{
	echo ""
	echo "### WHATFOR : convert an flv (whith alpha) to animated gif "
	echo "### HOWTO : $0 flvfilename_without.flv"
}

if [ $# -eq 0 ]
then
	echo "ERROR : and ? .... you forgot the flv name ! (without .flv)"
	helpme
	exit 1;
fi

if [ ! -f $1.flv ]
then
	echo "ERROR : $1.flv not valid"
	helpme
	exit 1;
fi


#echo "WARNING : ALL .PNG FROM CURRENT FOLDER WILL BE REMOVED !"
#select yn in "Ok" "No"; do
#    case $yn in
#        Ok ) break;;
#        No ) exit;;
#    esac
#done

avconv -i $1.flv $1.mp3

#http://mwholt.blogspot.fr/2014/08/convert-video-to-animated-gif-with.html
#http://www.imagemagick.org/discourse-server/viewtopic.php?t=24010
#http://blog.room208.org/post/48793543478
#http://graphicdesign.stackexchange.com/questions/20908/how-to-remove-every-second-frame-from-an-animated-gif