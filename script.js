// script.js
document.addEventListener("DOMContentLoaded", () => {
  // `songs` must be available from data.js
  const list = document.getElementById("song-list");
  const search = document.getElementById("search");

  function renderSongs(filteredSongs) {
    list.innerHTML = "";
    if (!filteredSongs.length) {
      list.innerHTML = "<li>No songs found.</li>";
      return;
    }
    filteredSongs.forEach(song => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = `song.html?id=${song.id}`;
      a.textContent = `${song.id}. ${song.title}`;
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  // initial render
  renderSongs(songs);

  // improved search: supports ID, title, altTitle
  search.addEventListener("input", () => {
    const q = search.value.trim().toLowerCase();
    if (!q) {
      renderSongs(songs);
      return;
    }

    // if user typed a number anywhere (e.g. "1", "1st", "song 1")
    const idMatch = q.match(/\d+/);

    const filtered = songs.filter(song => {
      // 1. Match numeric ID
      if (idMatch && song.id === parseInt(idMatch[0], 10)) return true;

      // 2. Match title (Telugu or English title)
      if (song.title.toLowerCase().includes(q)) return true;

      // 3. Match altTitle if it exists
      if (song.altTitle && song.altTitle.toLowerCase().includes(q)) return true;

      // 4. Match ID typed as string
      if (String(song.id).includes(q)) return true;

      return false;
    });

    renderSongs(filtered);
  });
});
