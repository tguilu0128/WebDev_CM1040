function validateMainData(data) {
    if (!data.mainpage) {
        console.log("Error: mainpage is missing");
        return false;
    }

    if (!Array.isArray(data.mainpage)) {
        console.log("Error: mainpage must be an array");
        return false;
    }

    for (let article of data.mainpage) {

        if (!article.id) {
            console.log("Error: Article ID is missing");
            return false;
        }

        if (!article.description) {
            console.log("Error: Article description is missing");
            return false;
        }
    }

    return true;
}
const main = document.getElementById("main");

if (main) {

    fetch("main.json")
        .then(response => response.json())
        .then(data => {
    
            if (!validateMainData(data)) {
            document.getElementById("main").innerHTML =
                "<p>Sorry, there is an error with the website data.</p>";
            return;
        }
        const templateElement =
                document.getElementById("article-card-template");

            const template = templateElement.innerHTML;

            const compile = Handlebars.compile(template);


            data.mainpage.forEach(article => {

                main.innerHTML += `
                   <article onclick="window.location.href='article.html?id=${article.id}'">
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <p>Click to Read More.</p>
                    </article>
                `;

            });

        });
        
}
const articleList = document.getElementById("article");

if (articleList) {

    const id = new URLSearchParams(window.location.search).get("id");

    fetch("article.json")
        .then(response => response.json())
        .then(data => {
            const article = data.articles.find(article => article.id == id);
            
            if (!article) {
            articleList.innerHTML =
                    "<p>Sorry, this article could not be found.</p>";

                return;
        }
            
                articleList.innerHTML += `
                    <article>

                    <h2>${article.title}</h2>

                    ${article.content.map(item => {

                        if (typeof item === "string") {
                            return `<p>${item}</p>`;
                        }

                        if (item.type === "image") {
                            return `
                                <div class="article-image">
                                    <img src="${item.src}" alt="${item.alt}">
                                    <p class="caption">${item.caption}</p>
                                </div>
                            `;
                        }

                    }).join("")}

                    

                </article>
            `;


    });
}