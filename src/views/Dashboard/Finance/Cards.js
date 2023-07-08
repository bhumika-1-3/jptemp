import React, { useState, useEffect } from 'react'
import './Card.css'
import { useDispatch, useSelector } from "react-redux"
import Typical from 'react-typical'
var axios = require('axios');

const Cards = () => {

    const [data, setData] = useState([{
        "pdf": 69,
        "question": " What is the longest river in the world?",
        "answer": " The Nile River is the longest river in the world, at 4,160 miles long. "
    },
    {
        "pdf": 69,
        "question": " What is the name of the area of the upper Nile that had the richest gold mines in Africa?",
        "answer": " Nubia was the Egyptian name for the area of the upper Nile that had the richest gold mines in Africa. "
    },
    {
        "pdf": 69,
        "question": " What is the name of the first dynasty of the Egyptian empire?",
        "answer": " The first dynasty of the Egyptian empire began about 2925 B.C. "
    },
    {
        "pdf": 69,
        "question": " What is the name of the largest pyramid ever built?",
        "answer": " The Great Pyramid, built by King Khufu, is the largest pyramid ever built. "
    },
    {
        "pdf": 69,
        "question": " What is the name of the secret tomb built for a New Kingdom pharaoh that was ever found with much of its treasure untouched?",
        "answer": " The secret tomb built for a New Kingdom pharaoh that was ever found with much of its treasure untouched is the tomb of Tutankhamun."
    },
    {
        "pdf": 70,
        "question": " What is Bhumika Mange's educational background?",
        "answer": " Bhumika Mange has a Bachelor of Technology in Computer from Dwarkadas J. Sanghvi College of Engineering with an average CGPA of 9.75. She also attended St Mary high school and junior college Vashi from 2007-2019, where she achieved a Mathematics score of 100/100, was the top scorer in college, and the 2nd rank holder in Navi Mumbai HSC with 96% and SSC with 90%. "
    },
    {
        "pdf": 70,
        "question": " What achievements has Bhumika Mange accomplished?",
        "answer": " Bhumika Mange has been a finalist in the 17th Avishkar inter-college research convention zonal and district level rounds, among the top 30 students at her college selected for the corporate training program conducted by JPMorgan Chase, the runner up in Unscript Rookies 24hrs national level hackathon and Best Pitch Winner in Lines of Code 24hrs national level Hackathon, 3rd place in the 72-hour Unicode Internal Hackathon and the Inspect Frontend Hackathon, 3rd Place in Codebash - competitive programming competition, AIR 2097 out of 89k+ participants in IICC-"
    }]);

    useEffect(() => {

        var config = {
            method: 'get',
            url: 'http://127.0.0.1:8000/openaiapp/getsummary/',

        };

        axios(config)
            .then(function (response) {
                // console.log(JSON.stringify(response.data));
                // setData(JSON.stringify(response.data));

            })
            .catch(function (error) {
                console.log(error);
            });
    }, [])
    const { currentTheme, colors } = useSelector((state) => state.theme)

    const items = [
        {
            id: 1,
            name: 'Hacktoberfest 2021',
            date: 'Entire month',
            data: "Hacktober fest, in its 8th year, is a month-long celebration of open source software run by DigitalOcean. Join open-source software enthusiasts, beginners, and the developer community by contributing to open-source projects.Open-source projects keep the internet humming — but they can't do it without resources.Donate and support their awesome work."
        },
        {
            id: 2,
            name: 'Myntra HackerRamp',
            date: '3rd October ,2021',
            data: "Myntra HackerRamp is an opportunity for budding engineers all over India to unleash their creative selves and bring their ideas to life. This contest provides you with a forum to not only ideate but implement a functional working prototype with expert mentoring from engineering leaders at Myntra.Students must register in teams of 2 to 4 members."
        },
        {
            id: 3,
            name: "NASA's International space Apps",
            date: '3rd October ,2021',
            data: "The grandest space and science hackathon in the solar system! Make creative solutions to real-world difficulties utilizing current data from space.From its origination in 2012, NASA's International Space Apps Challenge has engaged 150,000+ people from 150+ countries in using NASA's open data to create progressive resolutions to situations we face on Earth and in space "
        },
        {
            id: 4,
            name: 'Web Weaver : IIT tech fest',
            date: '17th October,2022',
            data: 'Design a multi-page website for the hotel chain and get to learn various aspects of designing and linking web pages using HTML and CSS along the way.A detailed plan needs to be submitted for building the site, including infrastructure specifications. Teams will be shortlisted on the basis of their Plan.'
        },
        {
            id: 5,
            name: 'Hack-O-Heist NIT Patna',
            date: '15th October',
            data: 'Robotics Club NITP is organizing a thrilling event, a hackthon Hack-O-Heist. Ready to take this challenge of 36-hours of hacking? Look upon the themes, come up with hardware or software-based solutions, and showcase your innovation skills.'

        },
        {
            id: 6,
            name: 'Hacktoberfesty',
            date: 'Entire month',
            data: 'A detailed plan needs to be submitted for building the site, including infrastructure specifications. Teams will be shortlisted on the basis of their Plan. '
        },

    ]

    return (
        <div> <div className="cardings">
            {
                    data.map((item) => (
                        <div data-aos="fade-left" className={` carding main-task-background ${currentTheme
                            ? colors.bg[currentTheme].dark
                            : "bg-purple-800"}`} key={item.id}>
                            <div className={` carding-inner main-task-background ${currentTheme
                                ? colors.bg[currentTheme].dark
                                : "bg-purple-800"}`} >
                                <div className={`carding-front main-task-background ${currentTheme
                                    ? colors.bg[currentTheme].dark
                                    : "bg-purple-800"}`} >
                                    <h1>{item.question}</h1>
                                </div>
                                <div className={`carding-back main-task-background ${currentTheme
                                    ? colors.bg[currentTheme].dark
                                    : "bg-purple-800"}`}>
                                    <h6>{item.answer}</h6>
                                </div>
                            </div>
                        </div>
                    ))

            })

        </div></div>
    )
}

export default Cards