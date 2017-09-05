function productCount(){
	var totle=0;  //总价
	var save=0;    //节省的
	var integer=0;	 //积分	
    var point=0;	//单品积分
    var price=0;	//市场价	
    var ddprice=0;   //当当价
    var num=0;   // 购买的数量
    var trs=document.getElementById("mytable").getElementsByTagName("tr");
    for(var i=0;i<trs.length;i++){
    	point=trs[i].getElementsByTagName("td")[1].innerHTML;
    	price=trs[i].getElementsByTagName("td")[2].getElementsByTagName("label")[0].innerHTML;
    	ddprice=trs[i].getElementsByTagName("td")[3].getElementsByTagName("label")[0].innerHTML;
    	num=trs[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].value;
    	if(isNaN(num)){
    		alert("请重新输入");
    		trs[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].value=1;
    		return;
    	}
    	//累加
    	integer+=point*num;
    	totle+=ddprice*num;
    	save+=(price-ddprice)*num;
    }
    //把值放到标签里去
    document.getElementById("mytotal").innerHTML=Math.round(totle*100)/100;
    document.getElementById("mysave").innerHTML="&yen;"+save.toFixed(2);
    document.getElementById("mypoint").innerHTML=integer;
}

function show(){
    var trs=document.getElementById("mytable").getElementsByTagName("tr");
    var color;
    for(var i=0;i<trs.length;i++){
        trs[i].onmouseover=function(){
            color=this.style.background;
            this.style.background="pink";
        };
        trs[i].onmouseout=function(){
            
            this.style.background=color;
        }
    }
}

window.onload=function(){
	productCount();
    show();
	var alls=document.getElementsByClassName("shopping_yellow");
	for(var i=0;i<alls.length;i++){
		alls[i].onclick=function(){
          var str=this.parentNode.parentNode.getElementsByTagName("li")[0].innerText.substr(1);
		//判断，如果有，就加数量，如果没有，就添加行
		if(checkBookName(str)){
			return;
		}

        //添加一行
        var mytr=document.createElement("tr");
        mytr.setAttribute("class","shopping_product_list");
        var mydate=new Date();
        var myid="mydate"+mydate.getTime();
        mytr.setAttribute("id",myid);

        //设置td
        var mytd=document.createElement("td");
        mytd.setAttribute("class","shopping_product_list_1");
        mytd.innerHTML=this.parentNode.parentNode.getElementsByTagName("li")[0].innerHTML.substr(1);
        mytr.appendChild(mytd);

        //积分：当当价加乘以10
        mytd=document.createElement("td");
        mytd.setAttribute("class","shopping_product_list_2");
        mytd.innerHTML=this.parentNode.parentNode.getElementsByTagName("li")[2].innerHTML.substr(1)*10;
         mytr.appendChild(mytd);

         //市场价
        mytd=document.createElement("td");
        mytd.setAttribute("class","shopping_product_list_3");
        var myprice=this.parentNode.parentNode.getElementsByTagName("li")[1].innerHTML.substr(1);
        mytd.innerHTML="&yen;<label>"+myprice+"</label>";
        mytr.appendChild(mytd);

        //当当价
        mytd=document.createElement("td");
        mytd.setAttribute("class","shopping_product_list_3");
        var myddprice=this.parentNode.parentNode.getElementsByTagName("li")[2].innerHTML.substr(1);
        mytd.innerHTML="&yen;<label>"+myddprice+"</label>("+((myddprice/myprice).toFixed(2))*100+"折)";
        mytr.appendChild(mytd);


        //数量
        mytd=document.createElement("td");
        mytd.setAttribute("class","shopping_product_list_4");
        mytd.innerHTML='<input type="text" value="1" onBlur="productCount()" />';
        mytr.appendChild(mytd);

        //删除
        mytd=document.createElement("td");
        mytd.setAttribute("class","shopping_product_list_4");
        mytd.innerHTML='<a href="javascript:deleteObj('+myid+')" class="blue">删除</a>';
        mytr.appendChild(mytd);

        //tr添加到table里面的tbody
        document.getElementById("mytable").getElementsByTagName("tbody")[0].appendChild(mytr);
        productCount();
        show();
		}
	}
}

//判断书名是否存在
function checkBookName(name){
	var trs=document.getElementById("mytable").getElementsByTagName("tr");
	for(var i=0;i<trs.length;i++){
		var s=trs[i].getElementsByTagName("td")[0].innerText;
		if (s==name){
			var val=trs[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].value;
			//先把值赋给val再加1
			trs[i].getElementsByTagName("td")[4].getElementsByTagName("input")[0].value=++val;
			//重新统计金额
			productCount();
			return true;
		}
	}
	return false;
}


function deleteObj(id){
  var child=document.getElementById(id);
  //先获取到父节点，再删除子节点
  child.parentNode.removeChild(child);
  productCount();
}