import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPile } from '../actions/rpnActions';

class PileForm extends Component {
    constructor(props) {
        super(props);
        this.state = { name: '', content: [1] };
        this.addPile = this.addPile.bind(this);
    };

    addPile = event => {
        event.preventDefault();
        this.props.addPile(this.state);
        this.setState({ name: '', content: [1] });
    };

    handleChangeName = event => {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    };

    handleChangeContent = event => {
        let newState = {};
        newState[event.target.name] = [event.target.value];
        this.setState(newState);
    };

    render() {
        return <form onSubmit={this.addPile} className='pt-3'>
            <div className='form-group'>
                <label>name:</label>
                <input className='form-control' type='text' name='name' placeholder='name'
                    onChange={this.handleChangeName} value={this.state.name}></input>
            </div>

            <div className='form-group'>
                <label>initialValue:</label>
                <input className='form-control' type='text' name='content' placeholder='content'
                    onChange={this.handleChangeContent} value={this.state.content}></input>
            </div>

            <div className='d-flex h-100' style={{ marginTop: '5%' }}>
                <div className="align-self-center mx-auto">
                    <button className='btn btn-info'> Add Stack</button>
                </div>
            </div>

        </form>
    }
}



export default connect(null, { addPile })(PileForm);