import React, { Component } from 'react';
import './app.css';
import Form from '../form/form';
import Modal from '../modal/modal';
import heroService from '../../services/hero';
import menaceService from '../../services/menace';
import fightService from '../../services/fight';
import { httpError } from '../../services/alert';
import authService from '../../services/auth';
import Auth from '../auth/auth';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroes: [],
      fights: {
        goingOn: [],
        ended: [],
      },
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
        { data: fights },
      ] = await Promise.all([
        heroService.ranks(),
        heroService.list(),
        menaceService.ranks(),
        menaceService.list(),
        fightService.list(),
      ]);
      this.setState({
        heroRanks,
        heroes,
        menaceRanks,
        menaces,
        fights,
        showLogin: false,
      });
    } catch (error) {
      httpError(error);
    }
  }

  heroSubmitted = (hero) => {
    const { editHeroIndex, heroes } = this.state;
    if (editHeroIndex != null) heroes.splice(editHeroIndex, 1, hero);
    else heroes.push(hero);
    this.setState({ heroes, editHeroIndex: null, showHeroModal: false });
    this.update();
  }

  menaceSubmitted = (menace) => {
    const { editMenaceIndex, menaces } = this.state;
    if (editMenaceIndex) menaces.splice(editMenaceIndex, 1, menace);
    else menaces.push(menace);
    this.setState({ menaces, editMenaceIndex: null, showMenaceModal: false });
    this.update();
  }

  editHero = (index) => {
    this.setState({
      editHeroIndex: index,
      showHeroModal: true,
    });
    this.update();
  }

  editMenace = (index) => {
    this.setState({
      editMenaceIndex: index,
      showMenaceModal: true,
    });
    this.update();
  }

  deleteHero = async (index) => {
    const { heroes } = this.state;
    await heroService.remove(heroes[index].id);
    heroes.splice(index, 1);
    this.setState({ heroes });
    this.update();
  }

  update = async () => {
    const [
      { data: menaces },
      { data: fights },
    ] = await Promise.all([
      menaceService.list(),
      fightService.list(),
    ]);
    this.setState({
      menaces,
      fights,
    });
  }

  endFight = async (index) => {
    const { fights } = this.state;
    await fightService.endFight(fights.goingOn[index].id);
    this.update();
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
      fights,
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
              Heróis (
              {heroes.length}
              )
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
            <div className="title" augmented-ui="tl-clip exe">
              Lutas agora (
              {fights.goingOn.length}
              )
              <span
                className="link reload"
                onClick={this.update}
              >
                [atualizar]
              </span>
            </div>
            <div className="content">
              {fights && fights.goingOn && fights.goingOn.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>Heróis</th>
                      <th>Ameaça</th>
                      <th>Início</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fights.goingOn.map((fight, index) => (
                      <tr key={fight.id}>
                        <td>{fight.heroFightList.map(hf => hf.hero ? hf.hero.name : '?').join(', ')}</td>
                        <td>{fight.menace.name}</td>
                        <td>{new Date(fight.dateStart).toLocaleString()}</td>
                        <td>
                          <span className="link" onClick={() => this.endFight(index)}>Encerrar</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="subtitle">
                Lutas encerrada (
                {fights.ended.length}
                )
              </div>
              {fights && fights.ended && fights.ended.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>Heróis</th>
                      <th>Ameaça</th>
                      <th>Início</th>
                      <th>Fim</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fights.ended.map(fight => (
                      <tr key={fight.id}>
                        <td>{fight.heroFightList.map(hf => hf.hero ? hf.hero.name : '?').join(', ')}</td>
                        <td>{fight.menace.name}</td>
                        <td>{new Date(fight.dateStart).toLocaleString()}</td>
                        <td>{new Date(fight.dateEnd).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </section>

          <section className="box full" augmented-ui="tl-clip br-clip exe">
            <div className="title" augmented-ui="tl-clip exe">
              Ameaças (
              {menaces.length}
              )
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
              editData={editHeroIndex != null ? {
                id: heroes[editHeroIndex].id,
                name: heroes[editHeroIndex].name,
                rankId: heroes[editHeroIndex].heroRankId,
                location: heroes[editHeroIndex].location,
              } : undefined}
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
              editData={editMenaceIndex != null ? {
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
