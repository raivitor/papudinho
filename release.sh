cordova build --release android
cp /Volumes/DEV/saites/papudinho/platforms/android/build/outputs/apk/android-release-unsigned.apk keys
cd keys
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore papudinho.keystore android-release-unsigned.apk papudinho
./zipalign -v 4 android-release-unsigned.apk Papudinho.apk
