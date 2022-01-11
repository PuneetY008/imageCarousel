const imgContainerDiv = document.getElementById('imgContainer');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const displayPage = document.getElementById('displayPage');
let pageNo = 0;

//enable disable prev button
function checkPrevBtn(){
    if(pageNo>1){
        btnPrev.disabled = false;
    }
    else{
        btnPrev.disabled = true;
    }
}

//function to fetch and show images
async function showImages(pageNo){
    let config = {params:{client_id:'NSQcsUNE-j1CUDFPgOVOZasq97m07FLQZHChINvBjRM',page:pageNo,per_page:25},headers:{'Accept-Version': 'v1'}};
    let res = await axios.get('https://api.unsplash.com/photos',config);
    let data = res.data;
    console.log(data);
    for(let obj of data){
        console.log(obj.urls.regular);
        let url = obj.urls.regular;
        let newDiv = document.createElement('div');
        newDiv.classList.add('newDiv');
        let newImg = document.createElement('img');
        newImg.setAttribute('src',url);
        newDiv.appendChild(newImg);
        imgContainerDiv.appendChild(newDiv);
    }
}

window.onload = function(){
    document.getElementById('getImages').click();
}
//handling button click listeners
document.getElementById('getImages').addEventListener('click',()=>{
    imgContainerDiv.innerHTML = '';
    pageNo++;
    showImages(1);
    displayPage.textContent = pageNo;
    document.getElementById('getImages').disabled = true;
});

btnNext.addEventListener('click',()=>{
    imgContainerDiv.innerHTML = '';
    showImages(++pageNo);
    checkPrevBtn();
    displayPage.textContent = pageNo;
});

btnPrev.addEventListener('click',()=>{
    imgContainerDiv.innerHTML = '';
    showImages(--pageNo);
    checkPrevBtn();
    displayPage.textContent = pageNo;
});