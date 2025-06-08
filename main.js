function loadSection(file) {
  fetch(file)
    .then((res) => res.text())
    .then((html) => {
      const contentEl = document.getElementById("content");
      contentEl.innerHTML = html;

      buildSidebar();
    })
    .catch((err) => {
      document.getElementById("content").innerHTML = "<p>Error loading section.</p>";
    });
}

function buildSidebar() {
  const toc = document.getElementById("toc");
  toc.innerHTML = "";

  const content = document.getElementById("content");

  const h2s = content.querySelectorAll("h2");
  h2s.forEach((h2) => {
    const id = h2.querySelector("a")?.id || h2.textContent.trim().replace(/\s+/g, "_");
    h2.id = id;

    const li = document.createElement("li");
    const a = document.createElement("a");
    a.href = `#${id}`;
    a.textContent = h2.textContent;
    li.appendChild(a);

    // Find h3s that follow this h2 (until next h2)
    const sublist = document.createElement("ul");
    let next = h2.nextElementSibling;
    while (next && next.tagName !== "H2") {
      if (next.tagName === "H3") {
        const h3Id = next.querySelector("a")?.id || next.textContent.trim().replace(/\s+/g, "_");
        next.id = h3Id;

        const subItem = document.createElement("li");
        subItem.style.marginLeft = "1rem";
        const subLink = document.createElement("a");
        subLink.href = `#${h3Id}`;
        subLink.textContent = next.textContent;
        subItem.appendChild(subLink);
        sublist.appendChild(subItem);
      }
      next = next.nextElementSibling;
    }

    li.appendChild(sublist);
    toc.appendChild(li);
  });
}
