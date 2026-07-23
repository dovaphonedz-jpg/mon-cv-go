const data = {
  name: "Test",
  email: "test@test.com",
  subject: "Test",
  message: "Test message"
};

fetch('http://localhost:3001/api/contact', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.error(err));
