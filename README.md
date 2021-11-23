# Tagify
An extension for [Spicetify](https://github.com/khanhas/spicetify-cli) which allows you to tag songs directly in the Spotify Desktop via context menu using [SongTaggerForSpotify](https://github.com/BenediktAlkin/SongTaggerForSpotify) as back-end

[See it in action](https://photos.google.com/share/AF1QipNA3lLlyc8ck4i5-LvpjpfJKQPgor9U6euXnbXqXrQmGR6AS-Q9Nvex9NYSymmkKg/photo/AF1QipNGkQAo98a-zc8Hgf6ccUHT71J-tIMpDgUqcJPY?key=ZE1xNmlXRDY2eHFwUGphbVFGdWxEb3RJd2RmaHl3)

# Motivation
- If you are a music nerd like me and you organise your Spotify library to death using SongTaggerForSpotify this extension would make that process feel slightly more natural.
I mean, when you're listening to a song you just right-click on the song and tag the track straight in the Spotify context menu as if Spotify guys finally made that possible natively. No need to go somewhere else of to tag a track. Isn't it just really cool? 

- If you don't have Spotify premium, you would benefit from this solution as well as you can't start playback in SongTaggerForSpotify.

### However
* this is intended more for 'situational' tagging 
* for mass tagging sessions SongTaggerForSpotify is still a much better choice

# Setup
- install Spicetify if haven't already.
- install SongTaggerForSpotify if haven't already.
  * beware that since the extension uses back-end of SongTaggerForSpotify you also need to install ASP.NET 5 Core ("run server apps" on [here](https://dotnet.microsoft.com/download/dotnet/5.0/runtime))
  * define tags and tag groups as needed.
- run BackendApi.exe. in my case it's located in C:\Users\{username}\AppData\Roaming\Song Tagger for Spotify.
  * tip: you can add BackendApi.exe to auto startup to have it always running in the background. 
- save the [tagify.js](tagify.js) file from this repo into the folder where all the Spicetify extensions are located [see instructions](https://github.com/khanhas/spicetify-cli/wiki/Extensions)
- enable the tagify.js extension and apply changes. See instructions in the link above. 
- at this point you would see the tags you defined in the Spotify context menu.
- when you add new tags/remove tags/rename tags (but not just *assign* a tag to a track), the extension must be reloaded in order it to reflect the changes. Restart Spotify or run *spicetify apply* in terminal to do so.

# Notes
- Although it's possible to access tags on a playlist/album too, it would only work in case when all tracks from the playlist/album are already saved in the Song Tagger database. Just beware of that.

# Configuration
Any changes in tagify.js require *spicetify apply* afterwards.

## createTagsSubmenu
Its value is set right in the tagify.js file in the first line. Can be either *true* or *false*.
It looks like this:
```es6
const createTagsSubmenu = true;
```
### true (which is by default)

Create dedicated 'Tags' submenu and place all tag groups in it. Tags that belong to the 'default' group will be placed in 'Tags' too.
Would be more convenient than the other way when you have too many tag groups.

![createTagsSubmenu = true](createTagSubmenu%20%3D%20true.jpg)

### false 

Place all tag groups straight in the Spotify context menu.
Would be more convenient when you have relatively few tag groups.
![createTagsSubmenu = false](createSubMenu%20-%20false.jpg)
