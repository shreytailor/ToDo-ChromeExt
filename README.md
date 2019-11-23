# To-Do App
As a way to practice my JavaScript, I created this web application with minimal UI components and features that let's you store your To-Do items somewhere - it uses the 'localStorage' of your browser so even if the tab or the browser window is closed, it will remember what those items were.

## How It Works
- At the beginning, when an item is added, the application realises there is no 'key' within the 'localStorage' where the item can be stored so it creates one. 
- Then an array of 'todos' is created containing the element that you just added, it then gets 'stringified' and then saved to the localStorage.
- When a new item is added by pressing the Enter key, we remove all the 'innerHTML' of the div containing the items and refresh that list so it contains the new item.
- When adding your second to-do item, there is already a 'todos' key existing so we first retrieve and convert the data to an object by 'JSON.parse', we add our new item to the array and then push it back to the Local Storage.
- The 'Clear All' button simply removes everything from the localStorage and then refreshes the HTML like usual.
