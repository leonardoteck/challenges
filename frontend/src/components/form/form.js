import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './form.css';
import '../app/app.css';

export default class Form extends Component {
  constructor(props) {
    super(props);

    const { name, rankId } = this.props;
    this.state = {
      name,
      rankId,
    };
  }

  submit = (e) => {
    e.preventDefault();
    const { name, rankId } = this.state;
    const { submitted, ranks } = this.props;
    submitted({
      name,
      heroRank: ranks.find(rank => rank.id === rankId),
    });
  }

  render() {
    const { name, rankId } = this.state;
    const { ranks, type, cancel } = this.props;
    return (
      <div className="box" augmented-ui="tl-clip br-clip exe">
        <form onSubmit={this.submit} className="form-container">
          <div className="row">
            <div className="field">
              <label>Nome</label>
              <input
                value={name}
                onChange={event => this.setState({ name: event.target.value })}
              />
            </div>
            <div className="field" style={{ marginLeft: '4%' }}>
              <label>{type === 'hero' ? 'Classe' : 'Nível'}</label>
              <select
                onChange={event => this.setState({ rankId: event.target.value })}
                value={rankId}
              >
                {ranks.map(rank => (
                  <option value={rank.id}>{rank.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="row">
            <button
              className="button"
              augmented-ui="tl-clip br-clip exe"
              type="reset"
              onClick={cancel}
            >
              Cancelar
            </button>
            <button
              className="button"
              augmented-ui="tl-clip br-clip exe"
              type="submit"
            >
              OK
            </button>
          </div>
        </form>
      </div>
    );
  }
}

Form.defaultProps = {
  name: '',
  rankId: 1,
};

Form.propTypes = {
  name: PropTypes.string,
  rankId: PropTypes.number,
  type: PropTypes.oneOf(['hero', 'menace']),
  ranks: PropTypes.array.isRequired,
  submitted: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};
