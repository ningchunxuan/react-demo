import React, {Component} from 'react'
import './index.scss'

class Usernamelist extends Component{
    state = {
        data: [],
        _id:'',
        pageNum: []
    }
    init(page){
        $.get('http://localhost:2323/user',{page: page || 1}, res => { 
            this.state.pageNum = []
            for (var i=0;i<res.page;i++) {
                this.state.pageNum.push(i+1)
            }
            console.log(res)
            this.setState({
                data: res.data,
                pageNum: this.state.pageNum
            })
        })
    }
    //渲染之前
    componentWillMount(){
        this.init()
    }
    del(id){
        if (confirm('你确定要删除这个用户名嘛？')) {
            $.get('http://localhost:2323/deleteusername',{id:id},(res) => {
                if (res.code == 1){
                    this.init()
                } else {
                    alert('删除失败')
                }
            })
            
        }
        console.log(id)
    }
    show(val, obj){
        if (val === 1) {
            $('.add-dialog').show(500);
        } else {
            $('.modifi-dialog').show(500);
            $('.modifi-goodslist-box input')[0].value = obj.phone;
            $('.modifi-goodslist-box input')[1].value = obj.username;
            $('.modifi-goodslist-box input')[2].value = obj.password;
            this.state._id = obj._id;
        }
    }
    // 修改
    modifi() {
        var obj = {
            phone: $('.modifi-goodslist-box input')[0].value,
            username: $('.modifi-goodslist-box input')[1].value,
            password: $('.modifi-goodslist-box input')[2].value,
            _id: this.state._id
        }
        $.get('http://localhost:2323/updateuser', obj, (res) => {
            if (res.code == 1) {
                $('.modifi-dialog').hide(500)
                this.init()
                alert('修改成功')
            } else {
                alert('修改失败')
            }
        })
    }
    hide(){
        $('.add-goodslist-box input').val('');
        $('.add-dialog').hide(500);
        $('.modifi-dialog').hide(500);
    }
    add(){
        var obj = {
            phone: $('.add-goodslist-box input')[0].value,
            username: $('.add-goodslist-box input')[1].value,
            password: $('.add-goodslist-box input')[2].value
            
        }
        $.get('http://localhost:2323/adduser', obj, (res) => {
            if (res.code == 1) {
                $('.add-dialog').hide(500);
                this.init()
                alert('添加成功')
            } else {
                alert('添加失败')
            }
        })
        $('.add-goodslist-box input').val('')
    }
    // 查询按钮
    queryBtn() {
        $.get('http://localhost:2323/user', {username: $('.goodsName').val()}, res => { 
            if (res.code === 1) {
                this.setState({
                    data: res.data
                })
            } else {
                alert('暂无数据')
            }
            
        })
    }
    // 清空按钮
    clear() {
        $('.goodsName').val('')
        this.init()
    }
    changePage(page) {
        this.init(page)
    }
    render(){
        return (
            <div className="usernamelist">
                <ul className="addition">
                    <li>
                        <button onClick={this.show.bind(this, 1)} className="additive">+ 添加用户</button>
                    </li>
                    <li className="seek">
                        <span>商品名</span>
                        <input className="goodsName" type="text" placeholder="请输入用户名"/>
                    </li>
                    <li className="but">
                        <button onClick={this.queryBtn.bind(this)} className="refer">查询</button>
                        <button onClick={this.clear.bind(this)} className="wipe">清空</button>
                    </li>

                </ul>
                <p className="headline">用户列表</p>
                <table>
                    <thead>
                        <tr>
                            <th>手机号码</th>
                            <th>用户名</th>
                            <th>密码</th>
                            <th>操作</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((obj, index) => {
                                return (
                                    <tr key={Math.random()}>
                                        <td key={Math.random()}>{obj.phone}</td>
                                        <td key={Math.random()}>{obj.username}</td>
                                        <td key={Math.random()}>{obj.password}</td>
                                        <td key={Math.random()}>
                                            <button onClick={this.del.bind(this,obj._id)}>删除</button>
                                            <button onClick={this.show.bind(this, 0,obj)}>修改</button>
                                        </td>
                                    </tr>
                                    )
                            })
                        }
                    </tbody>
                </table>
                <div className="paging">
                    <ul className="page">
                        {
                            this.state.pageNum.map(item => {
                                return (
                                    <li  key={Math.random()*1000} onClick={this.changePage.bind(this, item)}>{item}</li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className="add-dialog">
                    <ul className="add-goodslist-box">
                        <li className="new-message">新增用户信息</li>
                        <li><div>手机号码:</div><input type="text" /></li>
                        <li><div>用户名:</div><input type="text" /></li>
                        <li><div>密码:</div><input type="text" /></li>
                        
                        <li>
                            <button onClick={this.add.bind(this)}>添加</button>
                            <button onClick={this.hide.bind(this)}>取消</button>
                        </li>
                    </ul>
                </div>
                <div className="modifi-dialog">
                    <ul className="modifi-goodslist-box">
                        <li className="new-message">修改用户信息</li>
                        <li><div>手机号码:</div><input type="text" /></li>
                        <li><div>用户名:</div><input type="text" /></li>
                        <li><div>密码:</div><input type="text" /></li>
                        <li>
                            <button onClick={this.modifi.bind(this)}>修改</button>
                            <button onClick={this.hide.bind(this)}>取消</button>
                        </li>
                    </ul>
                </div>
            </div>      
        )
    }
}

export default Usernamelist