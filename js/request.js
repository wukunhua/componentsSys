(
    (owner)=>{
        owner.$ajax = function(obj){
            $.ajax({
                url: obj.url,
                type: obj.type,
                headers: {
                    token: sessionStorage.getItem("token")
                },
                data: obj.data,
                success: (data) => {
                    if (data.code == '200') {
                        obj.success(data);
                    }
                    if(data.code == '500'){
                        msgBox("error",data.msg)
                        if(data.data == 'needLogin'){
                            setTimeout(()=>{
                                window.top.location.href = "./login.html"
                            },1000)
                        }
                    }
                },
                complete:()=>{
                    !!obj.complete && obj.complete();
                }
            })
        }

        owner.msgBox = function(type,msg){

            $vue.$message({
                type: type,
                message: msg
            });
        }
    }
)(window)