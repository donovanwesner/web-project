// Initialize filters
const catalogList = document.getElementById("catalogDisplay");
const pageList = document.getElementById("pageNav");

const filter4k = catalogItems.filter((is4k) => is4k.format === "4k");
const filter4kbd = catalogItems.filter((is4kbd) => is4kbd.format === "4kbd");
const filterBd = catalogItems.filter((isBd) => isBd.format === "bd");
const filterSdbd = catalogItems.filter((isSdbd) => isSdbd.format === "sdbd");
const filterDvd = catalogItems.filter((isDvd) => isDvd.format === "dvd");

let itemsPerPage = 24;

var visibleItems = catalogItems;
var pageNumber = Math.ceil(JSON.stringify(visibleItems.length)/itemsPerPage);
var pageLength = Array.from({length: pageNumber}, (v, i) => i);

// init bootpag
$('#page-selection').bootpag({
    total: pageNumber
}).on("page", function(event, /* page number here */ num){
     $("#content").html("Insert content"); // some ajax content loading...
});

// Functions to create catalog items
function createItem(format,title,released,timg,turl) {
    return `
    <div class="catalogEntry col-xxl-2 col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6 pb-3" data-title="${title}" data-format="${format}" data-released="${released}">
    <div class="card bg-${format} bg-gradient w-100 h-100">
	<a href="./catalog/${turl}.htm" class="pb-2 px-2" style="text-align: center; color: white;"><img class="img-fluid py-2" src="./images/covers/${timg}.jpg" style="border-radius: 7%;">
	<br>
	${title}</a>
	</div>
    </div>
    `
}

function createPageNav() {
    pageList.innerHTML = `
                <li class="page-item">
                    <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                    </a>
                </li>
    `;
}
function addPageNav(pageId) {
    pageList.innerHTML += `
    <li class="page-item"><a class="page-link" href="#">${pageId}</a></li>
    `
}
function endPageNav () {
    pageList.innerHTML += `
    <li class="page-item">
                    <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                    </a>
                </li>
    `
}

function createItemList() {
visibleItems.forEach (
    item=>{
        catalogList.innerHTML += createItem(
            item.format,
            item.title,
            item.released,
            item.title.replace(/\s+/g, '').replace(/\:/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\'/g, '').replace(/\-/g, ''),
            item.title.replace(/\s+/g, '-').replace(/\:/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\'/g, '')
        )
    }
)
createPageNav();
pageLength.forEach (
    pageId=>{
        addPageNav(
            pageId+1,
        );
    }
)
endPageNav();
}

createItemList();


// Filter functions
function refreshItems() {
    catalogList.replaceChildren();
    pageList.replaceChildren();
    createItemList();
}

function showAll() {
    visibleItems = catalogItems;
    pageNumber = Math.ceil(JSON.stringify(visibleItems.length)/24);
    pageLength = Array.from({length: pageNumber}, (v, i) => i);
    refreshItems();
}
function show4k() {
    visibleItems = filter4k;
    pageNumber = Math.ceil(JSON.stringify(visibleItems.length)/24);
    pageLength = Array.from({length: pageNumber}, (v, i) => i);
    refreshItems();
}
function show4kbd() {
    visibleItems = filter4kbd;
    pageNumber = Math.ceil(JSON.stringify(visibleItems.length)/24);
    pageLength = Array.from({length: pageNumber}, (v, i) => i);
    refreshItems();
}
function showBd() {
    visibleItems = filterBd;
    pageNumber = Math.ceil(JSON.stringify(visibleItems.length)/24);
    pageLength = Array.from({length: pageNumber}, (v, i) => i);
    refreshItems();
}
function showSdbd() {
    visibleItems = filterSdbd;
    pageNumber = Math.ceil(JSON.stringify(visibleItems.length)/24);
    pageLength = Array.from({length: pageNumber}, (v, i) => i);
    refreshItems();
}
function showDvd() {
    visibleItems = filterDvd;
    pageNumber = Math.ceil(JSON.stringify(visibleItems.length)/24);
    pageLength = Array.from({length: pageNumber}, (v, i) => i);
    refreshItems();
}

// Search function
function searchCatalog() {
    let input = document.getElementById('catalogSearch').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('catalogEntry');

    for (i = 0; i < x.length; i++) {
        if (!x[i].dataset.title.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "";
        }
    }
}