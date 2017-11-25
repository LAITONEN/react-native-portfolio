# Personal-Dictionary-IOS
   
## Setup:
1. Create a firebase project on https://firebase.google.com/
2. On the project’s "Overview" tab (main page), go to the “Authentication” tab on the left. 
3. Click “Web setup” in the top right corner (below your profile picture).
4. Copy the properties inside the config object.
5. Paste them to the /App.js file inside the “const config” object (there is an explanation on how to 
   do it).
   
## Usage:
1. Press "Go To Auth" on the boot page.
2. Register by typing in your credentials. The same screen is used for logging-in in the future.
3. Now you should be on the 'List' screen, with all the words that have been added to the dictionary (unless you have not added any). In the bottom you can see 3 dictionary types. Click on any in the tab bar at the bottom of the screen to open it.
4. Each dictionary has its own environment, undependable on other dictionaries.
5. Add your first word in the desired dictionary by clicking the 'Add' button in the top right corner. Then typing in the word details to at least first two fields and clicking the "Save' button.
6. Congratulations, you have added your first word.
7. To view its details, click on the word and you will be redirected to the 'Details' page.
8. On the 'details' page you can edit or delete the current by clicking on the homonymous buttons below the word details section.
9. 'Edit' button redirects to Add-word-alike screen, where you can edit the current word and then upload the changed version by clicking the 'Save' button. Alternatively, you can edit a word by long-pressing it in the 'List' screen.
10. 'Delete' button opens a verficication window (Modal) to have you confirm or decline the intended action of deletion.
11. Clicking on the 'definitions' or 'synonyms' box will open the comprehensive professional dictionary page of this word in your browser.
12. Click on the back button in the top left corner.
13. You got returned to your dictionary, where you can also search through your words, by clicking on the 'Search' button in the top-left corner, which will open a search input.
14. Type the word you need to look up. Check the results.
15. Click the 'cross' icon in the input to clear the input. Click the 'search' button to hide the input. Click the 'cancel' button to clear and hide the input. 

