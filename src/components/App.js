import React from 'react'

import Filters from './Filters'
import PetBrowser from './PetBrowser'

class App extends React.Component {
  constructor() {
    super()

    this.state = {
      pets: [],
      filters: {
        type: 'all'
      }
    }
  }

  onChangeType = (event) => {
    this.setState({
      filters: {
        type: event.target.value
      }
    })
  }

  onFindPetsClick = () => {
    let URL 
    if (this.state.filters.type === 'all') {
      URL = '/api/pets'
    } else {
      URL = '/api/pets?type=' + this.state.filters.type
    }
    fetch(URL)
      .then(res => res.json())
      .then(data => this.setState({pets: data}))
  }

  onAdoptPet = (id) => {
    const updatedPets = this.state.pets
    updatedPets.forEach(pet => {
      if(pet.id == id) {
        pet.isAdopted = true
      }
    })
    this.setState({pets: updatedPets}) 
  }

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters onChangeType={this.onChangeType} onFindPetsClick={this.onFindPetsClick}/>
            </div>
            <div className="twelve wide column">
              <PetBrowser petData={this.state.pets} onAdoptPet={this.onAdoptPet}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
