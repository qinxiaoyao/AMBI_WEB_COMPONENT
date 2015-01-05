$(function() {

    //左边导航菜单隐藏/显示
    $('.sidebar-toggle').on('click', function() {
        $('body').toggleClass('sidebar-collapse');
    });

    //面板的隐藏/显示
    $('.panel').on('click', '.panel-collapse', function() {
        var $panel = $(this).closest('.panel')
        $('.panel-heading .panel-collapse i', $panel).toggleClass('fa-caret-down').toggleClass('fa-caret-up')
        $('.panel-body', $panel).toggleClass('hidden')
    });


    $("[href='#ui']").trigger("click",function(){
        console.log("1");
    });


    //初始化侧边栏
    $.getJSON("js/data/nav.json?random="+Math.random(),function(data){
        jsonToNav($(".sidebar-nav"),data.navs,0,"");
        //初始化导航菜单
        $('#side-menu').metisMenu();
        // detectdURLChanged();
    });

    

});
 

 //JSON to Nav  --  初始化侧边栏
function jsonToNav(obj, data, level, parentName){
    var navUlCss = level!=0?" nav-"+num2word(level)+"-level":"";
    var $navDom = $("<ul class='nav"+navUlCss+"' id='side-menu'></ul>");
    for (var i in data) {
        var name = data[i].name;
        var subname = data[i].subname;
        var icon = data[i].icon;
        var children = data[i].children;
        var url = data[i].url;
        data[i].level = level;
        var $li = $("<li class='level" + level + "'></li>");
        var cont = '';
        if(level == 0){
            cont += "<a href='#"+parentName+name+"' url='"+url+"'>";
            cont += "    <span class='sidebar-item-icon fa-stack '>";
            cont += "        <i class='fa fa-square fa-stack-2x text-primary'></i>";
            cont += "        <i class='fa "+icon+" fa-stack-1x fa-inverse'></i>";
            cont += "    </span>";
            cont += "    <span class='sidebar-item-title'>"+name+"</span>";
            cont += "    <span class='sidebar-item-subtitle'>"+subname+"</span>";
            cont += "</a>";
        }else{
            cont += "<a href='#"+parentName+name+"' url='"+url+"'>"+name+"</a>";
        }
        
        var $a = $(cont);
        $li.append($a);
        if (children && children.length > 0) {
            jsonToNav($li, children, (level+1), name+"/");
        }
        $navDom.append($li);
    }
    obj.append($navDom);
}

//数字转英文
function num2word(num){
    var words = ['first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth'];
    return words[num];
}

//检查URL变化，并更改侧边栏位置和面包屑内容
function detectdURLChanged(){
    var uri = window.location.hash;
    var link = $("a[href='"+uri+"']");

    $("a[href='"+uri+"']").trigger("click",function(){
        alert($(this).attr("url"));
    });
}


