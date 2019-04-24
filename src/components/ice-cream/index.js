import React, {Component} from 'react'
import './index.scss'

class Ice extends Component{
    state = {
        data: [],
        _id:'',
        pageNum: []
    }
    init(page){
        $.get('http://localhost:2323/goodslist', {goodsid: 'ice', page: page || 1}, res => { 
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
    // 相当于onload,DOM节点渲染之后
    componentDidMount() {
        // console.log($('.goodslist'))
        
    }
    // 删除
    del(id){
        if (confirm('你确定要删除这个商品嘛？')) {
            $.get('http://localhost:2323/deletegoods',{id:id},(res) => {
                if (res.code == 1){
                    this.init()
                } else {
                    alert('删除失败')
                }
            })
            
        }
        console.log(id)
    }
    // 添加/修改弹窗显示（弹出）
    show(val, obj){
        if (val === 1) {
            $('.add-dialog').show(500);
        } else {
            $('.modifi-dialog').show(500);
            $('.modifi-goodslist-box input')[0].value = obj.bigimg;
            $('.modifi-goodslist-box input')[1].value = obj.name;
            $('.modifi-goodslist-box input')[2].value = obj.goodsid;
            $('.modifi-goodslist-box input')[3].value = obj.title;
            $('.modifi-goodslist-box input')[4].value = obj.character1;
            $('.modifi-goodslist-box input')[5].value = obj.character2;
            $('.modifi-goodslist-box input')[6].value = obj.character3;
            $('.modifi-goodslist-box input')[7].value = obj.character4;
            $('.modifi-goodslist-box input')[8].value = obj.size;
            $('.modifi-goodslist-box input')[9].value = obj.number;
            $('.modifi-goodslist-box input')[10].value = obj.price;
            $('.modifi-goodslist-box input')[11].value = obj.imgArry;
            $('.modifi-goodslist-box input')[12].value = obj.deimg;
            this.state._id = obj._id
        }
    }

    // 修改
    modifi() {
        var obj = {
            bigimg: $('.modifi-goodslist-box input')[0].value,
            name: $('.modifi-goodslist-box input')[1].value,
            goodsid: $('.modifi-goodslist-box input')[2].value,
            title: $('.modifi-goodslist-box input')[3].value,
            character1: $('.modifi-goodslist-box input')[4].value,
            character2: $('.modifi-goodslist-box input')[5].value,
            character3: $('.modifi-goodslist-box input')[6].value,
            character4: $('.modifi-goodslist-box input')[7].value,
            size: $('.modifi-goodslist-box input')[8].value,
            number: $('.modifi-goodslist-box input')[9].value,
            price: $('.modifi-goodslist-box input')[10].value,
            imgArry: $('.modifi-goodslist-box input')[11].value,
            deimg: $('.modifi-goodslist-box input')[12].value,
            _id: this.state._id
        }
        $.get('http://localhost:2323/update', obj, (res) => {
            if (res.code == 1) {
                $('.modifi-dialog').hide(500)
                this.init()
                alert('修改成功')
            } else {
                alert('修改失败')
            }
        })
    }
    // 添加/修改弹窗隐藏
    hide(){
        $('.add-goodslist-box input').val('');
        $('.add-dialog').hide(500);
        $('.modifi-dialog').hide(500);
    }
    // 添加弹窗添加内容
    add(){
        var obj = {
            bigimg: $('.add-goodslist-box input')[0].value,
            name: $('.add-goodslist-box input')[1].value,
            goodsid: $('.add-goodslist-box input')[2].value,
            title: $('.add-goodslist-box input')[3].value,
            character1: $('.add-goodslist-box input')[4].value,
            character2: $('.add-goodslist-box input')[5].value,
            character3: $('.add-goodslist-box input')[6].value,
            character4: $('.add-goodslist-box input')[7].value,
            size: $('.add-goodslist-box input')[8].value,
            number: $('.add-goodslist-box input')[9].value,
            price: $('.add-goodslist-box input')[10].value,
            imgArry: $('.add-goodslist-box input')[11].value.split(','),
            deimg: $('.add-goodslist-box input')[12].value,
            
        }
        $.get('http://localhost:2323/addgoods', obj, (res) => {
            if (res.code == 1) {
                $('.add-dialog').hide(500)
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
        $.get('http://localhost:2323/goodslist', {goodsid: 'ice', name: $('.goodsName').val()}, res => { 
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
            <div className="ice-cream">
                <ul className="addition">
                    <li>
                        <button onClick={this.show.bind(this, 1)} className="additive">+ 添加商品</button>
                    </li>
                    <li className="seek">
                        <span>商品名</span>
                        <input className="goodsName" type="text" placeholder="请输入商品名"/>
                    </li>
                    <li className="but">
                        <button onClick={this.queryBtn.bind(this)} className="refer">查询</button>
                        <button onClick={this.clear.bind(this)} className="wipe">清空</button>
                    </li>

                </ul>
                <p className="headline">冰淇淋商品列表</p>
                <table>
                    <thead>
                        <tr>
                            <th>商品名字</th>
                            <th>类型</th>
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
                                        <td key={Math.random()}>
                                            {obj.name}
                                        </td>
                                        <td key={Math.random()}>
                                            {obj.goodsid}
                                        </td>
                                        <td key={Math.random()}>
                                            {obj.title}
                                        </td>
                                        <td key={Math.random()}>
                                            {obj.size}
                                        </td>
                                        <td key={Math.random()}>
                                            {obj.number}
                                        </td>
                                        <td key={Math.random()}>
                                            {obj.price}
                                        </td>
                                        
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
                        <li className="new-message">新增商品信息</li>
                        <li><div>图片:</div><input type="text" placeholder="图片以img/开头"/></li>
                        <li><div>商品名字:</div><input type="text" /></li>
                        <li><div>类型:</div><input type="text" /></li>
                        <li><div>商品描述:</div><input type="text" /></li>
                        <li><div>详细描述1:</div><input type="text" /></li>
                        <li><div>详细描述2:</div><input type="text" /></li>
                        <li><div>详细描述3:</div><input type="text" /></li>
                        <li><div>详细描述4:</div><input type="text" /></li>
                        <li><div>大小:</div><input type="text" /></li>
                        <li><div>数量:</div><input type="text" /></li>
                        <li><div>价格:</div><input type="text" /></li>
                        <li><div>图片数组:</div><input type="text" placeholder="图片以img/开头，请用逗号隔开"/></li>
                        <li><div>详情图片:</div><input type="text" placeholder="图片以img/开头"/></li>
                      
                        <li>
                            <button onClick={this.add.bind(this)}>添加</button>
                            <button onClick={this.hide.bind(this)}>取消</button>
                        </li>
                    </ul>
                </div>
                <div className="modifi-dialog">
                    <ul className="modifi-goodslist-box">
                        <li className="new-message">修改商品信息</li>
                        <li><div>图片:</div><input type="text" /></li>
                        <li><div>商品名字:</div><input type="text" /></li>
                        <li><div>类型:</div><input type="text" /></li>
                        <li><div>商品描述:</div><input type="text" /></li>
                        <li><div>详细描述1:</div><input type="text" /></li>
                        <li><div>详细描述2:</div><input type="text" /></li>
                        <li><div>详细描述3:</div><input type="text" /></li>
                        <li><div>详细描述4:</div><input type="text" /></li>
                        <li><div>大小:</div><input type="text" /></li>
                        <li><div>数量:</div><input type="text" /></li>
                        <li><div>价格:</div><input type="text" /></li>
                        <li><div>图片数组:</div><input type="text"/></li>
                        <li><div>详情图片:</div><input type="text" /></li>
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

export default Ice