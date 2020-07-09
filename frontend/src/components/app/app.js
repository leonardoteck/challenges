import React, { Component } from 'react';
import './app.css';
import Form from '../form/form';
import Modal from '../modal/modal';

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroes: [],
      fights: [],
      menaces: [],
      heroRanks: [
        { name: 'S', value: 80, id: 1 },
        { name: 'A', value: 40, id: 2 },
        { name: 'B', value: 20, id: 3 },
        { name: 'C', value: 10, id: 4 },
      ],
      showHeroModal: false,
      editHeroIndex: null,
    };
  }

  heroSubmitted = hero => {
    const { heroes, editHeroIndex } = this.state;
    if (editHeroIndex) heroes = heroes.splice(editHeroIndex, 1, hero);
    else heroes.push(hero);
    this.setState({ heroes, editHeroIndex: null });
  }

  editHero = index => {
    this.setState({
      editHeroIndex: index,
    });
  }

  render() {
    const { heroes, heroRanks, editHeroIndex, showHeroModal } = this.state;

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
              <span className="link" onClick={() => this.setState({ editHeroIndex: null, showHeroModal: true })}>[+]</span>
            </div>
            <div className="content">
              {heroes && heroes.length > 0 && (
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Classe</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {heroes.map((hero, index) => (
                      <tr key={hero.id}>
                        <td>{hero.name}</td>
                        <td>{hero.heroRank.name}</td>
                        <td>
                          <span className="link" onClick={() => this.editHero()}>Editar</span>
                          <br />
                          <span className="link">Excluir</span>
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
            <div className="title" augmented-ui="tl-clip exe">Ameaças</div>
          </section>
        </main>
        {showHeroModal && (
          <Modal>
            <Form
              ranks={heroRanks}
              type="hero"
              submitted={this.heroSubmitted}
              name={editHeroIndex ? heroes[editHeroIndex].name : undefined}
              rankId={editHeroIndex ? heroes[editHeroIndex].heroRank.id : undefined}
              cancel={() => this.setState({ editHeroIndex: null, showHeroModal: false })}
            />
          </Modal>
        )}
      </>
    );
  }
}
