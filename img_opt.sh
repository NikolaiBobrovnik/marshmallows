#!/usr/bin/env bash

current_dir=`pwd`

echo "Working at $current_dir"

case $1 in

    "png" )
        for folder in 'images'
        do
            cdir=$current_dir/$folder
            echo "Processing PNG at folder: $cdir"
            # find $cdir -type f -regextype posix-extended -regex ".*\.(png|PNG)" -exec optipng -o7 {} \; # GNU Find
	    find -E $cdir -type f -regex ".*\.(png|PNG)" -exec optipng -o7 {} \; # FreeBSD Find
        done
    ;;

    "jpg" )
        for folder in 'images'
		do
			cdir=$current_dir/$folder
			echo "Processing JPG at folder: $cdir"
			# find $cdir -type f -regextype posix-extended -regex ".*\.(jpg|jpeg|JPG|JPEG)" -exec jpegoptim -s -m85 {} \; # GNU Find
			find -E $cdir -type f -regex ".*\.(jpg|jpeg|JPG|JPEG)" -exec jpegoptim -s -m85 {} \; # FreeBSD Find
		done
    ;;
	
    * )
		echo 'Usage: img_opt.sh <mode>'
		echo 'Modes: jpg | png'
esac
