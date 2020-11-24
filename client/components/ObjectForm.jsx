import React from 'react'
import { connect } from 'react-redux'

import { navigate, addNewObject, fetchObject, updateObject } from '../actions'

class ObjectForm extends React.Component {
  state = {
    object: {},
    state: ''
  }
  
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.dispatch(addNewObject(this.state.object))
      .then(newObject => {
        console.log('ObjectForm > handleSubmit:', fetchObject(newObject.id))
        return fetchObject(newObject.id)
        .then(this.navigateToObject(newObject[0].id)) 
      })
      .catch(err => this.setState({errorMessage: err.message})) 
  }

  navigateToObject = (id) => { 
    console.log('ObjectForm > navigateToObject:', id) 
    this.props.dispatch(getObject(id))
    props.target = 'edit'
    const action = navigate('edit')
    this.props.dispatch(action)
  }

  handleChange = (e) => {
    const newObject = {
      ...this.state.object,
      [e.target.name]: e.target.value
    }
    this.state.object = newObject
  }

  newForm = () =>{
    return (
    <form className='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
       <h2 className='object-name'>Add a New Object</h2>

        <fieldset>
          <div className='pure-control-group'>
            <label htmlFor='title-name'>Name</label>
            <input
              type='text'
              name='name'
              onChange={this.handleChange}
            />
          </div>

          <div className='pure-control-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              name='description'
              onChange={this.handleChange}>
            </textarea>
          </div>

          <div className='pure-controls'>
            <input className='pure-button' type='submit' />
          </div>
        </fieldset>

        <p>{this.props.errorMessage && this.props.errorMessage}</p> 
      </form>
    )
  }

  editForm = () => {
     const {id, name, description} = this.state.object
    return (
      <form className='pure-form pure-form-aligned' onSubmit={this.handleSubmit}>
        <h2 className='object-name'>Edit Object</h2>
        <header className='object-header'>
          <h3 className='object-name'>Name: {name}</h3>
          </header>
           <h3 className='object-description'>Description: {description}</h3>

        <fieldset>
          <div className='pure-control-group'>
            <label htmlFor='title-name'>Name</label>
            <input
              type='text'
              name='name'
              placeholder={name}
              onChange={this.handleChange}
            />
          </div>

          <div className='pure-control-group'>
            <label htmlFor='description'>Description</label>
            <textarea
              type='text'
              name='description'
              placeholder={description}
              onChange={this.handleChange}>
            </textarea>
          </div>

          <div className='pure-controls'>
            <input className='pure-button' type='submit' />
          </div>
        </fieldset>

        {/* <p>{this.state.errorMessage && this.state.errorMessage}</p> */}
      </form>
    )

  }

  render () { 
    console.log('ObjectForm > render > this:', this.props.target)
    if(this.props.target === 'new'){
      return this.newForm()
    }else if(this.props.target === 'edit'){  
     return this.editForm()
    }
    
  }
}

const mapStateToProps = (state) => {
  return {
    target: state.navigation,
    object: state.object,
    errorMessage: state.errorMessage
  }
}

export default connect(mapStateToProps)(ObjectForm)