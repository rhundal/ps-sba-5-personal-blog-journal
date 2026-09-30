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

let postitArray = JSON.parse(localStorage.getItem("savedPosts")) || [];

// from intial PostIt form
let titleHandle = document.getElementById("title");
let textAreaHandle = document.getElementById("contentArea");
let dateField = document.getElementById("date");

const postBtn = document.getElementById("post");
let displayAreaFiled = document.getElementById("displayArea");
let postItPopupDiv = document.getElementById("postItPopUp");
let postItForm = document.getElementById("postCreationForm");
let postHereArea = document.getElementById("postHere");
const newEntryBtn = document.getElementById("newEntry");

// from edit PostIt form
let editTitleField = document.getElementById("editTitle"); //  populated dynamically
let editTextAField = document.getElementById("contentArea"); //  populated dynamically
let editDateField = document.getElementById("editdate");

// error fields
let titleErrorH = document.getElementById("titleError"); // coming from html
let textAreaErrorH = document.getElementById("textAreaError"); // coming from html
let editedTitleError = document.getElementById("editTitleEr"); // populated dynamically
let editedContentAreaError = document.getElementById("editTxtEr"); // populated dynamically
let editDateErr = document.getElementById("editDateEr"); // populated dynamically

[titleHandle, textAreaHandle, dateField].forEach((field) => {
  // from  initial postIt Form
  field?.setCustomValidity("");
  field?.removeAttribute("style");
  field?.addEventListener("input", verifyField);
});

[editTitleField, editTextAField, editDateField].forEach((field) => {
  // from edited postIt Form
  field?.setCustomValidity("");
  field?.removeAttribute("style");
  field?.addEventListener("input", verifyField);
});

// functions ////
function renderPostIts(postsArray) {
  //   localStorage.setItem("savedPosts", JSON.stringify(postitArray));

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

    let editPopUpContainer = document.createElement("div");
    editPopUpContainer.classList.add(
      "fixed",
      "inset-0",
      "z-50",
      "flex",
      "top-0", // Explicitly forces container to snap to top edge
      "left-0",
      "items-center",
      "justify-center",
      "bg-transparent",
      "hidden",
      "w-screen", // Forces width to match 100% of screen viewport
      "h-screen",
    );

    let editPopUp = document.createElement("div");

    editPopUp.classList.add(
      "bg-transparent",
      "flex",
      "flex-col",
      "md:flex-row",
      "justify-center",
      "items-center",
      "border-2",
      "border-[#6b7280]",
      "rounded-xl",
      "shadow-xl",
      "md:w-[600px]",
      "md:h-[500px]",
      "w-[300px]",
      "h-[300px]",
      "m-5",
    );

    editPopUp.innerHTML = `
      
          <div class="flex flex-col md:flex-row m-5 m-10" id="editPopUp-${post.id}">
                <form id="editForm-${post.id}"
                    class="bg-transparent border-2 border-[#d4a4a5] rounded-xl shadow-xl h-80 scale-90 md:scale-100 md:w-100 md:h-100"
                    novalidate>
                    <div id="form-group-${post.id}" class="m-5 md:m-10">
                        <div class="bg-[#fadadd] border-1 border-[#e8d7d8]">
                            <label for="editTitle-${post.id}" class="text-lg font-semibold text-[#d4a4a5]"> Edit Title: </label>
                            <input type="text" id="editTitle-${post.id}" name="editTitle"
                              class="border-2 border-[#d4a4a5] rounded-md ml-5" value="${post.title}" required>
                              <span class="font-semibold mt-2 text-red-500" id="editTitleEr-${post.id}"></span>
                        </div>
                        <div class="bg-[#fadadd] border-1 border-[#e8d7d8] md:mt-5">
                          <label for="contentArea-${post.id}" class="text-lg font-semibold text-[#d4a4a5]"> Edit your article: </label>
                          <textarea id="contentArea-${post.id}" name="contentArea" rows="6"
                              class="edit-field border-2 border-[#d4a4a5] rounded-md ml-5 md:mt-5 w-70" required minlength="5">${post.content}</textarea>
                          <span class="font-semibold mt-2 text-red-500" id="editTxtEr-${post.id}"></span>
                        </div>
                        <div class="bg-[#fadadd] border-1 border-[#e8d7d8] md:mt-3">
                            <label for="editdate" class="text-lg font-semibold text-[#d4a4a5]"> Date:
                            </label>
                            <input type="date" id="editdate" name="editdate"
                                 class="border-3 border-[#d4a4a5] ml-5 rounded-lg" 
                                 value="${formatToInputDate(post.date)}" />
                            <span class="font-semibold mt-2" id="editDateEr"></span>

                        </div>
                        <div class=" mt-5 m-5">
                            <button id="editPostBtn"
                                class="font-semibold text-[#d4a4a5] bg-[#be123c] w-70 rounded-lg shadow-xl"> Post It
                            </button>
                        </div>
                    </div>
                </form>
            </div>
      
      `;

    const currentEditTitle = editPopUp.querySelector(`#editTitle-${post.id}`);
    const currentEditContent = editPopUp.querySelector(
      `#contentArea-${post.id}`,
    );

    // Attach the validation listener dynamically
    [currentEditTitle, currentEditContent].forEach((field) => {
      field?.addEventListener("input", verifyField);
    });

    const editBtn = postItUI.querySelector("#editBtn");

    editBtn.addEventListener("click", function () {
      if (editPopUpContainer.classList.contains("hidden")) {
        editPopUpContainer.classList.remove("hidden");
        editPopUpContainer.classList.add("flex");
      } else {
        editPopUpContainer.classList.remove("flex");
        editPopUpContainer.classList.add("hidden");
      }
    });

    function formatToInputDate(dateString) {
      if (!dateString) return "";

      const date = new Date(dateString);
      // Ensure the date object is valid before continuing
      if (isNaN(date.getTime())) return "";

      const year = date.getFullYear();
      // padding single digits with a leading zero (e.g., '9' becomes '09')
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    }

    // let editedTitle = editPopUp.querySelector("#editTitle");
    // let editedContent = editPopUp.querySelector("#editcontentArea");
    let editedDate = editPopUp.querySelector("#editdate");

    const editPstBtn = editPopUp.querySelector("#editPostBtn");

    editPopUp.dataset.currentPostId = post.id;

    editPstBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const editFormVar = editPopUp.querySelector(`#editForm-${post.id}`);

      let editTitleField = editPopUp.querySelector(`#editTitle-${post.id}`);
      let editTextAreaField = editPopUp.querySelector(
        `#contentArea-${post.id}`,
      );
      let editDateField = editPopUp.querySelector("#editdate");

      if (!editFormVar.checkValidity()) {
        editTitleField.dispatchEvent(new Event("input"));
        editTextAreaField.dispatchEvent(new Event("input"));
        editDateField.dispatchEvent(new Event("input"));
        console.log("Validation failed. Post-it not created.");
        return;
      }
      let postItId = post.id;
      let postItIndex = postitArray.findIndex((item) => item.id === postItId);

      if (editTitleField.value) {
        postitArray[postItIndex].title = editTitleField.value;
      }
      if (editTextAreaField.value) {
        postitArray[postItIndex].content = editTextAreaField.value;
      }
      if (editDateField.value) {
        postitArray[postItIndex].date = new Date(
          editedDate.value + "T00:00:00",
        ).toLocaleDateString();
      } else {
        postitArray[postItIndex].date = "";
      }

      localStorage.setItem("savedPosts", JSON.stringify(postitArray));
      renderPostIts(postitArray); // pass postItArray to render Function
    });

    const delBtn = postItUI.querySelector("#deleteBtn");
    delBtn.addEventListener("click", function () {
      deletePost(post);
    });

    editPopUpContainer.appendChild(editPopUp);
    postItUI.appendChild(editPopUpContainer);
    postHereArea.appendChild(postItUI);
  });
}

