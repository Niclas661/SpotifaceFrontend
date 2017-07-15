# SpotifaceFrontend
This is the frontend bit for my web application Spotiface.

Spotiface lets you take a picture from your files and a Javascript API (Affectiva) analyzes it to find a face and its attributes (like emotions, smiling, eyebrow furrow and so forth).

That data is later sent to the Spotiface backend where it will return a song and genre based on the emotions analyzed from that picture.

## Current problems
* The Affectiva Javascript SDK is not working for mobile devices. This is likely due to hardware specifications not matching the recommended settings for using Affectiva SDK.
* https://spotiface.azurewebsites.net/ is no longer working. My trial expired and have no current plans to purchase credits.

## Quick start guide
1. Get SpotifaceAPIBackend (might have to setup CORS) and launch it (a web server should be running as a result), copy the link (ex. localhost:39452)
2. Replace any occurences of https://spotiface.azurewebsites.net/ in SpotifaceFrontend with your localhost link
3. Run an http-server of SpotifaceFrontend
