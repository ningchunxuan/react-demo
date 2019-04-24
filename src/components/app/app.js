import React from 'react'

export default class AppComponent extends React.Component{
    render(){
        return <div className="box">{this.props.children}</div>
    }
}