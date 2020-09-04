# Write your own content

we will assume that your server url is **[MysServerURL]**   
We call the **[site root directory]** the place where you copied where you copied main.js, styel.css...

# First step : edit the home page
All you can read in your home page is an example file.  
It's not a very cool content but you can start with it and make incremental change.

## Open the "home.md" file.

Take your favorite text editor, open "home.htm" or "home.md" at the root of your file.    
The exemple file is in .md (markdown) format. Take a look at markdown syntax (([markdown basics](https://www.markdownguide.org/basic-syntax/#emphasis)).) and begin to edit the file

MarkDown version :
***********************
	# HOME PAGE FOR MY SITE
	Welcome on your RIKIKI example page

	## What we do here
************************

If you dont like markdown, you can write an HTML file.

HTML version :   
*****************
	<H1> HOME PAGE FOR MY SITE </H1>
	Welcome on my site
	<h2>Stamps collection is great</h2>

*******************

### About html file : 
note you dont write a true HTML file. You dont **create head, body and so on.**   
**You just write the inner content of the body.** The file you see above is the complete file you need to write.



If you create a .htm (or .html) to replace the markdown version file you need to edit index.txt and change "home.md" to "home.htm".

save the file (you can keep it open in the editor)

Now refresh your browser.  

### About browser refresh 
Refresh can be more tricky to do then you think : both your browser and your server have a cache.    
If your modifications dont appear in your browser may be you need to force both to refresh : 
- with chrome try CTRL + F5 and try refresh after. 
- try  CTRL + SHIFT + F5, fore a more energic refresh.
- Go in "inspect mode" --> RIGHT CLICK anywhere in windox --> Inspect. In inspect mode RIGHT CLICK the refresh icon of your browser. You should access a menu. Select "Empty cache and hard reload".
- for your server request the file directly by typing [MysServerURL]/home.htm (or home.md) in your browser url bar and refresh your browser.  

After that you should see your home page.    

### About file name :  
If you dont like the name "home" you can change to something else, if you want to have your homepage file in a separate directory, you can do that.    

But you have to respect two conditions :
- the file name in index.txt must be the same then in your server root (with complete path)
- only ".htm", ".html" an ".md" file can be displayed (case sensitive)

### About path :
 All paths are relative to your root site directory.  
 
to address à file  **[site root directory]**/subfolder_ONE/myFile.htm    
type : "subfolder_ONE/myFile.htm" in `index.txt` (no "/" , no "./" at first row)    

# Edit a regular page
You want to create a topic which need several pages.   

Lets suppose we want to share your passion for stamp collection. Write a first page with general considerations and one page by country could be good. That's what the example show. Only the page for nigerian stamps is made.

## first page 
This is the first page of your topic, it will be displayed when the user click the topic name in main menu.   

Rikiki is not a CMS, nobody will manage a database for you : you need to maintain a very tidy classification of files from the very begining. So create subfolders...

First create a subfolder in **[site root directory]**. Name it as you want, but use something self explanatory if possible. Here we suppose you call it **"stampsCollection"** .

In the sub folder create a .htm or a .md file. Fill it with a text editor. We suppose you call it **"firstPage.htm]"**  
Edit "index.txt" and create a line for your page :
- It's the first page of your topic : dont put an "|" at the begining of the name. So it will be displayed in the main menu
- fill the file name with the file complete path starting from **[site root directory]**.

Your line should be like that :    

	"MY COOL TOPIC",myFirstTopic/firstPage_topic1,
	
## Second page
You need to continue on an other page for the same topic, lets said about nigerian stamps.   

Create a second .md or .htm file in the **stampsCollection** subfolder. Name it **Nigeria.htm**. 
  
Edit "index.txt" and create a line for your page :
- It's not the first page of your topic : put a "|" at the begining of the line (realy at begining, the first row).
- fill the file name with the file complete path starting from **[site root directory]**.

Now you should have two line for your topic :  

		"MY STAMP COLLECTOR PASSION",stampsCollection/firstPage.htm,
		|"Stamps from Nigeria",stampsCollection/Nigeria.htm,

## add images
You want to add pictures of yours stamps. 

You have tons of stamps for each country. Dont create a mess : in **"stampsCollection"** make a subfolder for each country, put the relevant pictures in.

We suppose you create a **"NIGERIA"** subfolder for nigerian stamps.

Edit the page **"Nigeria.htm"**
add an image tag :

	<img src="stampsCollection/NIGERIA/red_1967.jpg">Red nigerian stamps 1967</img>

or in markdown syntax (in an .md file):

	![Red nigerian stamps 1967](stampsCollector/NIGERIA/red_1967.jpg)


  



	
	
	



