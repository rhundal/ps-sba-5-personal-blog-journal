## Reflections

### A brief description of your project.

- This is a mini blog / journal where I (user) can perform CRUD operations for object postit
- User can add a new post using the button on top right
- User can perform Update and Delete operations clicking on buttons inside the postit
- User can view a postit by clicking on it in the list which is maintained dynamically

### Instructions on how to run the application (if anything beyond opening index.html in a browser is needed).

- Launch index.html in a browser

### A reflection on your development process, challenges faced, and how you overcame them.

- I spent alot of time designing the application although i know the instructions said not to. I wanted to play around with different styles and practice tailwind as well.
- I decided to simplify my ui design mid way to keep it simple for the user
- One of the challenges I faced is when creating a new post, it made both the postItPopUp and postArea disappear. I fixed it by removing the postHereArea div outside the postItPopUp div which made it appear properly.
- I struggled with styling the posts appear in the right place as well as their inner style. I had to do some googling to get some help with this styling part. I was able to do the JavaScript part myself. I still struggle with tailwind because sometimes I use conflicting classes together and that causes problems or UI not showing any changes.
- Another new thing I looked up converting date.toLocalDateString() back to .toISOString() so browser can read it properly when reading it.

### Any known issues or features not implemented.

#### Bug - I have a bug in the application, after I close the browser, the application loads the saved posts from local stroage. But when I try to edit a post after returning to a page which was closed, update operation is not working. Something to do with local storage feature. Will come back to this [Pending]

### Update on Bug - Bug fixed

I was doing this instead of setting or updating the original array directly. I had to do some googling for looking at ideas. I used findIndex method on the array to find the index of the object based on the id I had available and I used it to update the original directly which fixed the bug. Now the update works both before and after the browser is closed and reloaded.

```javascript
post.title = editedTitle.value;
post.content = editedContent.value;
if (editedDate.value) {
  post.date = new Date(editedDate.value + "T00:00:00").toLocaleDateString();
}
```

-- while trying to implement validations on post popup and edit popup, i ended up breaking my entire application. I had to get some help from google response and also clean up and redo some parts of my project which didnt help. I then decided to revert back to the last version and started working from there, which got me much better results.Validation for title and textarea now works on both edit and post popups but the date field can be overlooked and the app still posts if you dont mention a date which is a bug! I need to fix this one. I did have to use google for some parts of the application.

### If I had more time.

- I would like to implement these features if i had more time:
  a. search
  b. expand postIt
  c. fix the validation properly, there is a glitch sometimes, it works and then it doesnt.. for both edit and post.

## Assignment

### Create New Posts: [Done]

A form with fields for a post title and post content (e.g., using <input type="text"> for title and <textarea> for content).
Upon submission, the new post should be added to a list of posts displayed on the page.
The form should be validated: both title and content are required.
Display custom, user-friendly error messages if validation fails.

Pending - form validation

### Display Posts: [Done]

All created posts should be displayed on the page. Each displayed post should clearly show its title and content.
Posts should be rendered dynamically using JavaScript.

### Edit Posts: [Done]

Each displayed post should have an “Edit” button.
Clicking “Edit” should allow the user to modify the title and content of that specific post. This might involve populating the main form (or a modal form) with the existing post data.
After editing, the updated post should be reflected in the display.
Form validation should also apply during editing.

### Delete Posts: [Done]

Each displayed post should have a “Delete” button.
Clicking “Delete” should remove the post from the display and from localStorage.

### Data Persistence with localStorage: [Done]

All blog posts (title, content, and perhaps a unique ID and timestamp you generate) must be saved in localStorage.
When the page is loaded or refreshed, any posts previously saved in localStorage should be retrieved and displayed.
Updates (from edits) and deletions must also be reflected in localStorage.
Clicking “Delete” should remove the post from the display and from localStorage.

### Field Validation For Above points [Works Partially - works for fields except date]

- The form should be validated: both title and content are required.
- Display custom, user-friendly error messages if validation fails.
- Form validation should also apply during editing.

```

```
