import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deletePile, pushELementByPile, doOperation, fetchPiles, fetchOperand } from '../actions/rpnActions';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class PilesList extends Component {

    constructor(props) {
        super(props);
        this.state = { showModal: false, currentPileOpened: null, newValue: null };
    };

    componentWillMount = () => {
        this.props.fetchPiles();
        this.props.fetchOperand();
    };

    handleOpenModal(idPile) {
        this.setState({ showModal: true, currentPileOpened: idPile });
    };

    handleCloseModal() {
        this.setState({ showModal: false, currentPileOpened: null, newValue: null });
    };

    formatContent = content => {
        return content?.map(i => '{' + i + '}').join();
    };

    handleChangeValue = event => {
        let newState = {};
        newState[event.target.name] = event.target.value;
        this.setState(newState);
    };

    loadOperand = (idPile) => {
        let listOperations = [];
        for (let j = 0; j < this.props.operand?.length; j++) {
            listOperations.push(
                <div key={j.toString()} className='flex-fill flex-shrink-1 p-1'>
                    <button className='btn btn-info' data-id={idPile + '-' + this.props.operand[j].id}
                        onClick={() => this.props.doOperation(idPile, this.props.operand[j].id)}>{this.props.operand[j].name}</button>
                </div>
            )
        };
        return listOperations;
    };

    loadPiles = () => {
        let listPiles = [];
        for (let i = 0; i < this.props.piles?.length; i++) {
            listPiles.push(
                <div key={i.toString()} className='d-flex flex-row px-8 py-1'>
                    <div className='flex-fill w-100 p-2'>{this.props.piles[i].id}</div>
                    <div className='flex-fill w-100 p-2'>{this.props.piles[i].name}</div>
                    <div className='flex-fill w-100 p-2'>{this.formatContent(this.props.piles[i].content)}</div>
                    {this.loadOperand(this.props.piles[i].id)}
                    <div className='flex-fill flex-shrink-1 p-1'>
                        <button className='btn btn-info' data-id={'push' + this.props.piles[i].id}
                            onClick={() => this.handleOpenModal(this.props.piles[i].id)}>PUSH</button>
                    </div>
                    <div className='flex-fill flex-shrink-1 p-1'>
                        <button className='btn btn-danger' data-id={'delete' + this.props.piles[i].id}
                            onClick={() => this.props.deletePile(this.props.piles[i].id)}>DELETE</button>
                    </div>
                </div>
            )
        }
        return listPiles;
    };

    render() {
        return <div className='pt-3'>
            {this.props.isFetching ? 'loading piles...' : ''}
            {this.loadPiles()}
            <Modal
                isOpen={this.state.showModal}
                onRequestClose={() => this.handleCloseModal()}
                style={customStyles}
            >
                <form>
                    <div className='form-group'>
                        <label>New value:</label>
                        <input className='form-control' type='text' name='newValue' placeholder='new Value'
                            onChange={this.handleChangeValue}></input>
                    </div>

                    <div className='d-flex h-100' style={{ marginTop: '5%' }}>
                        <div className="align-self-center mx-auto">
                            <button className='btn btn-info' onClick={() => this.props.pushELementByPile(this.state.currentPileOpened, this.state.newValue)}> Add Value</button>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    }
}

const mapStateToProps = state => ({
    piles: state.rpn.piles,
    operand: state.rpn.operand,
    isFetching: state.rpn.isFetching
});

export default connect(mapStateToProps, { fetchPiles, deletePile, doOperation, pushELementByPile, fetchOperand })(PilesList);