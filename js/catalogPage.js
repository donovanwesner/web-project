var pageTitle = document.querySelector("#pageTitle").dataset.name;
var catalogTitle = pageTitle.trim();

function createHTML(name) {
    return `
    <title>Discotek Media > ${name}</title>
    `
}
function createImage(timg) {
    return `
    <img class="img-fluid py-2" src="./images/covers/${timg}.jpg" style="border-radius: 7%;">
    `
}
function createName(name) {
    return `
    <text style="font-size:30px"><b>${name}</b></text>
    `
}
function createBadge(format,formatlong) {
    return `<span class="bg-${format} bg-gradient p-1 rounded text-white"><text class="h6">${formatlong}</text></span>`
}
function createBadge2(c1,c2,formatlong) {
    return `<span class="p-1 rounded text-white" style="background: linear-gradient(180deg, #${c1}, #${c2}) !important;"><text class="h6">${formatlong}</text></span>`
}
function createMsrp(tmsrp) {
    return `
    <text style="font-size:30px"><b>$${tmsrp}</text><text style="font-size:20px"> MSRP</text>
    `
}
function createHTMLcr(url) {
    return `<a href="${url}"><button class="btn bg-crunchyroll bg-gradient btn-lg btn-block w-100"><img src="./images/crunchyroll.svg" class="img-fluid"></button></a>`
}
function createHTMLamz(url) {
    return `<a href="${url}"><button class="btn bg-amazon bg-gradient btn-lg btn-block w-100"><img src="./images/amazon.svg" class="img-fluid"></button></a>`
}
function createHTMLdiab(url) {
    return `<a href="${url}"><button class="btn bg-diab bg-gradient btn-lg btn-block w-100"><img src="./images/diabolik.png" height="32px"></button></a>`
}
function createHTMLracs(url) {
    return `<a href="${url}"><button class="btn bg-diab bg-gradient btn-lg btn-block w-100"><img src="./images/racs.png" class="img-fluid"></button></a>`
}
function createDate(tdate) {
    return `
    ${tdate}
    `
}

document.getElementById("pageTitle").innerHTML += createHTML(
    catalogTitle
)

const catalogData = catalogItems.find(item=>item.title==catalogTitle);

document.getElementById("titleImage").innerHTML += createImage(
    catalogData.title.replace(/\s+/g, '').replace(/\:/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\-/g, '').replace(/\'/g, '')
)

document.getElementById("pageName").innerHTML += createName(
    catalogTitle
)

const elements = document.getElementsByClassName("titleMsrp");
Array.from(elements).map(el => {
  el.innerHTML = createMsrp(
    catalogData.msrp
  )
});

if(catalogData.format === `4k`){
document.getElementById("pageBadges").innerHTML += createBadge(
    catalogData.format, `4K Ultra HD`
)
}

if(catalogData.format === `bd`){
    document.getElementById("pageBadges").innerHTML += createBadge(
        catalogData.format, `Blu-ray`
    )
}

if(catalogData.format === `4kbd`){
    document.getElementById("pageBadges").innerHTML += createBadge2(
        `1e1e1e`,`157cdf`,`4K Ultra HD + Blu-ray`
    )
}

if(catalogData.format === `sdbd`){
    document.getElementById("pageBadges").innerHTML += createBadge(
        catalogData.format, `SD Blu-ray`
    )
}

if(catalogData.format === `dvd`){
    document.getElementById("pageBadges").innerHTML += createBadge(
        catalogData.format, `DVD`
    )
}

const elements3 = document.getElementsByClassName("titleButtons");
Array.from(elements3).map(el => {
    if("oop" in catalogData) {
        if(catalogData.oop === "yes"){
        el.innerHTML += `
        <div class="d-flex row">
            <div class="bg-oop bg-gradient">
                <div class="d-flex col justify-content-center">
                    <text class="p-3 text-white" style="font-size:20px;"><b>This title is out of print</b></text>
                </div>
            </div>
        </div>
        `;
        }
        if(catalogData.oop === "soon"){
            el.innerHTML += `
                <div class="bg-oop bg-gradient">
                    <div class="d-flex col justify-content-center">
                        <text class="px-3 pt-3 text-white" style="font-size:20px;"><b>This title is going out of print once all remaining copies have been sold. Order while supplies last from:</b></text>`
                        if("crurl" in catalogData) {
                            el.innerHTML += createHTMLcr(
                                catalogData.crurl
                            )
                        }
                        if("amzurl" in catalogData) {
                            el.innerHTML += createHTMLamz(
                                catalogData.amzurl
                            )
                        }
                        if("diaburl" in catalogData) {
                            el.innerHTML += createHTMLdiab(
                                catalogData.diaburl
                            )
                        }
                        if("racsurl" in catalogData) {
                            el.innerHTML += createHTMLracs(
                                catalogData.racsurl
                            )
                        }
                    el.innerHTML += `</div>
                </div>
            `;
        }
    }
    else{
            el.innerHTML += `<text style="font-size:20px"><b><u>Order now from:</u></b></text>`;
    if("crurl" in catalogData) {
        el.innerHTML += createHTMLcr(
            catalogData.crurl
        )
    }
    if("amzurl" in catalogData) {
        el.innerHTML += createHTMLamz(
            catalogData.amzurl
        )
    }
    if("diaburl" in catalogData) {
        el.innerHTML += createHTMLdiab(
            catalogData.diaburl
        )
    }
    if("racsurl" in catalogData) {
        el.innerHTML += createHTMLracs(
            catalogData.racsurl
        )
    }
    }}
);

document.getElementById("pageReleased").innerHTML += createDate(
    catalogData.released
)