import React, { Component } from 'react';
import Input from 'react-toolbox/lib/input';
import DatePicker from 'react-toolbox/lib/date_picker';
import Dialog from 'react-toolbox/lib/dialog';
import axios from 'axios';
import {Button, IconButton} from 'react-toolbox/lib/button'; 


const datetime = new Date(2017, 7, 8);
const min_datetime = new Date(new Date(datetime).setDate(8));
datetime.setHours(17);
datetime.setMinutes(28);

const localeExample = {
  months: 'urtarrila_otsaila_martxoa_apirila_maiatza_ekaina_uztaila_abuztua_iraila_urria_azaroa_abendua'.split('_'),
  monthsShort: 'urt._ots._mar._api._mai._eka._uzt._abu._ira._urr._aza._abe.'.split('_'),
  weekdays: 'igandea_astelehena_asteartea_asteazkena_osteguna_ostirala_larunbata'.split('_'),
  weekdaysShort: 'ig._al._ar._az._og._ol._lr.'.split('_'),
  weekdaysLetter: 'ig_al_ar_az_og_ol_lr'.split('_')
}

class App extends Component{
    constructor(props){
        super(props)
        this.handleChange = this.handleChange.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.randomPassKey = this.randomPassKey.bind(this);
        this.getMessage = this.getMessage.bind(this);
        this.state = {
            user: "",
            message: "",
            date2: datetime,
            active: false,
            passPhrase: "Rp9Vz",
            passState: true,
            encryptedMessage: ""
        }
    }

handleChange(value, e){
    this.setState({[e.target.name]: value})
}

handleToggle() {
    this.setState({active: !this.state.active})
    axios.post('/', {user: this.state.user, message: this.state.message, passPhrase: this.state.passPhrase})
        .then(response => {
            console.log('response', response)
        })
        .catch(err => {
            console.log(err)
        })
}

getMessage() {
    axios.get('/', {user: this.state.user})
        .then((response) => {
            console.log('response', response)
            this.setState({ encryptedMessage: response.config.user})
        })
}

randomPassKey(length){
    let chars = 'abcdefghijklmnopqrstuvwxyaABCDEFGHJKLMNOPQRSTUVWXYZ1234567890'
    let pass = "";
    for (let i=0; i<length; i++){
        let x = Math.floor(Math.random() * chars.length)
        pass += chars.charAt(x)
    }
    this.setState({passPhrase: pass})
}

render() {
    const actions = [
        { label: "SHOW", onClick: this.getMessage},
        { label: "CLOSE", onClick: this.handleToggle },
        { label: "DECRYPT", onClick: this.handleToggle }
        ]
    return (
        <div>
            <h1>Tovia's Enigma</h1>
            <section>
            <Input type="text" required icon="Icon" label='Name' name="user" value={this.state.user} onChange={this.handleChange} maxLength={70}/>
            <Input type="text" multiline required label="Message" name="message" value={this.state.message} onChange={this.handleChange} maxLength={120}/>
            <DatePicker label="Expiration Date" sundayFirstDayOfWeek onChange={this.handleChange} minDate={min_datetime} name="date2" value={this.state.date2}/>
            </section>
            <Button label="Encrypt" onClick={this.handleToggle} />
            <Button label="Decrypt" onClick={this.handleToggle} />
            <Dialog
                actions={actions}
                active={this.state.active}
                onEscKeyDown={this.handleToggle}
                title='De/Encrypt'
            >
                <Input type="text" multiline required label="Message" name="message" value={this.state.encryptedMessage} onChange={this.handleChange} maxLength={120}/>
            </Dialog>
            <h4>Your Passphrase - {this.state.passPhrase} </h4>
            <Button label="Generate New PassPhrase" onClick={this.randomPassKey}/>
        </div>
    )
}
}

export default App;