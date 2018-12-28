import React from 'react'
import { View, TextInput, Label, Button } from 'react-desktop/windows'
import styled from 'styled-components'
import RangeSelect from '../components/RangeSelect'
import ApiService from '../services/ApiService'
import Alert from 'sweetalert2/dist/sweetalert2.js'

const TITLE = styled.h1`
  width: 100%;
  text-align: center;
  line-height: 28px;
  font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
  font-size: 45px;
  font-weight: 100;
  color: #333;
`;

const SECTION = styled.div`
  display: block;
  width: 100%;
  text-align: center;
`

const DIV = styled.div`
  width: 100%;
  margin-top: 20px;
`

const LABEL = styled.label`
position: relative;
top: 25px;
right: 170px;
font-family: Segoe UI, Frutiger, Frutiger Linotype, Dejavu Sans, Helvetica Neue, Arial, sans-serif;
font-weight: 100;
`

const INPUT = styled.input`
    width: 100px;
    border-style: solid;
    outline-width: 0;
    border-color: rgb(148, 148, 148);
    padding: 2px 10px 3px;
    line-height: 23px;
    border-width: 2px;
    font-size: 15px;
    font-weight: 100;
    color: rgb(0, 0, 0);
    margin-bottom: 18px;
    background: rgba(255, 255, 255, 0.34902);
    font-family: "Segoe UI", Frutiger, "Frutiger Linotype", "Dejavu Sans", "Helvetica Neue", Arial, sans-serif;
`


class Home extends React.Component {

  state = {
    hours: '',
    minutes: '',
    fatherName: '',
    childName: ''
  }

  updateHours = (hours) => {
    this.setState({ hours })
  }

  updateMins = (minutes) => {
    this.setState({ minutes })
  }

  submitTicket = async () => {

    const data = {
      tutor: this.state.fatherName,
      child: this.state.childName,
      time: parseFloat(this.state.hours, 10) + parseFloat((this.state.minutes / 60), 10)
    }
    const result = await ApiService.printTicket(data)
    
    if (result.data.success) {
      Alert({
        title: 'Listo!',
        text: 'Registro correcto',
        type: 'success',
        confirmButtonText: 'Realizar otro registro',
        onClose: () => {
          this.setState({ 
            hours: '',
            minutes: '',
            fatherName: '',
            childName: ''
          })
        }
      })
    }
  }

  closeModal = () => {
    this.setState({ showAlert: false })
  }

  render() {
    return (
      <SECTION>
        <SECTION>
          <TITLE>
            Divertilandia
          </TITLE>
        </SECTION>
        <SECTION>
          <DIV>
            <LABEL>Nombre del papa:</LABEL>
            <div style={{ textAlign: 'center' }} >
              <INPUT 
                placeholder="Papa"
                value={this.state.fatherName}
                onChange={e => this.setState({ fatherName: e.target.value })} />
            </div>
          </DIV>
          <DIV>
            <LABEL>Nombre del niño:</LABEL>
            <div style={{ textAlign: 'center' }} >
              <INPUT 
                placeholder="Niño"
                value={this.state.childName}
                onChange={e => this.setState({ childName: e.target.value })} />
            </div>
          </DIV>
          <DIV>
            <RangeSelect 
              hours={this.state.hours} 
              minutes={this.state.minutes}
              updateHoursHandler={this.updateHours}
              updateMinsHandler={this.updateMins}
              />
          </DIV>
          <DIV>
            <Button push onClick={this.submitTicket}>
              Imprimir ticket
            </Button>
          </DIV>
        </SECTION>
      </SECTION>
    )
  }
}

export default Home
