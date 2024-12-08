const indexList = document.getElementById("nowAvailable");

let getDate = new Date()
let currentDate = getDate.toISOString().split('T')[0]

const outItems = catalogItems.filter((isOutNow => isOutNow.released < currentDate));
var visibleItems = outItems.slice(0,12);

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

function createListIndex() {
    visibleItems.forEach (
        item=>{
            indexList.innerHTML += createItem(
                item.format,
                item.title,
                item.released,
                item.title.replace(/\s+/g, '').replace(/\:/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\'/g, '').replace(/\-/g, ''),
                item.title.replace(/\s+/g, '-').replace(/\:/g, '').replace(/\(/g, '').replace(/\)/g, '').replace(/\,/g, '').replace(/\./g, '').replace(/\!/g, '').replace(/\?/g, '').replace(/\'/g, '')
            )
        }
    )
}

createListIndex();