import React from 'react';
import axios from 'axios';
import './MainView.scss';
import ProgressBarCmp from '../Components/ProgressBarCmp';
import ButtonCmp from '../Components/ButtonCmp';


class MainView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressBars: [],
            btnsArr: [],
            dropdownOptions: [],
            selectedProgressOptionId: 0
        }
        this.handleChange = this.handleChange.bind(this);
    }
    UNSAFE_componentWillMount() {
        this.loadBarDetails();
    }

    loadBarDetails() {
        axios.get(`http://pb-api.herokuapp.com/bars`)
            .then(res => {
                const response = res.data;
                const dataArray = response.bars.map((data, index) => {
                    return {
                        value: data,
                        progressOptionId: index,
                        limit: response.limit,
                        limitExceed: false
                    }
                });

                const dropdownArray = response.bars.map((data, index) => {
                    return {
                        progressOptionLabel: '#progress' + (index + 1),
                        progressOptionId: index
                    }
                });
                this.setState({ progressBars: dataArray, btnsArr: response.buttons, dropdownOptions: dropdownArray });
            })
    }
    handleChange(event) {
        this.setState({ selectedProgressOptionId: event.target.options[event.target.selectedIndex].getAttribute('id') });
        //console.log("asd",this.state.selectedProgressOptionId);
    }

    buttonClickHandle(event, btnValue) {

        event.preventDefault();
        const { progressBars, selectedProgressOptionId } = this.state;
        //   console.log("btn", selectedProgressOptionId);
        const updatedProgressBar = progressBars.map(data => {
            console.log("data.progressOptionId", data.progressOptionId, "selectedProgressOptionId", selectedProgressOptionId)
            if (data.progressOptionId == selectedProgressOptionId) {
                const newValue = (data.value + btnValue)
                return {
                    ...data,
                    value: newValue <= 0 ? 0 : newValue,
                    limitExceed: newValue > data.limit ? true : false
                }
            } else {
                return data;
            }
        });
        console.log(updatedProgressBar)
        this.setState({ progressBars: updatedProgressBar })

    }

    render() {
        const { progressBars, btnsArr, dropdownOptions } = this.state;
        console.log("render", progressBars);
        return (

            <div className="mainWrapper">
                <div className="col-md-8 offset-md-2">
                    <div className="barsWrapper card">
                        <p className="progressBardHeading">Progress Bars Asdfgd Fgmnk</p>
                        <div className="proBarsWrapper">
                            {progressBars.map((item, i) =>
                                <div key={i} className="proBar">
                                    <ProgressBarCmp limitExceed={item.limitExceed} progressValue={item.value} />
                                </div>)}

                        </div>
                        <div className="row btnsRow">
                            <div className="col-md-3 col-xs-6 mobPadBot20">
                                {/* <DropdownCmp onChange={(option)=>this.onChangeDropdown(option)} dropdownOptions={dropdownOptions}/> */}
                                <select id="test" className="selectField" onChange={this.handleChange}>
                                    {dropdownOptions.map((item, i) =>
                                        <option key={i} id={item.progressOptionId} value={item.progressOptionId}>{item.progressOptionLabel}</option>)}
                                </select>
                            </div>
                            <div className="col-md-9">
                                <div className="row">
                                    {btnsArr.map((item, i) =>
                                        <div key={i} className="col-xs-6 col-md-2  padFiveLR mobPadBot20">
                                            <ButtonCmp onClick={(e) => this.buttonClickHandle(e, item)} btnText={item} />
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default MainView;