/*
Core Logic (script.js):
1. Global Variables/State: Plan how you’ll manage your posts (e.g., an array of post objects).
2. DOM Element Selection: Get references to your form, input fields, error message elements, post display area, etc.
3. Load Posts from localStorage: On script load, check localStorage for existing posts. If found, parse them and render them on the page.
4. Render Posts Function: Create a function that takes the array of posts and dynamically creates the HTML to display them. Each post should include its title, 
content, an “Edit” button, and a “Delete” button. Ensure new posts are added to the display without needing a page refresh.
5. Handle New Post Form Submission:
a. Add an event listener to the form’s submit event.
b. Prevent the default form submission using event.preventDefault().
c. Validate the form inputs (title and content are required). Display custom error messages if invalid.
d. If valid, create a new post object (e.g., with id, title, content, timestamp).
e. Add the new post to your local array of posts.
f. Save the updated array of posts to localStorage (remember to JSON.stringify).
g. Re-render the list of posts on the page.
h. Clear the form fields.
6. Handle Delete Post:
a. Use event delegation or add event listeners to “Delete” buttons.
b. When a “Delete” button is clicked, identify the post to be deleted (e.g., using a data attribute for the post ID).
c. Remove the post from your local array.
d. Update localStorage.
e. Re-render the posts.
7. Handle Edit Post:
a. Add event listeners to “Edit” buttons.
b. When an “Edit” button is clicked, populate the form (or a dedicated edit form/modal) with the selected post’s title and content. You’ll need a way to track which post is being edited.
c. Modify the form submission logic (or create a separate update function) to update the existing post in your local array instead of creating a new one.
d. Update localStorage.
e. Re-render the posts.
8. Utility Functions (Optional but Recommended): Consider helper functions for tasks like generating unique IDs, saving to localStorage, loading from localStorage, etc.

*/

let postits = [];

const titleHandle = document.getElementById("title");
const textAreaHandle = document.getElementById("contentArea");
const dateField = document.getElementById("date");
const postBtn = document.getElementById("post");
let displayAreaFiled = document.getElementById("displayArea");
let postItPopupDiv = document.getElementById("postItPopUp");
let postItForm = document.getElementById("postCreationForm");

const titleErrorHandle = document.getElementById("titleError");
const textAreaErrorHandle = document.getElementById("textAreaError");
