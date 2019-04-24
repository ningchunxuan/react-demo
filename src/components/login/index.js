import React, {Component} from 'react'
import './index.scss'

class Login extends Component{
    // state = {
    //     data: []
    // }
    // //渲染之前
    // componentWillMount(){
    //     $.get('http://localhost:2323/goodslist', {goodsid: 'ice'}, res => { 
    //         console.log(res)
    //         this.setState({
    //             data: res.data
    //         })
    //     })
    // }
    // // 相当于onload,DOM节点渲染之后
    // componentDidMount() {
    //     // console.log($('.goodslist'))
        
    // }
    // del(id){
    //     // if (confirm('你确定要删除这个商品嘛？')) {
    //     //     $.get('http://localhost:2222/deletebuycar',{id:id},function(res){

    //     //     })
            
    //     // }
    //     console.log(id)
    // }
    hide(){
        var $this = this;
        $.get('http://localhost:2323/login',{username:$('#username').val(),password:$('#password').val()},function(res){
                        if(res.code === 1){
                            if(confirm('确定登录') == true){
                                document.cookie = 'username=' + res.username;
                                $this.props.router.push('/home');
                            }
                            else{
                                $('#username').val('');
                                $('#password').val('');
                            }
                            // confirm(res.message)
                            // $this.props.router.push('/home')
                        }else{
                            confirm(res.message);
                            $('#username').val('');
                            $('#password').val('');
                            // this.$confirm(res.message,'退出提醒',{
                            //     confirmButtonText: '确定',
                            //     cancelButtonText: '取消',
                            //     type: 'warning'
                            // });
                        }
                    })
        // this.props.router.push('/home')
         // 带参数跳转this.props.router.push({pathname: '/home/cnode', query: {name: 'tom'}})
    }
    render(){
        return (
            <div className="login">
                <div className="login-logo">
                    <img src={require('../../img/logo.jpg')} alt="" />
                    <span>运营管理系统</span>
                </div>
                <div className="login-box">
                    <h3>登录</h3>
                    <ul>
                        <li>
                            <p>用户名:</p>
                            <input type="text" id="username" placeholder="请输入用户名"/>
                        </li>
                        <li>
                            <p>密码:</p>
                            <input type="text" id="password" placeholder="请输入秘密"/>
                        </li>
                    </ul>
                    <button onClick={this.hide.bind(this)}>登录</button>
                </div>
                
            </div>
        )
    }
    
}

export default Login