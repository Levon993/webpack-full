import * as $ from 'jquery'
import './style/style.css'
import './style/less.less'
import './style/scss.scss'
import React from 'react'
import {render} from 'react-dom'
import './json/json'
import "./babel"
import './Analytics.ts'
import xml from './assets/data.xml'
import User from '@models/User'

const user = new User('levon', 18, 'admin')
console.log(user._name)
// $('pre').html('<h1>Levon</h1>')

const App = () =>(
    <div className="container">

    <div className="img" />
    <pre />
    <div className="box">
        <h2>Less</h2>
    </div>
    <div className="box_2">
        <h2>Scss</h2>
    </div>
</div>
)
render(<App/>, document.getElementById('app') )
