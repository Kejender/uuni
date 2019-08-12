import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Mittari(props) {
  return (
    <div id="mittari">
	    <div id="viisari1"></div>
	    <div id="viisari2"></div>
	    <div id="viisari3"></div>
	    <div id="viisari4"></div>
	  </div>
  );
}

function Pyora(props) {
  return (
    <div id="pyora" onClick={props.onClick}>
       <div id="pyora1"></div><div id="pyora2"></div>
       <div id="pyora3"></div>	<div id="pyora4"></div>
    </div>
  );
}

function Ritila(props) {
  return (
    <div id="ritila2" onClick={props.onClick}>
      <div className="palkkix palkki2"></div>
	    <div className="palkkix palkki2"></div>
	    <div className="palkkix palkki2"></div>
	    <div className="palkkix palkki2"></div>
	    <div className="palkkix palkki3"></div>
	    <div className="palkkix palkki3"></div>
	    <div className="palkkix palkki3"></div>
	    <div className="palkkix palkki3"></div>
    </div>
  );
}

class Uuni extends React.Component {
  
  renderMittari(i) {
    return (
      <Mittari
      />
    );
  }

  renderPyora(i) {
    return (
      <Pyora
      onClick={() => this.props.onClick()}
      />
    );
  }

  renderRitila(i) {
    return (
      <Ritila
      //value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div id="uuni2">
        <div id="harvelit">
          {this.renderPyora(1)}
          {this.renderMittari(2)}
        </div>
        {this.renderRitila(2)}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    paine: 4,
    lampo: 4,
    hiili: 4,
    kierros: 0,
    asteet: 45,
    palkit: null,
    mittari: null,
    vari_ind: 1,
    firecolors: [
      ["black","red"],
      ["yellow","red"],
      ["orange","yellow"],
      ],
    };
  }

  handleClick(i) {
    const lampo = this.state.lampo;
    console.log("joo "+lampo);
  }


vahenna(){
  let paine = this.state.paine;
  console.log("vahenna");
  if (paine > 0){
      paine = paine - 1;
      this.setState({ paine });
  }  
}



palo(){
  let lampo = this.state.lampo;
  let kierros = this.state.kierros;
  let asteet = this.state.asteet;
  let paine = this.state.paine;
  let hiili = this.state.hiili;
  let mittari = this.state.mittari;

  kierros = kierros+1;
  console.log("kierros "+kierros);
    
    if (hiili > 3) {
    
      lampo = lampo +1;
      asteet = asteet + 10;
      mittari.style.transform = 'rotate('+asteet+'deg)'; 
    
      if (hiili > 6){
        lampo = lampo + 1
        asteet = asteet + 10;
      mittari.style.transform = 'rotate('+asteet+'deg)'; 
      
      }
      console.log("lampo: "+lampo);
    }
    else {
      if(lampo > 0){
        lampo = lampo -1;
        paine = paine -1;
      
      asteet = asteet - 10;
      mittari.style.transform = 'rotate('+asteet+'deg)'; 
      
        console.log("LP: "+lampo +" "+paine);
      }
    
    }
    
    if (lampo > 5){
    
      if (paine < 10) {
        paine = paine + 1;
      console.log("paine: "+paine);
      }
      else {
        console.log("liikaa");
      }
    }
    
    if (hiili > 0) {
     hiili = hiili - 1;
     console.log("hiili: "+hiili);
    }
    
} //palo


tuli(){
  const lampo = this.state.lampo;
  const firecolors = this.state.firecolors;
  let vari_ind = this.state.vari_ind;
  let palkit = this.state.palkit;
  console.log("tuli "+ lampo+" "+firecolors);
  console.log("palkit "+palkit.length);
  
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

if(lampo < 3){
  vari_ind = 0;
}

if(lampo > 2 && lampo < 7){
  vari_ind = 1;
}
if(lampo > 6){
  vari_ind = 2;
}

console.log("vari "+vari_ind);

function fireColor(){
  let firecolor;
  firecolor = firecolors[vari_ind][getRandomInt(2)];
  return firecolor;
}

[].forEach.call(palkit, function(palkki) {
  palkki.style.backgroundColor  = fireColor();
});

}

componentDidMount() {
  let palkit = this.state.palkit;
  let mittari = this.state.mittari;
  palkit = document.getElementsByClassName('palkkix');
  mittari = document.getElementById('mittari');
  this.setState({ palkit });
  this.setState({ mittari });
  this.intervalId1 = setInterval(this.tuli.bind(this), 300);
  this.intervalId2 = setInterval(this.palo.bind(this), 10000);
  console.log(palkit.length);
}

  render() {
	
    return (
      <div className="game">
        <div className="uuni">
          <Uuni
            onClick={(i) => this.handleClick(i)}
          />

        <div className="game-info">
          <div>info</div>
        </div>
      </div>
      </div>
    );
  }

}

// ========================================


ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

