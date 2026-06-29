async function test() {
    try {
        const loginRes = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: 'admin@quizhub.com', password: 'password123' })
        });
        const loginData = await loginRes.json();
        const token = loginData.token;
        console.log('Logged in, token:', token.substring(0, 20) + '...');

        const quizRes = await fetch('http://localhost:8080/api/quizzes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                title: 'Test Quiz',
                description: 'Test Desc',
                timeLimit: 300,
                questions: [
                    {
                        question: 'Q1',
                        options: ['A', 'B', 'C', 'D'],
                        correctAnswer: 'A'
                    }
                ]
            })
        });
        const quizData = await quizRes.json();
        console.log('Quiz saved:', quizData);
    } catch (e) {
        console.error('Error:', e.message);
    }
}
test();
