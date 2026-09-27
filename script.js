/*
Core Logic (script.js):
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

let postIt = {
  id: 1,
  title: "",
  content: "",
  date: new Date("2026-12-31"),
};

let postitArray = [];

let titleHandle = document.getElementById("title");
let textAreaHandle = document.getElementById("contentArea");
let dateField = document.getElementById("date");
const postBtn = document.getElementById("post");
let displayAreaFiled = document.getElementById("displayArea");
let postItPopupDiv = document.getElementById("postItPopUp");
let postItForm = document.getElementById("postCreationForm");
let postHereArea = document.getElementById("postHere");
const newEntryBtn = document.getElementById("newEntry");

const titleErrorHandle = document.getElementById("titleError");
const textAreaErrorHandle = document.getElementById("textAreaError");

// const postHereArea2 = displayAreaFiled
//   .querySelector("#postItPopUp")
//   .querySelector("#postHere");

// functions ////
function renderPostIts(postsArray) {
  postHereArea.innerHTML = "";

  postsArray.forEach((post) => {
    let postItUI = document.createElement("div");
    postItUI.classList.add(
      "w-full",
      "mb-10",
      "mt-5",
      "flex",
      "mx-auto",
      "justify-center",
    );

    postItUI.innerHTML = `
        <div class="bg-[#F7E7A9] border-2 border-[#d4a4a5] w-[300px] min-h-[120px] md:w-[600px] md:min-h-[220px] shadow-2xl rounded-2xl p-5 flex flex-col justify-between">

            <!-- Top Header Grid -->
            <div class="grid grid-rows-3 md:grid-cols-3 -mt-[10px]">
                <div class="flex justify-start items-center mb-3">
                    <h2 class="text-sm md:text-xl font-bold text-[#d4a4a5]">${post.title}</h2>
                </div>
                <div class="flex ml-10 items-center gap-5 scale-90 md:scale-100">
                    <button id="editBtn" class="inline-block bg-[#d4a4a5] text-[#F7E7A9] font-medium text-xs px-3 rounded-lg shadow-sm mr-2">
                        Edit
                    </button>
                    <button id="deleteBtn" class="inline-block bg-[#d4a4a5] text-[#F7E7A9] font-medium text-xs px-3 rounded-lg shadow-sm mr-2">
                        Delete
                    </button>
                  <!--  <button id="expandBtn" class="inline-block bg-[#d4a4a5] text-[#F7E7A9] font-medium text-xs px-3 rounded-lg shadow-sm mr-2">
                        Expand
                    </button> -->
                </div>
                <div class="flex md:justify-end md:ml-20 items-center mb-3 mt-3">
                    <div class="text-sm md:text-lg md:ml-[15px] font-bold text-[#d4a4a5]">${post.date}</div>
                </div>
            </div>
            <div class="hidden md:block text-lg text-[#d4a4a5] break-words flex-grow max-h-[120px] overflow-y-auto -mt-[100px]"> ${post.content} </div>
        </div>
    `;
    postHereArea.appendChild(postItUI);
  });
}

function deletePost(e) {
  console.log("deleting post");
}

function editPost(e) {
  console.log("editing post");
}

function postitFormVisibility(e) {
  if (e.target === newEntryBtn && postItPopupDiv.classList.contains("hidden")) {
    postItPopupDiv.classList.remove("hidden");
    postItPopupDiv.classList.add("inline-block");
    postHereArea.classList.remove("inline-block");
    postHereArea.classList.add("hidden");
  } else if (
    e.target === postBtn &&
    postItPopupDiv.classList.contains("inline-block")
  ) {
    postItPopupDiv.classList.remove("inline-block");
    postItPopupDiv.classList.add("hidden");
    postHereArea.classList.remove("hidden");
    postHereArea.classList.add("inline-block");
  }

  console.log("postItPopDiv Visibility " + postItPopupDiv.checkVisibility());
}

// Event Listeners /////

postBtn.addEventListener("click", function (e) {
  e.preventDefault();

  // create a new postIt object based on user input

  let newPostIt = {
    id: postitArray.length + 1,
    title: titleHandle.value,
    content: textAreaHandle.value,
    date: new Date(date.value + "T00:00:00").toLocaleDateString(),
  };

  postitArray.push(newPostIt); // add newly created postIt object to postItArray
  renderPostIts(postitArray); // pass postItArray to render Function
  postitFormVisibility(e);
  titleHandle.value = "";
  textAreaHandle.value = "";
  date.value = "";
});

newEntryBtn.addEventListener("click", function (e) {
  postitFormVisibility(e);
});
