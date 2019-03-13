import React, {Component} from 'react';
import {Button} from '$components'
import './static/style/App.less';

class App extends Component {
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Button/>
                </header>
            </div>
        );
    }
}

export default App;
