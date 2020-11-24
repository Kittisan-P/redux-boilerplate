import React from 'react'
// import { Link}  from 'react-router-dom'
import { connect } from 'react-redux'

import { deleteObject } from '../api'

class Object extends React.Component {
  // constructor (props) {
  //   super(props)
  //   this.state = {
  //     errorMessage: '',
  //   }
  // }

  // componentDidMount () {
  //   const id = this.props.object.id || this.props.match.params.id
  //   if (id) { 
  //       // Render join of tables once new table entered
  //   }
  // }

  removeObject = (e) => {
    e.preventDefault()
    const action = deleteObject(this.props.object.id)
      .then(this.props.fetchObjects)
      .then(() => this.props.history.push(`/`))
      .catch(err => this.setState({errorMessage: err.message}))
    this.props.dispatch(action)
  }

  // removeObject = (e) => {
  //   // e.preventDefault()
  //   console.log("Object removeObject:", JSON.stringify(this.props.object, null,2))
  //   deleteObject(this.props.object.id)
  //     .then(this.props.fetchObjects)
  //     .then(() => this.props.history.push(`/`))
  //     .catch(err => this.setState({errorMessage: err.message}))
  // }

  render () {
    const {id, name, description} = this.props.object
    return (
      <div className='object'>
          <header className='object-header'>
          <h3 className='object-name'><a href={`/api/v1/objects/${id}`}>{name}</a></h3>
          </header>
           <h3 className='object-description'>{description}</h3>

        <div className='pure-button-group' role='group'> 
            <button className='button-secondary pure-button'>Edit</button>

          <button
            onClick={this.removeObject}>        
            <span className="fa fa-trash fa-2x"></span>
          </button>
        </div> 
        {/* {this.props.state.errorMessage && this.props.state.errorMessage} */}
      </div>
    )
  }
}


export default connect()(Object)
