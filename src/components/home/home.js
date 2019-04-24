import React, {Component} from 'react'
import {Link} from 'react-router'
import './home.scss'

class HomeComponent extends Component{
    state = {
        routerLink: [
            {
                path: '/home/goodslist',
                title: '首页商品列表',
                active: 'active'
            },
            {
                path: '/home/cakelist',
                title: '蛋糕商品列表',
                active: ''
            },
            {
                path: '/home/ice',
                title: '冰淇淋商品列表',
                active: ''
            },
            {
                path: '/home/temperature',
                title: '常温蛋糕商品列表',
                active: ''
            },
            {
                path: '/home/bread',
                title: '面包商品列表',
                active: ''
            },
            {
                path: '/home/buycarlist',
                title: '购物车列表',
                active: ''
                
            },
            {
                path: '/home/usernamelist',
                title: '用户列表',
                active: ''
            }
        ]
    }
    changeActive(index){
        this.state.routerLink.forEach((obj,idx) => {
            obj.active = ''
            if (index == idx) {
                obj.active = 'active'
            }
        })
        this.setState({
            routerLink: this.state.routerLink
        })
    }
    exit(){
        if(confirm('确定要退出吗') == true){
            var $this = this;
            var date = new Date();
            date.setDate(date.getDate()-1);
            document.cookie = 'username=' + this.username + ';expires=' + date.toUTCString();
            $this.props.router.push('/login')
        }else{

        }
        
    }
    render(){
        return (
            <div className="home">
                <header>
                    <div>
                        
                    </div>
                    <div>21cake廿一客蛋糕</div>
                    <div>
                        <button onClick={this.exit.bind(this)}>退出</button>
                    </div>
                </header>
                <div className="content">
                    <nav>
                        <ul>
                            {
                                this.state.routerLink.map((obj, index) => {
                                    return (
                                        <li key={Math.random()*1000} className={obj.active} onClick={this.changeActive.bind(this, index)}>
                                            <Link to={obj.path}>{obj.title}</Link>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </nav>
                    <main>{this.props.children}</main>
                </div>
            </div>      
        )
    }
}

export default HomeComponent