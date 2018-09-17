import React from 'react'

import AnimMounting from './components/AnimMounting'
import views from './views'
import ProgressBar from './components/ProgressBar'

import styles from './App.scss'

const App = () => (
    <div className={styles.app}>
        {views.map((View, index) => (
            <AnimMounting key={index} index={index}>
                <View/>
            </AnimMounting>
        ))}
        <ProgressBar/>
    </div>
)

export default App