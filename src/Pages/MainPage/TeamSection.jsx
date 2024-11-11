import React, { useState, useEffect, useRef } from 'react';
import { Grid } from '@mui/material';
import TeamCard from '../../components/MainPage/TeamCard';
import '../../ui/MainPage/TeamSection.css';

const teamMembers = [
    [
        {
            name: '이원준',
            image: '/img/MainPageImg/이원준.svg',
            age: 28,
            role: '개발자',
            specs: [{ title: 'Frontend', content: 'React, JavaScript' }]
        },
        {
            name: '정혜윤',
            image: '/img/MainPageImg/정혜윤.svg',
            age: 26,
            role: '디자이너',
            specs: [{ title: 'UI/UX', content: 'Figma, Sketch' }]
        },
        {
            name: '서승호',
            image: '/img/MainPageImg/서승호.svg',
            age: 30,
            role: '백엔드 엔지니어',
            specs: [{ title: 'Backend', content: 'Node.js, Express' }]
        },
        {
            name: '심윤성',
            image: '/img/MainPageImg/심윤성.svg',
            age: 27,
            role: '프로덕트 매니저',
            specs: [{ title: 'Management', content: 'Agile, Scrum' }]
        }
    ],
    [
        {
            name: '박정민',
            image: '/img/MainPageImg/박정민.svg',
            age: 29,
            role: '디자이너',
            specs: [{ title: 'Design', content: 'Photoshop, Illustrator' }]
        },
        {
            name: '전영빈',
            image: '/img/MainPageImg/전영빈.svg',
            age: 31,
            role: '개발자',
            specs: [{ title: 'Full Stack', content: 'React, Node.js' }]
        },
        {
            name: '임채은',
            image: '/img/MainPageImg/임채은.svg',
            age: 25,
            role: '마케팅',
            specs: [{ title: 'Marketing', content: 'SEO, Content Writing' }]
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
        <div ref={teamSectionRef} className="team-container">
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
