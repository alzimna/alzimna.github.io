function setAttributes(element, attributes) {
    Object.keys(attributes).forEach(key => {
        element.setAttribute(key, attributes[key]);
    });
}

async function loadProjects() {
    try {
        const response = await fetch("assets/data/projects.json");
        const projects = await response.json();

        const cardList = document.querySelector(".card-list")

        for (let i = 0; i < projects.length; i++) {
            let project = projects[i];
            let projectItem = document.createElement('li');
            let projectId = "project_" + (i + 1);

            projectItem.id = projectId;
            projectItem.classList.add("swiper-slide", "carousel-card-container");
            projectItem.setAttribute('role', 'group');

            let projectBody = document.createElement('div');
            projectBody.classList.add("carousel-card-body");

                let projectImageContainer = document.createElement('div');
                projectImageContainer.classList.add("project-card-image-container");
                let projectBlur = document.createElement('div');
                projectBlur.classList.add("project-card-image-blur");
                    let projectBlurRepo = document.createElement('div');
                    projectBlurRepo.classList.add("project-card-blur-repo");
                        let projectBlurRepoLink = document.createElement('a');
                        setAttributes(projectBlurRepoLink, {
                            "target": "_blank",
                            "class": "project-card-blur-link",
                            "href": project["github"],
                            "aria-label" : "Github Button"
                        });
                            let projectBlurRepoImage = document.createElement('i');
                            setAttributes(projectBlurRepoImage, {
                                "class" : "fa-brands fa-github",
                                "stroke" : "currentColor",
                                "fill" : "currentColor",
                                "stroke-width" : "0",
                                "viewBox" : "0 0 496 512",
                                "font-size" : "1.5rem",
                                "height" : "1em",
                                "width" : "1em"
                            });
                        projectBlurRepoLink.append(projectBlurRepoImage);
                    projectBlurRepo.append(projectBlurRepoLink);
                projectBlur.append(projectBlurRepo);

            let projectImage = document.createElement('img');
            setAttributes(projectImage,{
                "alt" : "Project Preview Thumbail",
                "src" : project["image"],
                "class" : "project-card-image",
                "style" : "object-fit: cover; height: 250px; width: 100%"
            });
            projectImageContainer.append(projectBlur,projectImage);


            let projectLink = document.createElement('a');
            setAttributes(projectLink, {
                "target": "_blank",
                "class": "carousel-card-link fw-bold",
                "href": project["github"],
            });
            projectLink.textContent = project["title"];

            let projectTechContainer = document.createElement('div');
            projectTechContainer.classList.add("carousel-card-techstack-container");
            for (let j = 0; j < project["techstack"].length; j++) {
                let tech = project["techstack"][j];
                let techItem = document.createElement('span');
                techItem.classList.add("carousel-card-techstack", "fw-bold");
                let techImage = document.createElement('img');
                setAttributes(techImage, {
                    "class": "carousel-card-techstack-img",
                    "alt": "Tech Stack Logo",
                    "src": tech["icon"]
                });
                let techText = document.createElement('p');
                techText.textContent = tech["name"];
                techItem.appendChild(techImage);
                techItem.insertBefore(techText, techImage);
                projectTechContainer.appendChild(techItem);
            }

            let projectDesc = document.createElement('p');
            projectDesc.classList.add("carousel-card-desc");
            projectDesc.textContent = project["description"];

            projectBody.append(projectImageContainer,projectLink,projectTechContainer,projectDesc);

            let projectFooter = document.createElement('div');
            projectFooter.classList.add("carousel-card-footer");
            let projectFooterButtonContainer = document.createElement('div');
            setAttributes(projectFooterButtonContainer,{
                "role" : "group",
                "class" : "carousel-card-button-container",
                "data-orientation" : "horizontal"
            })

            let projectFooterButton = document.createElement('button');
            setAttributes(projectFooterButton,{
                    "class" : "carousel-card-button-detail fw-medium",
                    "type" : "button"});
            projectFooterButton.textContent = "Details";
            let projectFooterButtonIcon = document.createElement('span');
            setAttributes(projectFooterButtonIcon,{
                "class" : "project-card-button-icon fa-solid fa-circle-arrow-right"
            });
            projectFooterButton.append(projectFooterButtonIcon);

            let projectFooterPreviewButton = document.createElement('a');
            setAttributes(projectFooterPreviewButton,{
                "target" : "_blank",
                "href" : project["preview"],
                "class" : "carousel-card-button-preview fw-medium",
                "type" : "button"});
            projectFooterPreviewButton.textContent = "Preview";
            let projectFooterPreviewIcon = document.createElement('span');
            setAttributes(projectFooterPreviewIcon,{
                "class" : "carousel-card-button-icon fa-solid fa-eye"
            });
            projectFooterPreviewButton.append(projectFooterPreviewIcon);

            projectFooterButtonContainer.appendChild(projectFooterPreviewButton);
            projectFooterButtonContainer.insertBefore(projectFooterButton,projectFooterPreviewButton);
            projectFooter.append(projectFooterButtonContainer);


            projectItem.append(projectBody, projectFooter);
            cardList.appendChild(projectItem);
        }

    } catch (error) {
        console.error("Failed to load projects:", error);
    };

    initModal();

    new Swiper('.card-wrapper', {
        spaceBetween: 50,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        breakpoints: {
            0: {
                slidesPerView: 1

            },
            650: {
                slidesPerView: 2,
            },
        }
    });
}

loadProjects();