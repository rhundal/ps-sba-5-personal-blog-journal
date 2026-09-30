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
  c. fix the validation properly, for date field.

### Field Validation For Above points [Works Partially - works for fields except date]

- The form should be validated: both title and content are required.
- Display custom, user-friendly error messages if validation fails.
- Form validation should also apply during editing.
