export async function getRespose () {
  await axios.post('/api/test', {
    body: ''
  }).then(function () {
    console.log('SUCCESS!!')
  })
    .catch(function () {
      console.log('FAILURE!!')
    })
}
