# Image Slideshow for Ghost

This app will display a Slideshow widget that images are gotten from a post.


## Features?
+ Load Image Slideshow from a specified post via it's slug by just a call.
+ Slideshow modes: Cross-fade, Slide.
+ Display options: show Image description, show control (Next, Previous, Pause), show slide navigation.


## Dependencies
+ Ghost App `ghost-app`.
+ Lo-Dash `lodash`.


## Compatibility

Ghost 0.5 (Latest is recommended).


## Download

[Download Slideshow widget v0.0.1 for Ghost](http://w3ball.com/download-a-slideshow-widget-for-your-ghost-blog-why-not/)


## Installing

**Step 1**: Extract the downloaded file first.

**Step 2**: Upload the folder `slideshow` in `apps` to `/content/apps/`. Upload the folder `slideshow` in `assets` to `/content/themes/YOUR_THEME/assets/`.

**Step 3**:
Use the sqllite database manager which you are family with, open up the database, and add the name of app to `activeApps` field in the `settings` table.

In this case, the app'name is `slideshow`, the value of `activeApps` should be `["slideshow"]`. Double quotes are required.

![Install app Slideshow](http://w3ball.com/content/images/2014/11/slideshow-install-up.png)

Once added, restart Ghost and app will be installed & loaded. Once success, you can see the field `installedApps` also contains `["slideshow"]`.

![Slideshow is installed and activated](http://w3ball.com/content/images/2014/11/slideshow-install-ok-up.png)



## Usage

**Step 1**: Create a post (should be static page so it will not display on blog stream). Insert some images. Example:

    ![Description about image Desert](/content/images/2014/10/Desert.jpg) 
    
    ![Description about image Hydrangeas](/content/images/2014/10/Hydrangeas.jpg)

    ![Description about image Penguins](/content/images/2014/10/Penguins.jpg)

    ![Description about image Tulips](/content/images/2014/10/Tulips.jpg)

    ![Description about image Jellyfish](/content/images/2014/10/Jellyfish.jpg)


**Step 2**: Call app from your theme to load Slideshow.

Open your theme file (`default.hbs`, `index.hbs`, `page.hbs`, etc.) depends on what page you want to display the widget, then load widget at where you want with below syntax.

**Syntax**: 

    {{slideshow slug="slug-of-post" mode="mode-fade"}}

For example: If I want to display Slideshow widget on Homepage then I will edit `index.hbs` or `home.hbs`. 

Restart Ghost to make sure changes to theme can be applied.

**Options**

For full options of above syntax, please visit this post for more details: [Download Slideshow widget v0.0.1 for Ghost](http://w3ball.com/download-a-slideshow-widget-for-your-ghost-blog-why-not/).

## Changelog
0.0.1 Initial publish

## Copyright & License

Copyright (c) 2014 W3Ball.com - Released under the MIT license.


## Problem?
Please feel free to leave a comment for problems you got on [W3Ball.com](http://w3ball.com/download-a-slideshow-widget-for-your-ghost-blog-why-not/)

Happy blogging with Ghost!
