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

### Any known issues or features not implemented.

- I would like to implement search feature if i had more time

## Assignment

### Create New Posts:

A form with fields for a post title and post content (e.g., using <input type="text"> for title and <textarea> for content).
Upon submission, the new post should be added to a list of posts displayed on the page.
The form should be validated: both title and content are required.
Display custom, user-friendly error messages if validation fails.

### Display Posts:

All created posts should be displayed on the page. Each displayed post should clearly show its title and content.
Posts should be rendered dynamically using JavaScript.

### Edit Posts:

Each displayed post should have an “Edit” button.
Clicking “Edit” should allow the user to modify the title and content of that specific post. This might involve populating the main form (or a modal form) with the existing post data.
After editing, the updated post should be reflected in the display.
Form validation should also apply during editing.

### Delete Posts:

Each displayed post should have a “Delete” button.
Clicking “Delete” should remove the post from the display and from localStorage.

### Data Persistence with localStorage:

All blog posts (title, content, and perhaps a unique ID and timestamp you generate) must be saved in localStorage.
When the page is loaded or refreshed, any posts previously saved in localStorage should be retrieved and displayed.
Updates (from edits) and deletions must also be reflected in localStorage.
