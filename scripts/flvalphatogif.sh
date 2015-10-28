#!/bin/bash
#
# HOWTO : flvalphatogif lenomdemonflv_sans.flv

avconv -i $1.flv -r 25 -vcodec png -pix_fmt rgb32 foo-%03d.png
find . -name \*.png -exec convert '{}' -resize 40% '{}'.png \;
convert foo-???.png.png $1.gif
rm *.png

# retaille
# find . -name \*.png -exec convert '{}' -resize 40% '{}'.png \;

#http://mwholt.blogspot.fr/2014/08/convert-video-to-animated-gif-with.html
#http://www.imagemagick.org/discourse-server/viewtopic.php?t=24010
#http://blog.room208.org/post/48793543478
#http://graphicdesign.stackexchange.com/questions/20908/how-to-remove-every-second-frame-from-an-animated-gif