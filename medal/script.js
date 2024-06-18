function fetchApiData() {
    var select = document.getElementById('fruits'); //获取下拉菜单的值
    var selectedValue = select.value;
    if (selectedValue!=''){
        var params = document.getElementById('apiParams').value;
        var apiUrl = 'http://120.53.120.90:6325/medal?'+selectedValue+'='+ params;

        fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // 将响应体(Response Body)解析为JSON
        })
        .then(data => { // 使用data变量接收解析后的JSON数据
            if(data.code==0){
                var res = data.message;
                addRow(res)
            }
            else{
                console.log(data.code)
                alert(data.message);
            }

        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
        });
    }
    else {
        alert("请选择查询方式");
    }
    
}

function addRow(response) {
    var table = document.getElementById('table');//获取table节点
    var tbody = table.getElementsByTagName('tbody')[0];//获取tbody节点
    var newTbody = document.createElement('tbody');//创建新的tbody节点
            
    if(Array.isArray(response)){
        for (var i = 0; i < response.length; i++) {
            var length = newTbody.rows.length;//获取插入节点
            var newRow = newTbody.insertRow(length);//插入新行
            var medal = newRow.insertCell(0);
            var name = newRow.insertCell(1);
            var uid = newRow.insertCell(2);
            var url = newRow.insertCell(3);
            medal.innerHTML = response[i].粉丝牌;
            name.innerHTML = response[i].昵称;
            uid.innerHTML = response[i].UID;
            url.innerHTML = '<a href="https://space.bilibili.com/'+response[i].UID+'" target="_blank">跳转主页</a>';
        }
    }
    else{
        var length = newTbody.rows.length;//获取插入节点
        var newRow = newTbody.insertRow(length);//插入新行
        var medal = newRow.insertCell(0);
        var name = newRow.insertCell(1);
        var uid = newRow.insertCell(2);
        var url = newRow.insertCell(3);
        medal.innerHTML = response.粉丝牌;
        name.innerHTML = response.昵称;
        uid.innerHTML = response.UID;
        url.innerHTML = '<a href="https://space.bilibili.com/'+response.UID+'" target="_blank">跳转主页</a>';
    }
    
    // 替换旧表体为新的空表体
    table.replaceChild(newTbody, tbody);
    
}


