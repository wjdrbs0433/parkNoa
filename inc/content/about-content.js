/**
 * ============================================================
 *  About 페이지 내용 — 여기만 수정하면 about.html 에 반영됩니다.
 * ============================================================
 *
 * [주의]
 * - 따옴표(" 또는 ') 안의 문장만 고치세요.
 * - 줄을 추가할 때는 목록(Array)이면 마지막 항목 뒤에도 쉼표(,)를 넣는 형태를 유지하세요.
 * - 문장 안에 따옴표를 넣으려면 작은따옴표(')로 문자열을 감싸거나 \" 로 이스케이프하세요.
 *
 * 이미지 경로는 프로젝트 폴더 기준입니다. (예: img/photo.png)
 */


window.ABOUT_CONTENT = {
    /** 프로필 사진 */
    profilePhoto: {
        src: "img/img02.png",
        alt: "Profile photo",
    },

    /** 상단 이름·소속 한 줄들 */
    hero: {
        name: "Noa Park, Ph.D. Student",
        position: "Ph.D. Student, Animal Science, University of Illinois Urbana-Champaign",
        metaDepartment: "",
        metaPriorSchool: "",
        highlight:
            "My research focuses on sustainable animal production through precision nutrition.",
    },

    /** Biography 블록 */
    biography: {
        sectionTitle: "Biography",
        /** 각 문자열이 하나의 문단(<p>)이 됩니다. 새 문단을 추가하려면 배열에 한 줄 더 넣으세요. */
        paragraphs: [
            "Noa Park is a Ph.D. student in Animal Science at the University of Illinois Urbana-Champaign.",
            "He received his B.S. and M.S. degrees from Konkuk University, South Korea, where he conducted research in swine nutrition. His research aims to advance pig production through precision nutrition strategies, focusing on the evaluation of nutritional values in feed ingredients and meta-analyses on nutrient utilization in pigs.",
            "He has authored and co-authored multiple peer-reviewed journal articles and has presented his research at international conferences.",
        ],
        scholarLink: {
            url: "https://scholar.google.com/citations?user=YwQN3AwAAAAJ&hl=ko",
            label: "Google Scholar Profile →",
        },
    },

    /** 아래부터 CV 카드 영역 */
    cv: {
        researchInterests: {
            title: "Research Interests",
            items: [
                "Precision nutrition in monogastric animals",
                "Nutrient digestibility and energy utilization in pigs",
                "Nutritional strategies to enhance digestibility and growth performance",
                "Meta-analysis in monogastric animal nutrition",
                "Modeling approaches for precision feeding",
            ],
        },

        education: {
            title: "Education",
            items: [
                {
                    period: "Aug 2026-Present",
                    degree: "Ph.D. in Animal Science",
                    schoolLine: "University of Illinois Urbana-Champaign, IL, USA",
                    logoSrc: "img/llinoisLogo.png",
                    logoAlt: "University of Illinois",
                },
                {
                    period: "Feb 2025",
                    degree: "M.S. in Animal Science",
                    schoolLine: "Konkuk University, Seoul, South Korea",
                    logoSrc: "img/KONKUK.png",
                    logoAlt: "Konkuk University",
                },
                {
                    period: "Aug 2023",
                    degree: "B.S. in Animal Science",
                    schoolLine: "Konkuk University, Seoul, South Korea",
                    logoSrc: "img/KONKUK.png",
                    logoAlt: "Konkuk University",
                },
            ],
        },

        peerReview: {
            title: "Peer Reviewer for Journals",
            period: "2025 - present",
            roleLabel: "Ad hoc Reviewer:",
            journals: [
                "Animal Feed Science and Technology",
                "Animal Bioscience",
                "Canadian Journal of Animal Science",
                "Journal of Animal Science",
            ],
        },

        leadership: {
            title: "Leadership",
            blocks: [
                {
                    heading: "Republic of Korea Army Infantry School, Ranger Battalion (Military Service)",
                    period: "Mar 2020 to Sep 2021",
                    bullets: ["Ranger training instructor and squad leader"],
                },
                {
                    heading: "Konkuk University Nongak Club (Samulnori)",
                    period: "Mar 2018 to Feb 2020",
                    bullets: ["Sangsoe (lead performer) and club leader"],
                },
            ],
        },
    },
};
