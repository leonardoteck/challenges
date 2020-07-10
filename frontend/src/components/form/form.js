import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './form.css';
import '../app/app.css';
import heroService from '../../services/hero';
import menaceService from '../../services/menace';

export default class Form extends Component {
  constructor(props) {
    super(props);

    const { editData: { name, rankId, location } } = this.props;
    this.state = {
      name,
      rankId,
      location,
    };
  }

  submit = async (e) => {
    e.preventDefault();
    const {
      name,
      rankId,
      location,
    } = this.state;
    const {
      submitted,
      ranks,
      type,
      editData: { id },
    } = this.props;

    const payload = {
      id,
      name,
      location,
    };
    let returnObj;

    console.log(type);
    if (type === 'hero') {
      payload.heroRankId = +rankId;
      const { data: result } = await heroService.register(payload);
      returnObj = result;
      returnObj.heroRank = ranks.find(rank => +rank.id === +rankId);
    } else {
      payload.menaceRankId = +rankId;
      const { data: result } = await menaceService.register(payload);
      returnObj = result;
      returnObj.menaceRank = ranks.find(rank => +rank.id === +rankId);
    }

    submitted(returnObj);
  }

  render() {
    const {
      name,
      rankId,
      location,
    } = this.state;
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
            <div className="field">
              <label>Latitude</label>
              <input
                value={location.latitude}
                type="number"
                step="0.000001"
                onChange={event => this
                  .setState({ location: { ...location, latitude: event.target.value } })}
              />
            </div>
            <div className="field" style={{ marginLeft: '4%' }}>
              <label>Longitude</label>
              <input
                value={location.longitude}
                type="number"
                step="0.000001"
                onChange={event => this
                  .setState({ location: { ...location, longitude: event.target.value } })}
              />
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
  editData: {
    id: 0,
    name: '',
    rankId: 0,
    location: {
      id: 0,
      latitude: 0,
      longitude: 0,
    },
  },
};

Form.propTypes = {
  editData: PropTypes.object,
  type: PropTypes.oneOf(['hero', 'menace']).isRequired,
  ranks: PropTypes.array.isRequired,
  submitted: PropTypes.func.isRequired,
  cancel: PropTypes.func.isRequired,
};
