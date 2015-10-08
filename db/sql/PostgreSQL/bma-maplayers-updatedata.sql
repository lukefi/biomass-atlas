UPDATE oskari_maplayer mlayer
SET legend_image = (SELECT url||'?request=GetLegendGraphic&version=1.1.1&service=WMS&format=image/png&width=20&height=20&layer='||name FROM oskari_maplayer mlayer2 WHERE mlayer2.id=mlayer.id)
WHERE groupid > 1;