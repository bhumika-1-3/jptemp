import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';

class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            gender: '',
            age: '',
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { name, gender, age } = steps;

        this.setState({ name, gender, age });
    }

    render() {
        const { name, gender, age } = this.state;
        return (
            <div style={{ width: '100%' }}>
                <h3>Summary</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{name.value}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{gender.value}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{age.value}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Review.propTypes = {
    steps: PropTypes.object,
};

Review.defaultProps = {
    steps: undefined,
};

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Arial',
    headerBgColor: 'linear-gradient(315deg, #f2cf07 0%, #55d284 74%)',
    headerFontColor: 'black',
    headerFontSize: '21px',
    botBubbleColor: 'linear-gradient(315deg, #f2cf07 0%, #55d284 74%)',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};
class SimpleForm extends Component {
    render() {
        return (
            <ChatBot
                headerTitle="Hello Guys 😁"
                speechSynthesis={{ enable: true, lang: 'en' }}
                steps={[
                    {
                        id: '1',
                        message: 'What is your name?',
                        trigger: 'name',
                    },
                    {
                        id: 'name',
                        user: true,
                        trigger: '3',
                    },
                    {
                        id: '3',
                        message: 'Hi {previousValue}! What is your gender?',
                        trigger: 'gender',
                    },
                    {
                        id: 'gender',
                        options: [
                            { value: 'male', label: 'Male', trigger: '5' },
                            { value: 'female', label: 'Female', trigger: '5' },
                        ],
                    },
                    {
                        id: '5',
                        message: 'How old are you?',
                        trigger: 'age',
                    },
                    {
                        id: 'age',
                        user: true,
                        trigger: '7',
                        validator: (value) => {
                            if (isNaN(value)) {
                                return 'value must be a number';
                            } else if (value < 0) {
                                return 'value must be positive';
                            } else if (value > 120) {
                                return `${value}? Come on!`;
                            }

                            return true;
                        },
                    },
                    {
                        id: '7',
                        message: 'Great! Check out your summary',
                        trigger: 'review',
                    },
                    {
                        id: 'review',
                        component: <Review />,
                        asMessage: true,
                        trigger: 'update',
                    },
                    {
                        id: 'update',
                        message: 'Would you like to update some field?',
                        trigger: 'update-question',
                    },
                    {
                        id: 'update-question',
                        options: [
                            { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                            { value: 'no', label: 'No', trigger: 'end-message' },
                        ],
                    },
                    {
                        id: 'update-yes',
                        message: 'What field would you like to update?',
                        trigger: 'update-fields',
                    },
                    {
                        id: 'update-fields',
                        options: [
                            { value: 'name', label: 'Name', trigger: 'update-name' },
                            { value: 'gender', label: 'Gender', trigger: 'update-gender' },
                            { value: 'age', label: 'Age', trigger: 'update-age' },
                        ],
                    },
                    {
                        id: 'update-name',
                        update: 'name',
                        trigger: '7',
                    },
                    {
                        id: 'update-gender',
                        update: 'gender',
                        trigger: '7',
                    },
                    {
                        id: 'update-age',
                        update: 'age',
                        trigger: '7',
                    },
                    {
                        id: 'end-message',
                        message: 'Thanks! Your data was submitted successfully!',
                        trigger: 'facts',
                    },
                    {
                        id: 'facts',
                        message: 'Would you like to know some fun facts ?',
                        trigger: 'facts-data'
                    },
                    {
                        id: 'facts-data',
                        options: [
                            { value: 'cricket', label: 'Cricket', trigger: 'fact-cricket' },
                            { value: 'yoga', label: 'Yoga', trigger: 'fact-yoga' },
                            { value: 'gym', label: 'Gym', trigger: 'fact-gym' },
                        ],
                    },
                    {
                        id: 'fact-cricket',
                        message: 'Sunil Gavaskar was out off the first ball of a Test match thrice in his career',
                        trigger: 'points',
                    },
                    {
                        id: 'fact-yoga',
                        message: 'Yoga is one of the oldest physical disciplines in the world',
                        trigger: 'points',
                    },
                    {
                        id: 'fact-gym',
                        message: 'Working out sharpens your memory.',
                        trigger: 'points',
                    },
                    {
                        id: 'points',
                        message: 'Would you like to know your reward points?',
                        trigger: 'points-data'
                    },
                    {
                        id: 'points-data',
                        options: [
                            { value: 'yes', label: 'Yes', trigger: 'points-yes' },
                            { value: 'no', label: 'No', trigger: 'points-no' },
                        ],
                    },
                    {
                        id: 'points-no',
                        message: 'Thank you for your kind interaction !!',
                        end: true,
                    },
                    {
                        id: 'points-yes',
                        message: 'You have 245 points !!!',
                        end: true,
                    }


                ]}
            />
        );
    }
}

export default SimpleForm;