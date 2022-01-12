const imgContainerDiv = document.getElementById('imgContainer');
const btnPrev = document.getElementById('prev');
const btnNext = document.getElementById('next');
const displayPage = document.getElementById('displayPage');
const loaderDiv = document.getElementById('loader');
const btnStart = document.getElementById('start');
const btnLast = document.getElementById('last');
let pageNo = 0;
let res=null;

//****Toggling enable and disable buttons */
function checkPrevBtn(){
    if(pageNo>1){
        btnPrev.disabled = false;
        btnStart.disabled = false;
    }
    else{
        btnPrev.disabled = true;
        btnStart.disabled = true;
    }
}

function checkNextBtn(){
    if(pageNo>=100){
        btnNext.disabled = true;
        btnLast.disabled = true;
    }
    else{
        btnNext.disabled = false;
        btnLast.disabled = false;
    }
}

//function to fetch and show images
async function requestImages(){
    let config = {params:{client_id:'NSQcsUNE-j1CUDFPgOVOZasq97m07FLQZHChINvBjRM',page:pageNo,per_page:25},headers:{'Accept-Version': 'v1'}};
    let res = await axios.get('https://api.unsplash.com/photos',config);
    return res;
}

async function showImages(pageNo){
    res = await requestImages();
    toggleAnim();
    //console.log(res);
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

/***toggle animation */
function toggleAnim(){
    if(res==null){
        loaderDiv.style.display = "flex";
        imgContainerDiv.style.display = "none";
    }else{
        loaderDiv.style.display = "none";
        imgContainerDiv.style.display = "flex";
    }
}

//handling button click listeners
window.onload = function(){
    document.getElementById('getImages').click();
}

document.getElementById('getImages').addEventListener('click',()=>{
    imgContainerDiv.innerHTML = '';
    pageNo++;
    showImages(1);
    displayPage.textContent = pageNo;
    document.getElementById('getImages').disabled = true;
});

btnNext.addEventListener('click',()=>{
    res = null;
    toggleAnim();
    imgContainerDiv.innerHTML = '';
    showImages(++pageNo);
    checkPrevBtn();
    checkNextBtn();
    displayPage.textContent = pageNo;
});

btnPrev.addEventListener('click',()=>{
    res = null;
    toggleAnim();
    imgContainerDiv.innerHTML = '';
    showImages(--pageNo);
    checkPrevBtn();
    checkNextBtn();
    displayPage.textContent = pageNo;
});

btnStart.addEventListener('click',()=>{
    imgContainerDiv.innerHTML = '';
    pageNo = 1;
    showImages(1);
    displayPage.textContent = pageNo;
    checkPrevBtn();
    checkNextBtn();
});

btnLast.addEventListener('click',()=>{
    imgContainerDiv.innerHTML = '';
    pageNo = 100;
    showImages(100);
    displayPage.textContent = pageNo;
    checkPrevBtn();
    checkNextBtn();
});