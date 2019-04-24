import React, {Component} from 'react'
import './index.scss'

class Buycarlist extends Component{
    state = {
        data: [],
        pageNum:[]
    }
    //渲染之前
    init(page){
        $.get('http://localhost:2323/buycar',{ page: page || 1}, res => { 
            this.state.pageNum = []
            for (var i=0;i<res.page;i++) {
                this.state.pageNum.push(i+1)
            }
            this.setState({
                data: res.data,
                pageNum: this.state.pageNum
            })
        })
    }
    componentWillMount(){
        this.init()
    }
    del(id){
        if (confirm('你确定要删除这个商品嘛？')) {
            $.get('http://localhost:2323/deletebuycar',{id:id}, (res) => {
                if (res.code == 1){
                    this.init()
                } else {
                    alert('删除失败')
                }
            })

        }
    }
    queryBtn(){
        $.get('http://localhost:2323/buycar',{username:$('.goodsName').val()} ,res => { 
            if(res.code === 1){
                this.setState({
                    data: res.data
                })
            }else{
                alert('暂无数据')
            }
            
        })
    }
    clear(){
        $('.goodsName').val('')
        this.init()
    }
    changePage(page) {
        this.init(page)
    }
    render(){
        return (
            <div className="buycarlist">
                <ul className="addition">
                    <li className="seek">
                        <span>商品名</span>
                        <input className="goodsName" type="text" placeholder="请输入商品名"/>
                    </li>
                    <li className="but">
                        <button onClick={this.queryBtn.bind(this)} className="refer">查询</button>
                        <button onClick={this.clear.bind(this)} className="wipe">清空</button>
                    </li>

                </ul>
                <p className="headline">购物车商品列表</p>
                <table>
                    <thead>
                        <tr>
                            <th>用户名</th>
                            <th>商品名字</th>
                            <th>商品描述</th>
                            <th>大小</th>
                            <th>数量</th>
                            <th>价格</th>
                            <th>操作</th>
                        </tr>
                        
                    </thead>
                    <tbody>
                        {
                            this.state.data.map((obj, index) => {
                                return (
                                    <tr key={Math.random()}>
                                        <td key={Math.random()}>{obj.username}</td>
                                        <td key={Math.random()}>{obj.name}</td>
                                        <td key={Math.random()}>{obj.title}</td>
                                        <td key={Math.random()}>{obj.size}</td>
                                        <td key={Math.random()}>{obj.number}</td>
                                        <td key={Math.random()}>{obj.price}</td>
                                        <td key={Math.random()}>
                                            <button onClick={this.del.bind(this,obj._id)}>删除</button>
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
            </div>      
        )
    }
}
export default Buycarlist