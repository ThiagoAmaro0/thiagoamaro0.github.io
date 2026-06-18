const params =
    new URLSearchParams(
        window.location.search
    );

const projectId =
    params.get("id");

fetch("data/projects.json")
    .then(response => response.json())
    .then(projects => {
        const project =
            projects.find(
                p => p.id === projectId
            );

        if (!project) {
            document.body.innerHTML =
                "<h1>Project not found</h1>";

            return;
        }

        document.title =
            project.title;

        document.getElementById("title")
            .textContent =
            project.title;

        document.getElementById("year")
            .textContent =
            project.year;

        document.getElementById("status")
            .textContent =
            project.status;

        const descriptionEl = project.description.replace(/\n/g, "<br>");
        document.getElementById("description")
            .innerHTML =
            descriptionEl;

        document.getElementById("teamSize")
            .textContent =
            project.teamSize;

        document.getElementById("duration")
            .textContent =
            project.duration;

        document.getElementById("banner")
            .innerHTML = `
        <video
            class="banner-video"
            controls
            autoplay
            muted
            loop
            preload="metadata">

            <source
                src="${project.video}"
                type="video/mp4">

        </video>
    `;

        fillList(
            "roles",
            project.roles
        );

        fillList(
            "technologies",
            project.technologies
        );

        fillList(
            "platforms",
            project.platforms
        );

        const links =
            document.getElementById(
                "links"
            );

        if (!project.links.github && !project.links.itchio && !project.links.youtube) {
            links.innerHTML += '<p>No links available.</p>';
        }

        if (project.links.github) {
            links.innerHTML += `
        <a href="${project.links.github}"
           target="_blank">

           <i class="fa-brands fa-github"></i>
           GitHub

        </a>`;
        }

        if (project.links.itchio) {
            links.innerHTML += `
        <a href="${project.links.itchio}"
           target="_blank">

           <i class="fa-solid fa-gamepad"></i>
           Itch.io

        </a>`;
        }

        if (project.links.youtube) {
            links.innerHTML += `
        <a href="${project.links.youtube}"
           target="_blank">

           <i class="fa-brands fa-youtube"></i>
           YouTube

        </a>`;
        }

        const gallery =
            document.getElementById(
                "gallery"
            );

        project.gallery.forEach(image => {
            gallery.innerHTML += `
            <img src="${image}">
        `;
        });
    });

function fillList(id, items) {
    const list =
        document.getElementById(id);

    items.forEach(item => {
        const li =
            document.createElement("li");

        li.textContent =
            item;

        list.appendChild(li);
    });
}