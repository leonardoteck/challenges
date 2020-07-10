import React, { Component } from 'react';
import './app.css';
import Form from '../form/form';
import Modal from '../modal/modal';
import heroService from '../../services/hero';
import menaceService from '../../services/menace';
import { httpError } from '../../services/alert';
import authService from '../../services/auth';
import Auth from '../auth/auth';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroes: [],
      fights: [],
      menaces: [],
      heroRanks: [],
      menaceRanks: [],
      showHeroModal: false,
      showMenaceModal: false,
      editHeroIndex: null,
      editMenaceIndex: null,
      showLogin: !authService.isAuthorized(),
    };

    if (authService.isAuthorized()) this.loadData();
  }

  loadData = async () => {
    try {
      const [
        { data: heroRanks },
        { data: heroes },
        { data: menaceRanks },
        { data: menaces },
      ] = await Promise.all([
        heroService.ranks(),
        heroService.list(),
        menaceService.ranks(),
        menaceService.list(),
      ]);
      this.setState({
        heroRanks,
        heroes,
        menaceRanks,
        menaces,
        showLogin: false,
      });
    } catch (error) {
      httpError(error);
    }
  }

  heroSubmitted = (hero) => {
    const { editHeroIndex, heroes } = this.state;
    if (editHeroIndex >= 0) heroes.splice(editHeroIndex, 1, hero);
    else heroes.push(hero);
    this.setState({ heroes, editHeroIndex: null, showHeroModal: false });
  }

  menaceSubmitted = (menace) => {
    const { editMenaceIndex, menaces } = this.state;
    if (editMenaceIndex) menaces.splice(editMenaceIndex, 1, menace);
    else menaces.push(menace);
    this.setState({ menaces, editMenaceIndex: null, showMenaceModal: false });
  }

  editHero = (index) => {
    this.setState({
      editHeroIndex: index,
      showHeroModal: true,
    });
  }

  editMenace = (index) => {
    this.setState({
      editMenaceIndex: index,
      showMenaceModal: true,
    });
  }

  deleteMenace = async (index) => {
    const { heroes } = this.state;
    await heroService.remove(heroes[index].id);
    heroes.splice(index, 1);
    this.setState({ heroes });
  }

  render() {
    const {
      heroes,
      heroRanks,
      editHeroIndex,
      showHeroModal,
      menaces,
      menaceRanks,
      editMenaceIndex,
      showMenaceModal,
      showLogin,
    } = this.state;

    return (
      <>
        <header className="box" augmented-ui="tl-clip br-clip exe">
          <span>
            {'> '}
            iHeros - Desafio ZRP
          </span>
          <span className="blink">_</span>
        </header>
        <main>
          <section className="box full" augmented-ui="tl-clip br-clip exe">
            <div className="title" augmented-ui="tl-clip exe">
              Heróis
              <span
                className="link"
                onClick={() => this.setState({ editHeroIndex: null, showHeroModal: true })}
              >
                [+]
              </span>
            </div>
            <div className="content">
              {heroes && heroes.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Classe</th>
                      <th>Lat | Lng</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heroes.map((hero, index) => (
                      <tr key={hero.id}>
                        <td>{hero.name}</td>
                        <td>{hero.heroRank.name}</td>
                        <td>
                          {hero.location.latitude}
                          {' | '}
                          {hero.location.longitude}
                        </td>
                        <td>
                          <span className="link" onClick={() => this.editHero(index)}>Editar</span>
                          <br />
                          <span className="link" onClick={() => this.deleteHero(index)}>Excluir</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          <section className="box full" augmented-ui="tl-clip br-clip exe">
            <div className="title" augmented-ui="tl-clip exe">Lutas no momento</div>
          </section>

          <section className="box full" augmented-ui="tl-clip br-clip exe">
            <div className="title" augmented-ui="tl-clip exe">
              Ameaças
              <span
                className="link"
                onClick={() => this.setState({ editMenaceIndex: null, showMenaceModal: true })}
              >
                [+]
              </span>
            </div>
            <div className="content">
              {menaces && menaces.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Nível</th>
                      <th>Lat | Lng</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menaces.map((menace, index) => (
                      <tr key={menace.id}>
                        <td>{menace.name}</td>
                        <td>{menace.menaceRank.name}</td>
                        <td>
                          {menace.location.latitude}
                          {' | '}
                          {menace.location.longitude}
                        </td>
                        <td>
                          <span className="link" onClick={() => this.editMenace(index)}>Editar</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>
        </main>
        {showHeroModal && (
          <Modal>
            <Form
              ranks={heroRanks}
              type="hero"
              submitted={this.heroSubmitted}
              name={editHeroIndex >= 0 ? heroes[editHeroIndex].name : undefined}
              rankId={editHeroIndex >= 0 ? heroes[editHeroIndex].heroRankId : undefined}
              latitude={editHeroIndex >= 0 ? heroes[editHeroIndex].location.latitude : undefined}
              longitude={editHeroIndex >= 0
                ? heroes[editHeroIndex].location.longitude : undefined}
              cancel={() => this.setState({ editHeroIndex: null, showHeroModal: false })}
            />
          </Modal>
        )}
        {showMenaceModal && (
          <Modal>
            <Form
              ranks={menaceRanks}
              type="menace"
              submitted={this.menaceSubmitted}
              editData={editMenaceIndex >= 0 ? {
                id: menaces[editMenaceIndex].id,
                name: menaces[editMenaceIndex].name,
                rankId: menaces[editMenaceIndex].menaceRankId,
                location: menaces[editMenaceIndex].location,
              } : undefined}
              cancel={() => this.setState({ editMenaceIndex: null, showMenaceModal: false })}
            />
          </Modal>
        )}
        {showLogin && <Auth loggedin={this.loadData} />}
      </>
    );
  }
}
