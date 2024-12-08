// Initialize filters
const catalogList = document.getElementById("catalogDisplay");
const pageList = document.getElementById("pageNav");

const filter4k = catalogItems.filter((is4k) => is4k.format === "4k");
const filter4kbd = catalogItems.filter((is4kbd) => is4kbd.format === "4kbd");
const filterBd = catalogItems.filter((isBd) => isBd.format === "bd");
const filterSdbd = catalogItems.filter((isSdbd) => isSdbd.format === "sdbd");
const filterDvd = catalogItems.filter((isDvd) => isDvd.format === "dvd");

let itemsPerPage = 12;

var visibleItems = catalogItems;
var totalPages = Math.ceil(JSON.stringify(visibleItems.length)/itemsPerPage);
var totalPageLength = Array.from({length: totalPages}, (v, i) => i);
var currentPage = 1;

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

// Functions to create pagination
function createPageNav() {
    if(currentPage > 1){
        pageList.innerHTML = `
            <button class="btn-arrowl2" onclick="goToFirst()">&laquo;&laquo;</button>
            <button class="btn-arrowl" onclick="downApage()">&laquo;</button>
        `;
    }
    else{
        pageList.innerHTML = `
            <button class="btn-arrowl2" disabled>&laquo;&laquo;</button>
            <button class="btn-arrowl" disabled>&laquo;</button>
        `;
    }
}
function addPageNav(pageId) {
    if(currentPage === pageId){
        pageList.innerHTML += `
            <button class="btn-number" disabled>${pageId}</button>
        `
    }
    else{
        pageList.innerHTML += `
            <button class="btn-number" onclick="goToPage(this)">${pageId}</button>
        `
    }
}
function endPageNav () {
    if(currentPage === totalPages){
        pageList.innerHTML += `
            <button class="btn-arrowr" disabled>&raquo;</button>
            <button class="btn-arrowr2" disabled>&raquo;&raquo;</button>
        `
    }
    else{
        pageList.innerHTML += `
            <button class="btn-arrowr" onclick="upApage()">&raquo;</button>
            <button class="btn-arrowr2" onclick="goToLast()">&raquo;&raquo;</button>
        `
    }
}

// Functions to change current page when clicking on pagination buttons
function goToFirst() {
    currentPage = 1;
    createItemList();
    
}
function downApage() {
    currentPage = currentPage - 1;
    createItemList();
    
}
function upApage() {
    currentPage = currentPage + 1;
    createItemList();
    
}
function goToLast() {
    currentPage = totalPages;
    createItemList();
    
}
function goToPage(a) {
    currentPage = Number(a.innerText);
    createItemList();
}

function createItemList() {
    catalogList.innerHTML = '';
    if(currentPage > totalPages){ currentPage = 1; }
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = visibleItems.slice(startIndex, endIndex);

    itemsToShow.forEach(item => {
        catalogList.innerHTML += createItem(
            item.format,
            item.title,
            item.released,
            item.title.replace(/\s+/g, '').replace(/\:/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\'/g, '').replace(/\-/g, ''),
            item.title.replace(/\s+/g, '-').replace(/\:/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\'/g, '')
        );
    });
    createPageNav();

    let pageStartIndex = (currentPage - 4);
    if(pageStartIndex < 0){pageStartIndex = 0;} // set to 0 if pageStartIndex returns a negative value
    let pageEndIndex = pageStartIndex + 7;
    if(pageEndIndex > totalPages){pageEndIndex = totalPages;} // cap pageEndIndex at var totalPages's value
    if(pageStartIndex > totalPages - 7){pageStartIndex = totalPages - 7; if(pageStartIndex < 0){pageStartIndex = 0;}}
    if(pageEndIndex > totalPages){pageEndIndex = totalPages;}
    const pagesToShow = totalPageLength.slice(pageStartIndex, pageEndIndex);

    pagesToShow.forEach (
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
    catalogList.innerHTML = '';
    pageList.innerHTML = '';
    createItemList();
}

function showAll() {
    visibleItems = catalogItems;
    totalPages = Math.ceil(JSON.stringify(visibleItems.length)/itemsPerPage);
    totalPageLength = Array.from({length: totalPages}, (v, i) => i);
    refreshItems();
}
function show4k() {
    visibleItems = filter4k;
    totalPages = Math.ceil(JSON.stringify(visibleItems.length)/itemsPerPage);
    totalPageLength = Array.from({length: totalPages}, (v, i) => i);
    refreshItems();
}
function show4kbd() {
    visibleItems = filter4kbd;
    totalPages = Math.ceil(JSON.stringify(visibleItems.length)/itemsPerPage);
    totalPageLength = Array.from({length: totalPages}, (v, i) => i);
    refreshItems();
}
function showBd() {
    visibleItems = filterBd;
    totalPages = Math.ceil(JSON.stringify(visibleItems.length)/itemsPerPage);
    totalPageLength = Array.from({length: totalPages}, (v, i) => i);
    refreshItems();
}
function showSdbd() {
    visibleItems = filterSdbd;
    totalPages = Math.ceil(JSON.stringify(visibleItems.length)/itemsPerPage);
    totalPageLength = Array.from({length: totalPages}, (v, i) => i);
    refreshItems();
}
function showDvd() {
    visibleItems = filterDvd;
    totalPages = Math.ceil(JSON.stringify(visibleItems.length)/itemsPerPage);
    totalPageLength = Array.from({length: totalPages}, (v, i) => i);
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