function deletePost(deletePost) {
  postitArray = postitArray.filter((item) => item.id !== deletePost.id);
  localStorage.setItem("savedPosts", JSON.stringify(postitArray));
  renderPostIts(postitArray);
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

function verifyField(e) {
  let inputField = e.target;
  e.target.setCustomValidity("");

  const dynamicErrorSpan =
    inputField.id.startsWith("editTitle-") ||
    inputField.id.startsWith("contentArea-")
      ? inputField.nextElementSibling
      : null;

  if (!inputField.checkValidity()) {
    inputField.classList.remove("valid");
    inputField.classList.add("invalid");
  }

  const isTooShort = inputField.validity.tooShort;
  const isMissing = inputField.validity.valueMissing;
  const isValid = inputField.checkValidity();

  if (isTooShort || isMissing || !isValid) {
    inputField.classList.remove("valid");
    inputField.classList.add("invalid");

    // Force a friendly custom message if it hits your specific rules
    if (isTooShort || isMissing) {
      inputField.setCustomValidity("Field cannot be empty or too short.");
    }

    if (dynamicErrorSpan) {
      dynamicErrorSpan.innerText = inputField.validationMessage;
    }
    // Map errors to the UI elements
    if (inputField === titleHandle) {
      titleErrorH.innerText = inputField.validationMessage;
    } else if (inputField === textAreaHandle) {
      textAreaErrorH.innerText = inputField.validationMessage;
    }
  } else {
    // 4. Handle the VALID state flawlessly
    inputField.classList.add("valid");
    inputField.classList.remove("invalid");
    inputField.setCustomValidity(""); // Explicitly tell the browser this field passes

    if (dynamicErrorSpan) {
      dynamicErrorSpan.innerText = "";
    }
    // Clean up all UI text strings
    if (inputField === titleHandle) {
      titleErrorH.innerText = "";
    } else if (inputField === textAreaHandle) {
      textAreaErrorH.innerText = "";
    }
  }
}
// Event Listeners /////

postBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (!postItForm.checkValidity(e)) {
    titleHandle.dispatchEvent(new Event("input"));
    textAreaHandle.dispatchEvent(new Event("input"));
    return;
  }

  // create a new postIt object based on user input

  let newPostIt = {
    id: postitArray.length + 1,
    title: titleHandle.value,
    content: textAreaHandle.value,
    date: new Date(date.value + "T00:00:00").toLocaleDateString(),
  };

  postitArray.push(newPostIt); // add newly created postIt object to postItArray
  localStorage.setItem("savedPosts", JSON.stringify(postitArray));
  renderPostIts(postitArray); // pass postItArray to render Function
  postitFormVisibility(e);

  titleHandle.value = "";
  textAreaHandle.value = "";
  date.value = "";
});

newEntryBtn.addEventListener("click", function (e) {
  postitFormVisibility(e);
});

window.addEventListener("load", function () {
  // load saved posts in local storage on page load
  let savedPostsInLocStorageArray =
    JSON.parse(localStorage.getItem("savedPosts")) || [];
  renderPostIts(savedPostsInLocStorageArray);
});
