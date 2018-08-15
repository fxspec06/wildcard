#c:\bbndk\bbndk-env
#cd "C:\Users\Bryan\Dropbox\Jake-Bryan\cboard"
#echo beginning deploy script...
#sh "tools\\deploy.sh"
rm -r deploy
mkdir deploy

#echo preparing webworks package...
#cp config.xml deploy
#cd deploy
#cp * cboard
#cd cboard
#rm icon.png

echo packaging zip...
zip -r -q deploy\\cboard.zip *
cd deploy

echo creating signed bar for testing...

if [[ $DEBUG == "Y" ]]; then
bbwp cboard.zip -d -g hal02fan; else
bbwp cboard.zip -g hal02fan; fi

if [[ $TARGET == *PB* ]]; then
echo deploying to playbook...
blackberry-deploy -installApp -device 192.168.0.198 bin/cboard.bar -password 00011000
fi

if [[ $TARGET == *BB10* ]]; then
echo deploying to simulator...
blackberry-deploy -installApp -device 192.168.184.128 bin/cboard.bar
fi
