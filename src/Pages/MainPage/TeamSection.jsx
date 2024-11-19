import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import TeamCard from '../../components/MainPage/TeamCard';
import '../../ui/MainPage/TeamSection.css';

const teamMembers = [
    [
        {
            name: '이원준',
            image: '/img/MainPageImg/teamImg/wonjun.jpg',
            age: 28,
            role: '프로젝트 매니저',
            specs: [{ title: 'Full Stack', content: 'React, JavaScript, Springboot' }]
        },
        {
            name: '정혜윤',
            image: '/img/MainPageImg/teamImg/hyeen.jpg',
            age: 30,
            role: '개발자',
            specs: [{ title: 'Full Stack', content: 'React, JavaScript, Springboot' }]
        },
        {
            name: '서승호',
            image: '/img/MainPageImg/teamImg/seungho.jpg',
            age: 25,
            role: '개발자',
            specs: [{ title: 'Full Stack', content: 'React, JavaScript, Springboot' }]
        },
        {
            name: '심윤성',
            image: '/img/MainPageImg/teamImg/yoonsung.jpg',
            age: 25,
            role: '개발자',
            specs: [{ title: 'Full Stack', content: 'React, JavaScript, Springboot' }]
        }
    ],
    [
        {
            name: '박정민',
            image: '/img/MainPageImg/teamImg/jungmin.jpg',
            age: 22,
            role: '개발자',
            specs: [{ title: 'Full Stack', content: 'React, JavaScript, Springboot' }]
        },
        {
            name: '전영빈',
            image: '/img/MainPageImg/teamImg/youngbeen.jpg',
            age: 25,
            role: '개발자',
            specs: [{ title: 'Full Stack', content: 'React, JavaScript, Springboot' }]
        },
        {
            name: '임채은',
            image: '/img/MainPageImg/teamImg/cheche.jpg',
            age: 24,
            role: '개발자',
            specs: [{ title: 'Full Stack', content: 'React, JavaScript, Springboot' }]
        }
    ]
];

const TeamSection = () => {
    const [activeGroup, setActiveGroup] = useState(0);
    const [animationClass, setAnimationClass] = useState('active');
    const teamSectionRef = useRef(null);

    useEffect(() => {
        // 3초마다 카드 그룹이 자동으로 변경되도록 설정
        const interval = setInterval(() => {
            setAnimationClass('exit');
            
            setTimeout(() => {
                setActiveGroup((prevGroup) => (prevGroup + 1) % teamMembers.length);
                setAnimationClass('active');
            }, 700); // 애니메이션 전환을 위한 짧은 딜레이
        }, 10000); // 3초 간격으로 전환

        // 컴포넌트 언마운트 시 interval 제거
        return () => clearInterval(interval);
    }, []); // 빈 배열을 넣어 처음 한 번만 실행되도록 설정

    return (
        <div ref={teamSectionRef}>
            <Grid
                container
                direction="row"
                justifyContent="center"
                spacing={2}
                className={`team-group ${animationClass}`}
            >
                {teamMembers[activeGroup].map((member, idx) => (
                    <Grid item key={idx} className="team-member">
                        <TeamCard
                            name={member.name}
                            image={member.image}
                            age={member.age}
                            role={member.role}
                            specs={member.specs}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default TeamSection;
