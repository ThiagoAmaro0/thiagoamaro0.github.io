const grid = document.getElementById("projects-grid");

fetch("data/projects.json")
    .then(response => response.json())
    .then(projects => {
        projects.forEach(project => {
            const tags = project.technologies
                .slice(0, 3)
                .map(t => `<span class="project-tag">${t}</span>`)
                .join("");

            const card = document.createElement("a");

            card.className = "project-card";

            card.href = `project.html?id=${project.id}`;

            card.innerHTML = `
            <div class="media-container">

                <img
                    src="${project.thumbnail}"
                    class="project-image">

                <video
                    class="project-video"
                    muted
                    loop
                    preload="metadata">

                    <source
                        src="${project.video}"
                        type="video/mp4">

                </video>

            </div>

            <div class="project-content">

                <h3>${project.title}</h3>

                <p>${project.shortDescription}</p>

                <div class="project-tags">
                    ${tags}
                </div>

            </div>
        `;

            const video =
                card.querySelector(".project-video");

            card.addEventListener("mouseenter", () => {
                video.currentTime = 0;
                video.play();
            });

            card.addEventListener("mouseleave", () => {
                video.pause();
                video.currentTime = 0;
            });

            grid.appendChild(card);
        });
    });

const backToTop =
    document.getElementById(
        "backToTop"
    );

window.addEventListener(
    "scroll",
    () => {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
            backToTop.classList.add(
                "show"
            );
        }
        else {
            backToTop.style.display = "none";
            backToTop.classList.remove(
                "show"
            );
        }
    }
);

backToTop.addEventListener(
    "click",
    () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
);