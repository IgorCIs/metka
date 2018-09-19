import React from 'react'

import AnimMounting from './components/AnimMounting'
import views from './views'
import ProgressBar from './components/ProgressBar'

import './App.scss'

const App = () => (
    <div>
        {views.map((View, index) => (
            <AnimMounting key={index} index={index}>
                {View}
            </AnimMounting>
        ))}
        <ProgressBar/>
    </div>
)

export default App