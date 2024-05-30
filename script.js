// Function to clear localStorage
function clearLocalStorage() {
  localStorage.removeItem("savedSections");
  localStorage.removeItem("likedSections");
}

// Function to save a section for later
function saveForLater(sectionId) {
  let savedSections = JSON.parse(localStorage.getItem("savedSections")) || [];

  if (!savedSections.includes(sectionId)) {
    savedSections.push(sectionId);
    localStorage.setItem("savedSections", JSON.stringify(savedSections));

    const totalSaved = savedSections.length;
    alert(`Section saved for later! You have ${totalSaved} item(s) in your Save for Later folder.`);

    const button = document.querySelector(`#${sectionId} .save-button`);
    if (button) {
      button.innerText = "Saved";
      button.style.color = "green";
    }
  } else {
    alert("Section is already saved.");
  }
}

// Function to view saved sections
function viewSavedSections() {
  const savedSections = JSON.parse(localStorage.getItem("savedSections")) || [];
  const savedContainer = document.getElementById("saved-sections");

  if (!savedContainer) {
    console.error("Element with id 'saved-sections' not found.");
    return;
  }

  savedContainer.innerHTML = "";

  if (savedSections.length === 0) {
    savedContainer.innerHTML = "<p>No sections saved.</p>";
    return;
  }

  savedSections.forEach((sectionId) => {
    const sectionContent = getSectionContent(sectionId);
    const savedSection = document.createElement("div");
    savedSection.className = "saved-section";
    savedSection.innerHTML = sectionContent;
    savedContainer.appendChild(savedSection);
  });
}

// Function to retrieve the content of a section by its ID
function getSectionContent(sectionId) {
  const sectionMapping = {
    section1: "<p>You have saved section 1 on the homepage.</p>",
    section2: "<p>You have saved section 2 on the homepage.</p>",
    section3: "<p>You have saved section 3 on the homepage.</p>",
    section4: "<p>You have saved section 1 on the details page.</p>",
    section5: "<p>You have saved section 2 on the details page.</p>",
    section6: "<p>You have saved section 3 on the details page.</p>",
    section7: "<p>You have saved section 1 on the about me page.</p>",
    section8: "<p>You have saved section 2 on the about me page.</p>",
    section9: "<p>You have saved section 3 on the about me page.</p>",
  };

  return sectionMapping[sectionId] || "<p>Section not found.</p>";
}

// Function to clear saved sections and immediately update the displayed sections
function clearSavedSections() {
  clearLocalStorage();
  viewSavedSections();
  alert("All saved sections have been cleared.");
}

// Function to handle comment submission
function submitComment(event, sectionId) {
  event.preventDefault();
  const textarea = document.getElementById(`comment-${sectionId}`);
  const comment = textarea.value.trim();
  if (comment) {
    alert(`Comment submitted for ${sectionId}: ${comment}`);
    textarea.value = "";
  } else {
    alert("Please enter a comment.");
  }
}

// Function to handle likes
function likeSection(sectionId) {
  let likedSections = JSON.parse(localStorage.getItem("likedSections")) || [];

  if (!likedSections.includes(sectionId)) {
    likedSections.push(sectionId);
    localStorage.setItem("likedSections", JSON.stringify(likedSections));

    const button = document.querySelector(`#${sectionId} .like-button`);
    if (button) {
      button.innerText = "Liked";
      button.style.color = "green";
    }
    alert(`You liked this section`);
  } else {
    alert("Section is already liked.");
  }
}

// Function to check liked sections and update the UI accordingly
function checkLikedSections() {
  const likedSections = JSON.parse(localStorage.getItem("likedSections")) || [];
  likedSections.forEach((sectionId) => {
    const button = document.querySelector(`#${sectionId} .like-button`);
    if (button) {
      button.innerText = "Liked";
      button.style.color = "green";
    }
  });
}

// Function to handle contact form submission
function submitContactForm(event) {
  event.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if (name && email && message) {
    alert(`Thank you for contacting us, ${name}. We will get back to you shortly.`);
    document.getElementById("contact-name").value = "";
    document.getElementById("contact-email").value = "";
    document.getElementById("contact-message").value = "";
  } else {
    alert("Please fill in all fields.");
  }
}

// Function to toggle the visibility of a section
function toggleSectionVisibility(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    if (section.style.display === "none") {
      section.style.display = "block";
    } else {
      section.style.display = "none";
    }
  }
}

// Add slide-in animation to h2 elements on page load
document.addEventListener("DOMContentLoaded", () => {
  const headings = document.querySelectorAll("h1");
  headings.forEach((heading) => {
    heading.classList.add("h1-slide-in");
  });
});

// Initialize the page by checking liked sections
document.addEventListener("DOMContentLoaded", checkLikedSections);

// Function to animate all h2 elements
function animateHeadings() {
  return new Promise((resolve) => {
    const headings = document.querySelectorAll("h2");
    let completed = 0;

    headings.forEach((heading) => {
      heading.classList.add("slide-out-in");
      heading.addEventListener(
        "animationend",
        () => {
          completed++;
          heading.classList.remove("slide-out-in");
          if (completed === headings.length) {
            resolve();
          }
        },
        { once: true }
      );
    });
  });
}

// Function to save data to localStorage
function saveDataToLocalStorage(dataKey, dataValue) {
  return new Promise((resolve) => {
    localStorage.setItem(dataKey, JSON.stringify(dataValue));
    resolve();
  });
}

// Function to update the UI based on saved data
function updateStatusMessage(dataKey) {
  return new Promise((resolve) => {
    const savedData = JSON.parse(localStorage.getItem(dataKey));
    resolve();
  });
}

// Function to perform the chained effects
async function performChainedEffects() {
  await animateHeadings();
  await saveDataToLocalStorage("myData", "This is a test");
  await updateStatusMessage("myData");
}

// Ensure the DOM is fully loaded before adding the event listener
document.addEventListener("DOMContentLoaded", () => {
  const triggerButton = document.getElementById("triggerButton");
  if (triggerButton) {
    triggerButton.addEventListener("click", performChainedEffects);
  } else {
    console.error("Element with id 'triggerButton' not found.");
  }
});
