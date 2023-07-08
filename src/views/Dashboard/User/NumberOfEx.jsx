import React, { useState } from 'react'
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import axios from 'axios';
// import { url } from '../url'


const NumberOfEx = () => {
    const [d, setD] = useState();
    // axios.get(url + `gym/ExPerProgram/1/`).then((res) => {
    //     console.log(res.data['Total No of Exercises Done']);
        // setD(res.data['Total No of Exercises Done']);
    // })
    const options = {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
        },
        series: [
            {
                data: [1,0,3,5,2,6]
            }
        ]
    };
    return (
        <div><HighchartsReact highcharts={Highcharts} options={options} /></div>

    )
}

export default NumberOfEx