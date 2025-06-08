function loadSection(file) {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById("content").innerHTML = html;
    })
    .catch((err) => {
      document.getElementById("content").innerHTML = "<p>Error loading section.</p>";
    });
}
