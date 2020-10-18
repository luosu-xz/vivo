$(function(){
    // 登录隐藏
    $('.person').on("mouseover",function(){
        $('.page').slideDown();
        $('.page').show();
    })
    $('.page').on("mouseout",function(){
        $('.page').hide();
    })
})

;(function () {

    var list = getid('list');
    function init(){
        ajax({
            type:'get',
            // url:'./php/liebiao.php',
            url:'../data/data.json',
            data:{ 
     
            },
            success:str => {
                create(str);
            }
        });
        function create(str){
            let arr = JSON.parse(str);
            let html = arr.map(item => {
                return `<li data-id="${item.id}">
                        <img src="${item.img_url}" alt="" />
                        <h4>${item.name}</h4>
                    <p class="desc">${item.desc}</p>
                    <p class="price"><span>${item.price}</span></p>
                </li>`;
    }).join('');
    list.innerHTML = html;
        }
    }
    init();
    
})();